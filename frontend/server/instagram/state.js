import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { InstagramError } from "./errors.js";

export const DAY = 86_400_000;
export const REFRESH_WINDOW = 30 * DAY;
export const LEASE_DURATION = 5 * 60_000;
const AAD = Buffer.from("bmv-instagram-state:v1");

export function encryptionKey(value) {
  if (typeof value !== "string") throw new InstagramError("ENCRYPTION_KEY_INVALID");
  const key = Buffer.from(value, "base64");
  if (key.length !== 32 || key.toString("base64") !== value) throw new InstagramError("ENCRYPTION_KEY_INVALID");
  return key;
}

function validCredential(value) {
  return typeof value === "string" && value.length > 0 && value.length <= 8192 && !/[\r\n]/.test(value);
}

function timestamp(value) {
  return Number.isSafeInteger(value) && value > 0;
}

export function validateState(state) {
  if (!state || state.version !== 1 || !validCredential(state.token) || (state.issuedAt !== null && !timestamp(state.issuedAt)) || !timestamp(state.expiresAt) || !timestamp(state.dataAccessExpiresAt) || (state.issuedAt !== null && state.expiresAt <= state.issuedAt)) {
    throw new InstagramError("STATE_INVALID");
  }
  if (state.authFlow !== "instagram-login" || state.tokenKind !== "long-lived-user" || !Array.isArray(state.scopes) || !state.scopes.includes("instagram_business_basic")) {
    throw new InstagramError("TOKEN_INCOMPATIBLE");
  }
  if (state.accountId !== null && (typeof state.accountId !== "string" || !state.accountId)) throw new InstagramError("STATE_INVALID");
  const firstObservedAt = state.firstObservedAt ?? null;
  const observationFingerprint = state.observationFingerprint ?? null;
  if (firstObservedAt !== null || observationFingerprint !== null) {
    if (!timestamp(firstObservedAt) || observationFingerprint !== credentialFingerprint(state.token) || !state.accountId || !timestamp(state.lastCheckedAt) || state.lastCheckedAt < firstObservedAt || (state.issuedAt !== null && firstObservedAt < state.issuedAt)) throw new InstagramError("STATE_INVALID");
  }
  const pendingReceivedAt = state.pending?.receivedAt ?? state.pending?.issuedAt;
  if (state.pending && (!validCredential(state.pending.token) || !timestamp(pendingReceivedAt) || !timestamp(state.pending.expiresAt) || state.pending.expiresAt <= pendingReceivedAt)) throw new InstagramError("STATE_INVALID");
  if (state.lease && (typeof state.lease.owner !== "string" || !state.lease.owner || !timestamp(state.lease.until))) throw new InstagramError("STATE_INVALID");
  for (const field of ["lastCheckedAt", "lastRefreshAt", "lastRefreshAttemptAt"]) {
    if (state[field] !== null && !timestamp(state[field])) throw new InstagramError("STATE_INVALID");
  }
  return state;
}

function configuredTimestamp(value) {
  let parsed = NaN;
  if (typeof value === "string" && /^\d{10}$/.test(value)) parsed = Number(value) * 1000;
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value)) parsed = Date.parse(value);
  if (!timestamp(parsed)) throw new InstagramError("BOOTSTRAP_METADATA_INVALID");
  return parsed;
}

export function credentialFingerprint(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function recordVerifiedObservation(state, observedAt) {
  validateState(state);
  return validateState({
    ...state,
    firstObservedAt: state.firstObservedAt ?? observedAt,
    observationFingerprint: state.observationFingerprint ?? credentialFingerprint(state.token),
    lastCheckedAt: observedAt,
  });
}

export function bootstrapState(env) {
  if (env.INSTAGRAM_TOKEN_BOOTSTRAP_ENABLED !== "true") throw new InstagramError("STATE_NOT_INITIALIZED");
  if (env.INSTAGRAM_TOKEN_COMPATIBILITY_CONFIRMED !== "true") throw new InstagramError("TOKEN_INCOMPATIBLE");
  const suppliedIssueDate = env.INSTAGRAM_TOKEN_ISSUED_AT;
  const issuedAt = suppliedIssueDate == null || suppliedIssueDate === "" || (typeof suppliedIssueDate === "string" && suppliedIssueDate.trim().toLowerCase() === "unknown") ? null : configuredTimestamp(suppliedIssueDate);
  return validateState({
    version: 1,
    token: env.INSTAGRAM_ACCESS_TOKEN,
    issuedAt,
    firstObservedAt: null,
    observationFingerprint: null,
    expiresAt: configuredTimestamp(env.INSTAGRAM_TOKEN_EXPIRES_AT),
    dataAccessExpiresAt: configuredTimestamp(env.INSTAGRAM_DATA_ACCESS_EXPIRES_AT),
    authFlow: "instagram-login",
    tokenKind: "long-lived-user",
    scopes: ["instagram_business_basic"],
    accountId: null,
    pending: null,
    lease: null,
    lastCheckedAt: null,
    lastRefreshAt: null,
    lastRefreshAttemptAt: null,
    lastFailure: null,
  });
}

export function encryptState(state, key) {
  validateState(state);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  cipher.setAAD(AAD);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(state), "utf8"), cipher.final()]);
  return JSON.stringify({ version: 1, iv: iv.toString("base64"), tag: cipher.getAuthTag().toString("base64"), ciphertext: ciphertext.toString("base64") });
}

export function decryptState(text, key) {
  try {
    if (typeof text !== "string" || text.length > 65_536) throw new Error();
    const envelope = JSON.parse(text);
    if (envelope.version !== 1) throw new Error();
    const iv = Buffer.from(envelope.iv, "base64");
    const tag = Buffer.from(envelope.tag, "base64");
    if (iv.length !== 12 || tag.length !== 16) throw new Error();
    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAAD(AAD);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(Buffer.from(envelope.ciphertext, "base64")), decipher.final()]);
    return validateState(JSON.parse(plaintext.toString("utf8")));
  } catch {
    throw new InstagramError("STATE_DECRYPTION_FAILED");
  }
}
