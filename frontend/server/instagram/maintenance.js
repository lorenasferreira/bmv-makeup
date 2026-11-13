import { randomUUID } from "node:crypto";
import { InstagramError, failureCode } from "./errors.js";
import { bootstrapState, DAY, LEASE_DURATION, REFRESH_WINDOW, recordVerifiedObservation, validateState } from "./state.js";

function usable(state, now) {
  validateState(state);
  if (state.issuedAt > now) throw new InstagramError("TOKEN_ISSUE_DATE_INVALID");
  if (state.firstObservedAt > now) throw new InstagramError("TOKEN_OBSERVATION_DATE_INVALID");
  if (state.expiresAt <= now && !state.pending) throw new InstagramError("TOKEN_EXPIRED");
}

function summary(state, status, now) {
  return {
    status,
    tokenExpiresAt: new Date(state.expiresAt).toISOString(),
    dataAccessExpiresAt: new Date(state.dataAccessExpiresAt).toISOString(),
    dataAccessWarning: state.dataAccessExpiresAt - now <= REFRESH_WINDOW,
    dataAccessStatus: state.dataAccessExpiresAt <= now ? "potentially_stale" : state.dataAccessExpiresAt - now <= REFRESH_WINDOW ? "review_due" : "not_due",
    credentialStatus: "verified",
  };
}

export async function maintainInstagramToken({ env, store, meta, now = Date.now, owner = randomUUID() }) {
  let view = await store.read();
  const currentTime = now();
  let state = view ? view.state : bootstrapState(env);
  usable(state, currentTime);
  if (state.lease?.until > currentTime) return { status: "busy" };

  try {
    view = await store.write({ ...state, lease: { owner, until: currentTime + LEASE_DURATION } }, view?.etag ?? null);
    state = view.state;
  } catch (error) {
    if (failureCode(error) === "STATE_CONFLICT") return { status: "busy" };
    throw error;
  }

  async function save(next) {
    if (view.state.lease?.owner !== owner || view.state.lease.until <= now()) throw new InstagramError("LEASE_EXPIRED");
    view = await store.write(next, view.etag);
    state = view.state;
  }

  async function promotePending() {
    if (!state.pending || !state.accountId) throw new InstagramError("STATE_INVALID");
    if (state.pending.expiresAt <= now()) throw new InstagramError("PENDING_TOKEN_EXPIRED");
    await meta.verify(state.pending.token, state.accountId);
    const unchanged = state.pending.token === state.token;
    await save(recordVerifiedObservation({
      ...state,
      token: state.pending.token,
      issuedAt: unchanged ? state.issuedAt : null,
      firstObservedAt: unchanged ? state.firstObservedAt ?? null : null,
      observationFingerprint: unchanged ? state.observationFingerprint ?? null : null,
      expiresAt: state.pending.expiresAt,
      lastRefreshAt: state.pending.receivedAt ?? state.pending.issuedAt,
      pending: null,
      lastFailure: null,
    }, now()));
  }

  async function processLease() {
    if (state.pending) {
      await promotePending();
      return summary(state, "recovered", now());
    }
    const accountId = await meta.verify(state.token, state.accountId);
    await save(recordVerifiedObservation({ ...state, accountId, lastFailure: null }, now()));
    if (state.expiresAt - now() > REFRESH_WINDOW) return summary(state, "healthy", now());
    if (env.INSTAGRAM_TOKEN_REFRESH_ENABLED !== "true") return summary(state, "refresh_required", now());
    if (env.INSTAGRAM_TOKEN_SOURCE !== "blob") throw new InstagramError("TOKEN_SOURCE_NOT_READY");
    if (now() - state.firstObservedAt < DAY || (state.issuedAt !== null && now() - state.issuedAt < DAY)) return summary(state, "waiting_minimum_age", now());
    if (state.lastRefreshAttemptAt && now() - state.lastRefreshAttemptAt < DAY) return summary(state, "waiting_refresh_interval", now());

    await save({ ...state, lastRefreshAttemptAt: now() });
    const refreshed = await meta.refresh(state.token);
    const receivedAt = now();
    await save({ ...state, pending: { token: refreshed.token, receivedAt, expiresAt: receivedAt + refreshed.expiresIn * 1000 } });
    await promotePending();
    return summary(state, "refreshed", now());
  }

  let result;
  let failure;
  try {
    result = await processLease();
  } catch (error) {
    const code = failureCode(error);
    failure = new InstagramError(code);
    try {
      await save({ ...view.state, lastFailure: code });
    } catch {
      failure = new InstagramError("STATE_RECOVERY_REQUIRED");
    }
  }
  try {
    const latest = await store.read();
    if (latest?.state.lease?.owner === owner) await store.write({ ...latest.state, lease: null }, latest.etag);
  } catch {
    failure ||= new InstagramError("LEASE_RELEASE_FAILED");
  }
  if (failure) throw failure;
  return result;
}
