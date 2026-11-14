import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { createInstagramHandler } from "../api/instagram.js";
import { createMaintenanceHandler } from "../api/instagram-maintenance.js";
import { InstagramError } from "../server/instagram/errors.js";
import { bootstrapState, credentialFingerprint, DAY, encryptState, decryptState, encryptionKey, validateState } from "../server/instagram/state.js";
import { createTokenStore, resolveInstagramToken } from "../server/instagram/store.js";
import { createMetaClient } from "../server/instagram/meta.js";
import { maintainInstagramToken } from "../server/instagram/maintenance.js";
import { createMonitor } from "../server/instagram/monitor.js";

const NOW = Date.parse("2026-12-12T12:00:00Z");
const TOKEN = "simulated-original-credential";
const NEXT = "simulated-refreshed-credential";
const CRON = "simulated-cron-secret-for-unit-tests-only";
const KEY = randomBytes(32).toString("base64");
const realFetch = globalThis.fetch;
let unexpectedNetwork = 0;
before(() => { globalThis.fetch = async () => { unexpectedNetwork++; throw new Error("External network is prohibited in these tests"); }; });
after(() => { globalThis.fetch = realFetch; assert.equal(unexpectedNetwork, 0); });

function state(overrides = {}) {
  const firstObservedAt = Object.hasOwn(overrides, "firstObservedAt") ? overrides.firstObservedAt : NOW - 29 * DAY;
  return {
    version: 1, token: TOKEN, issuedAt: NOW - 29 * DAY, expiresAt: NOW + 30 * DAY,
    firstObservedAt, observationFingerprint: firstObservedAt === null ? null : credentialFingerprint(overrides.token ?? TOKEN),
    dataAccessExpiresAt: NOW + 60 * DAY, authFlow: "instagram-login", tokenKind: "long-lived-user",
    scopes: ["instagram_business_basic"], accountId: "simulated-account", pending: null, lease: null,
    lastCheckedAt: NOW - DAY, lastRefreshAt: null, lastRefreshAttemptAt: null, lastFailure: null,
    ...overrides,
  };
}

function environment(overrides = {}) {
  return {
    CRON_SECRET: CRON, VERCEL_ENV: "production", INSTAGRAM_ACCESS_TOKEN: TOKEN,
    INSTAGRAM_TOKEN_SOURCE: "blob", INSTAGRAM_TOKEN_AUTOMATION_ENABLED: "true",
    INSTAGRAM_TOKEN_REFRESH_ENABLED: "true", INSTAGRAM_TOKEN_ENCRYPTION_KEY: KEY,
    BLOB_READ_WRITE_TOKEN: "simulated-storage-credential", ...overrides,
  };
}

function memoryStore(initial = state()) {
  let saved = initial ? structuredClone(initial) : null;
  let revision = saved ? 1 : 0;
  return {
    async read() { return saved ? { state: structuredClone(saved), etag: String(revision) } : null; },
    async write(next, etag) {
      if ((saved && etag !== String(revision)) || (!saved && etag !== null)) throw new InstagramError("STATE_CONFLICT");
      saved = structuredClone(next); revision++;
      return { state: structuredClone(saved), etag: String(revision) };
    },
    value() { return structuredClone(saved); },
  };
}

function metaStub(overrides = {}) {
  const calls = [];
  return {
    calls,
    async verify(token, account) { calls.push(["verify", token, account]); return "simulated-account"; },
    async refresh(token) { calls.push(["refresh", token]); return { token: NEXT, expiresIn: 60 * DAY / 1000 }; },
    ...overrides,
  };
}

function response() {
  return {
    headers: {}, statusCode: 200, body: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

function logger() {
  const messages = [];
  return { messages, info(...args) { messages.push(args); }, error(...args) { messages.push(args); } };
}

function json(body, status = 200) { return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } }); }

function simulatedMeta(calls, options = {}) {
  return async input => {
    const url = new URL(input); calls.push(url);
    if (url.pathname === "/refresh_access_token") {
      if (options.refreshError) throw new Error(`Never log ${TOKEN}`);
      return json({ access_token: NEXT, token_type: "bearer", expires_in: 60 * DAY / 1000 });
    }
    if (url.pathname === "/me") return json({ id: options.accountId || "simulated-account", username: "simulated-profile" });
    if (url.pathname === "/me/media") return json({ data: [] });
    throw new Error("Unexpected simulated endpoint");
  };
}

const run = (store, meta = metaStub(), env = environment(), now = () => NOW) => maintainInstagramToken({ store, meta, env, now });

test("private state encrypts and authenticates the credential without plaintext", () => {
  const key = encryptionKey(KEY); const encrypted = encryptState(state(), key);
  assert.ok(!encrypted.includes(TOKEN)); assert.deepEqual(decryptState(encrypted, key), state());
  assert.notEqual(encrypted, encryptState(state(), key));
  const tampered = JSON.parse(encrypted); tampered.tag = randomBytes(16).toString("base64");
  for (const [text, candidate] of [[JSON.stringify(tampered), key], [encrypted, randomBytes(32)], ["invalid", key], ["x".repeat(70_000), key]]) {
    assert.throws(() => decryptState(text, candidate), { code: "STATE_DECRYPTION_FAILED" });
  }
  for (const key of [undefined, "not-base64", randomBytes(16).toString("base64")]) assert.throws(() => encryptionKey(key), { code: "ENCRYPTION_KEY_INVALID" });
});

test("bootstrap requires explicit compatibility and precise independently supplied timestamps", () => {
  const env = environment({ INSTAGRAM_TOKEN_BOOTSTRAP_ENABLED: "true", INSTAGRAM_TOKEN_COMPATIBILITY_CONFIRMED: "true", INSTAGRAM_TOKEN_ISSUED_AT: String((NOW - 2 * DAY) / 1000), INSTAGRAM_TOKEN_EXPIRES_AT: "2027-01-11T12:00:00Z", INSTAGRAM_DATA_ACCESS_EXPIRES_AT: "2027-02-10T12:00:00Z" });
  const initial = bootstrapState(env);
  assert.equal(initial.expiresAt, NOW + 30 * DAY); assert.equal(initial.dataAccessExpiresAt, NOW + 60 * DAY);
  assert.equal(initial.accountId, null);
  assert.throws(() => bootstrapState({ ...env, INSTAGRAM_TOKEN_COMPATIBILITY_CONFIRMED: "false" }), { code: "TOKEN_INCOMPATIBLE" });
  assert.throws(() => bootstrapState({ ...env, INSTAGRAM_TOKEN_BOOTSTRAP_ENABLED: "false" }), { code: "STATE_NOT_INITIALIZED" });
  assert.throws(() => bootstrapState({ ...env, INSTAGRAM_TOKEN_EXPIRES_AT: "11/01/2027" }), { code: "BOOTSTRAP_METADATA_INVALID" });
  assert.throws(() => validateState(state({ tokenKind: "short-lived" })), { code: "TOKEN_INCOMPATIBLE" });
  assert.throws(() => validateState(state({ scopes: [] })), { code: "TOKEN_INCOMPATIBLE" });
});

test("Blob adapter uses private consistent reads, encrypted writes and conditional ETags", async () => {
  let body = encryptState(state(), encryptionKey(KEY)); let revision = "1"; const requests = [];
  const sdk = {
    async get(path, options) { requests.push(["get", path, options]); return { statusCode: 200, stream: new Response(body).body, blob: { etag: revision } }; },
    async put(path, data, options) {
      requests.push(["put", path, options]); assert.ok(!data.includes(TOKEN));
      assert.equal(options.ifMatch, revision); body = data; revision = "2"; return { etag: revision };
    },
  };
  const store = createTokenStore({ env: environment(), loadSdk: async () => sdk });
  const current = await store.read(); await store.write({ ...current.state, lastCheckedAt: NOW }, current.etag);
  assert.equal(requests[0][2].useCache, false); assert.equal(requests[0][2].access, "private");
  assert.equal(requests[1][2].access, "private"); assert.equal(requests[1][2].allowOverwrite, true);
  assert.equal(requests[1][2].addRandomSuffix, false); assert.equal((await store.read()).state.lastCheckedAt, NOW);
});

test("Blob initialization is exclusive, and actual SDK conflict errors are sanitized", async () => {
  const { BlobPreconditionFailedError } = await import("@vercel/blob");
  let mode = "create";
  const sdk = {
    BlobPreconditionFailedError,
    async get() { return mode === "exists" ? { statusCode: 200, stream: new Response(encryptState(state(), encryptionKey(KEY))).body, blob: { etag: "other" } } : null; },
    async put(path, body, options) {
      if (mode === "create") { assert.equal(options.allowOverwrite, false); assert.equal(options.ifMatch, undefined); return { etag: "1" }; }
      if (mode === "conflict") throw new BlobPreconditionFailedError();
      throw new Error(`Sensitive upstream message ${TOKEN}`);
    },
  };
  const store = createTokenStore({ env: environment(), loadSdk: async () => sdk });
  assert.equal(await store.read(), null); await store.write(state());
  mode = "conflict"; await assert.rejects(store.write(state(), "old"), { code: "STATE_CONFLICT" });
  mode = "exists"; await assert.rejects(store.write(state()), { code: "STATE_CONFLICT" });
  mode = "Error"; await assert.rejects(store.write(state()), { code: "STORAGE_UNAVAILABLE" });
  await assert.rejects(createTokenStore({ env: environment(), loadSdk: async () => { throw new Error(TOKEN); } }).read(), { code: "STORAGE_UNAVAILABLE" });
});

test("Blob reader rejects oversized, malformed and unauthenticated responses", async () => {
  for (const result of [
    { statusCode: 200, stream: new Response("x".repeat(70_000)).body, blob: { etag: "1" } },
    { statusCode: 200, stream: new Response("not encrypted").body, blob: { etag: "1" } },
    { statusCode: 304, stream: null, blob: { etag: "1" } },
  ]) {
    await assert.rejects(createTokenStore({ env: environment(), loadSdk: async () => ({ get: async () => result }) }).read(), error => error instanceof InstagramError && !error.message.includes(TOKEN));
  }
});

test("environment source remains the default and makes no storage request", async () => {
  assert.equal(await resolveInstagramToken({ env: { INSTAGRAM_ACCESS_TOKEN: TOKEN }, storeFactory: () => { throw new Error("must not run"); } }), TOKEN);
  assert.equal(await resolveInstagramToken({ env: {} }), undefined);
  await assert.rejects(resolveInstagramToken({ env: { INSTAGRAM_TOKEN_SOURCE: "other" } }), { code: "TOKEN_SOURCE_INVALID" });
});

test("Blob feed source only serves verified, unexpired records", async () => {
  const env = environment(); const storeFactory = initial => () => memoryStore(initial);
  assert.equal(await resolveInstagramToken({ env, storeFactory: storeFactory(state()), now: () => NOW }), TOKEN);
  for (const [initial, code] of [[null, "STATE_NOT_INITIALIZED"], [state({ accountId: null, firstObservedAt: null }), "STATE_NOT_VERIFIED"], [state({ expiresAt: NOW }), "TOKEN_EXPIRED"]]) {
    await assert.rejects(resolveInstagramToken({ env, storeFactory: storeFactory(initial), now: () => NOW }), { code });
  }
});

test("routine verifies the feed daily without refreshing outside the 30-day window", async () => {
  const store = memoryStore(state({ expiresAt: NOW + 30 * DAY + 1 })); const meta = metaStub();
  assert.equal((await run(store, meta)).status, "healthy"); assert.deepEqual(meta.calls.map(c => c[0]), ["verify"]);
  assert.equal(store.value().token, TOKEN); assert.equal(store.value().lease, null);
});

test("at exactly 30 days the new token is persisted pending verification then promoted", async () => {
  const store = memoryStore(); const seen = []; const write = store.write;
  store.write = async (state, etag) => { seen.push(structuredClone(state)); return write(state, etag); };
  const meta = metaStub(); const result = await run(store, meta);
  assert.equal(result.status, "refreshed"); assert.ok(seen.some(s => s.pending?.token === NEXT && s.token === TOKEN));
  assert.equal(store.value().token, NEXT); assert.equal(store.value().expiresAt, NOW + 60 * DAY);
  assert.equal(store.value().dataAccessExpiresAt, NOW + 60 * DAY); assert.equal(store.value().pending, null);
  assert.equal(store.value().lastRefreshAttemptAt, NOW); assert.equal(store.value().lease, null);
  assert.deepEqual(meta.calls.map(c => c[0]), ["verify", "refresh", "verify"]);
  assert.equal(meta.calls.at(-1)[2], "simulated-account");
  assert.ok(!JSON.stringify(result).includes(TOKEN)); assert.ok(!JSON.stringify(result).includes(NEXT));
});

test("data-access expiry stays unchanged even when token renewal extends beyond it", async () => {
  const store = memoryStore(state({ dataAccessExpiresAt: NOW + 20 * DAY }));
  const result = await run(store);
  assert.equal(result.dataAccessWarning, true); assert.equal(store.value().dataAccessExpiresAt, NOW + 20 * DAY);
  assert.equal(store.value().expiresAt, NOW + 60 * DAY);
});

test("expired credentials and future-dated issuance are never refreshed", async () => {
  for (const [initial, code] of [[state({ expiresAt: NOW }), "TOKEN_EXPIRED"], [state({ issuedAt: NOW + 1, firstObservedAt: null }), "TOKEN_ISSUE_DATE_INVALID"]]) {
    const meta = metaStub(); await assert.rejects(run(memoryStore(initial), meta), { code }); assert.equal(meta.calls.length, 0);
  }
});

test("refresh requires explicit enablement, Blob as active source and minimum token age", async () => {
  const disabled = metaStub(); assert.equal((await run(memoryStore(), disabled, environment({ INSTAGRAM_TOKEN_REFRESH_ENABLED: "false" }))).status, "refresh_required");
  assert.deepEqual(disabled.calls.map(c => c[0]), ["verify"]);
  await assert.rejects(run(memoryStore(), metaStub(), environment({ INSTAGRAM_TOKEN_SOURCE: "env" })), { code: "TOKEN_SOURCE_NOT_READY" });
  const young = metaStub(); assert.equal((await run(memoryStore(state({ issuedAt: NOW - DAY + 1, firstObservedAt: NOW - DAY + 1, lastCheckedAt: NOW - DAY + 1 })), young)).status, "waiting_minimum_age");
  assert.deepEqual(young.calls.map(c => c[0]), ["verify"]);
  assert.equal((await run(memoryStore(state({ issuedAt: NOW - DAY, firstObservedAt: NOW - DAY })))).status, "refreshed");
});

test("ambiguous refresh failure retains current token and enforces 24 hours between attempts", async () => {
  const store = memoryStore(); const meta = metaStub({ refresh: async () => { throw new InstagramError("META_UNAVAILABLE"); } });
  await assert.rejects(run(store, meta), { code: "META_UNAVAILABLE" });
  assert.equal(store.value().token, TOKEN); assert.equal(store.value().lastRefreshAttemptAt, NOW); assert.equal(store.value().lease, null);
  assert.equal((await run(store)).status, "waiting_refresh_interval");
  assert.equal((await run(store, metaStub(), environment(), () => NOW + DAY)).status, "refreshed");
});

test("candidate verification failure preserves the candidate and never switches the feed prematurely", async () => {
  const store = memoryStore(); const meta = metaStub({ async verify(token) { if (token === NEXT) throw new InstagramError("ACCOUNT_MISMATCH"); return "simulated-account"; } });
  await assert.rejects(run(store, meta), { code: "ACCOUNT_MISMATCH" });
  assert.equal(store.value().token, TOKEN); assert.equal(store.value().pending.token, NEXT);
  const recovery = metaStub(); assert.equal((await run(store, recovery)).status, "recovered");
  assert.equal(store.value().token, NEXT); assert.deepEqual(recovery.calls.map(c => c[0]), ["verify"]);
});

test("a durable candidate can recover even when the previous token has expired", async () => {
  const store = memoryStore(state({ expiresAt: NOW - 1, pending: { token: NEXT, issuedAt: NOW - DAY, expiresAt: NOW + 59 * DAY } }));
  assert.equal((await run(store)).status, "recovered"); assert.equal(store.value().token, NEXT);
});

test("concurrent daily requests acquire a single lease before any Meta work", async () => {
  const store = memoryStore(state({ expiresAt: NOW + 40 * DAY })); const meta = metaStub();
  const outcomes = await Promise.all([run(store, meta), run(store, meta)]);
  assert.deepEqual(outcomes.map(x => x.status).sort(), ["busy", "healthy"]);
  assert.equal(meta.calls.length, 1); assert.equal(store.value().lease, null);
});

test("expired leases recover, while live leases make no Meta requests", async () => {
  const live = metaStub(); assert.equal((await run(memoryStore(state({ lease: { owner: "another", until: NOW + 1 } })), live)).status, "busy");
  assert.equal(live.calls.length, 0);
  assert.equal((await run(memoryStore(state({ lease: { owner: "another", until: NOW - 1 } })))).status, "refreshed");
});

test("failed persistence never silently reports a successful renewal", async () => {
  const store = memoryStore(); const write = store.write;
  store.write = async (next, etag) => { if (next.pending) throw new InstagramError("STORAGE_UNAVAILABLE"); return write(next, etag); };
  await assert.rejects(run(store), { code: "STORAGE_UNAVAILABLE" });
  assert.equal(store.value().token, TOKEN); assert.equal(store.value().lastRefreshAttemptAt, NOW); assert.equal(store.value().lease, null);
});

test("missing bootstrap metadata fails before authenticated Meta calls", async () => {
  const meta = metaStub(); await assert.rejects(run(memoryStore(null), meta), { code: "STATE_NOT_INITIALIZED" }); assert.equal(meta.calls.length, 0);
});

test("Meta client uses the official refresh endpoint and validates the renewed response", async () => {
  const calls = []; const meta = createMetaClient({ fetcher: simulatedMeta(calls) });
  assert.equal(await meta.verify(TOKEN), "simulated-account"); assert.deepEqual(await meta.refresh(TOKEN), { token: NEXT, expiresIn: 60 * DAY / 1000 });
  assert.equal(calls.at(-1).origin, "https://graph.instagram.com"); assert.equal(calls.at(-1).pathname, "/refresh_access_token");
  assert.equal(calls.at(-1).searchParams.get("grant_type"), "ig_refresh_token");
  await assert.rejects(meta.verify(TOKEN, "another-account"), { code: "ACCOUNT_MISMATCH" });
  for (const body of [{}, { access_token: NEXT, token_type: "bearer", expires_in: 0 }, { access_token: NEXT, token_type: "wrong", expires_in: 5_184_000 }, { access_token: NEXT, token_type: 1, expires_in: 5_184_000 }]) {
    await assert.rejects(createMetaClient({ fetcher: async () => json(body) }).refresh(TOKEN), { code: "META_INVALID_REFRESH_RESPONSE" });
  }
});

for (const [label, fetcher, code] of [
  ["revoked", async () => json({ error: { code: 190, message: TOKEN } }, 400), "META_TOKEN_REJECTED"],
  ["permissions", async () => json({ error: { code: 10, message: TOKEN } }, 403), "META_PERMISSION_REJECTED"],
  ["rate limit", async () => json({ error: { code: 4, message: TOKEN } }, 429), "META_RATE_LIMITED"],
  ["upstream outage", async () => json({ error: { message: TOKEN } }, 503), "META_UNAVAILABLE"],
  ["invalid JSON", async () => new Response(TOKEN), "META_INVALID_RESPONSE"],
  ["network", async () => { throw new Error(`URL includes ${TOKEN}`); }, "META_UNAVAILABLE"],
]) {
  test(`Meta ${label} failures never propagate credentials or upstream messages`, async () => {
    await assert.rejects(createMetaClient({ fetcher }).verify(TOKEN), error => error.code === code && !error.message.includes(TOKEN));
  });
}

test("maintenance fails closed for missing/wrong auth and disallows unsupported methods", async () => {
  let contacted = 0; const factory = () => { contacted++; throw new Error(); };
  for (const [method, authorization, secret, status] of [["GET", undefined, CRON, 401], ["GET", "Bearer wrong", CRON, 401], ["GET", `Bearer ${CRON}`, undefined, 401], ["GET", [`Bearer ${CRON}`], CRON, 401], ["POST", `Bearer ${CRON}`, CRON, 405]]) {
    const res = response(); await createMaintenanceHandler({ env: environment({ CRON_SECRET: secret }), storeFactory: factory })({ method, headers: { authorization } }, res);
    assert.equal(res.statusCode, status); assert.equal(res.headers["Cache-Control"], "private, no-store");
  }
  assert.equal(contacted, 0);
});

test("automation is inert by default and cannot run locally or in previews", async () => {
  let contacted = 0; const storeFactory = () => { contacted++; throw new Error(); };
  for (const [env, status, bodyStatus] of [[environment({ INSTAGRAM_TOKEN_AUTOMATION_ENABLED: undefined }), 200, "disabled"], [environment({ VERCEL_ENV: "preview" }), 409], [environment({ VERCEL_ENV: undefined }), 409]]) {
    const res = response(); await createMaintenanceHandler({ env, storeFactory })({ method: "GET", headers: { authorization: `Bearer ${CRON}` } }, res);
    assert.equal(res.statusCode, status); if (bodyStatus) assert.equal(res.body.status, bodyStatus);
  }
  assert.equal(contacted, 0);
});

test("authorized maintenance can refresh entirely through simulated Meta and storage", async () => {
  const store = memoryStore(); const calls = []; const log = logger(); const res = response();
  await createMaintenanceHandler({ env: environment(), storeFactory: () => store, fetcher: simulatedMeta(calls), now: () => NOW, logger: log })({ method: "GET", headers: { authorization: `Bearer ${CRON}` } }, res);
  assert.equal(res.statusCode, 200); assert.equal(res.body.status, "refreshed"); assert.equal(res.body.monitoring, "not_configured");
  assert.equal(store.value().token, NEXT);
  const output = JSON.stringify([res.body, log.messages]); for (const secret of [TOKEN, NEXT, CRON, KEY]) assert.ok(!output.includes(secret));
});

test("data-access warning and cron failures reach only the configured monitor without secrets", async () => {
  const env = environment({ INSTAGRAM_MONITOR_PING_URL: "https://hc-ping.com/00000000-0000-0000-0000-000000000001" });
  const requests = []; const meta = simulatedMeta([]); const log = logger();
  const fetcher = async (url, options) => {
    if (new URL(url).hostname === "hc-ping.com") { requests.push([String(url), options]); return new Response(null, { status: 200 }); }
    return meta(url, options);
  };
  const res = response(); await createMaintenanceHandler({ env, storeFactory: () => memoryStore(state({ expiresAt: NOW + 40 * DAY, dataAccessExpiresAt: NOW + 15 * DAY })), fetcher, now: () => NOW, logger: log })({ method: "GET", headers: { authorization: `Bearer ${CRON}` } }, res);
  assert.equal(res.body.warning, "DATA_ACCESS_METADATA_REVIEW_DUE"); assert.ok(requests[0][0].endsWith("/fail"));
  assert.equal(requests[0][1].body, "DATA_ACCESS_METADATA_REVIEW_DUE");
  assert.ok(!JSON.stringify([res.body, requests, log.messages]).includes(TOKEN));
  const expired = response(); await createMaintenanceHandler({ env, storeFactory: () => memoryStore(state({ dataAccessExpiresAt: NOW })), fetcher, now: () => NOW, logger: log })({ method: "GET", headers: { authorization: `Bearer ${CRON}` } }, expired);
  assert.equal(expired.statusCode, 200); assert.equal(expired.body.status, "refreshed");
  assert.equal(expired.body.warning, "DATA_ACCESS_METADATA_STALE"); assert.equal(expired.body.warningCategory, "metadata");
  assert.equal(expired.body.credentialStatus, "verified");
});

test("monitor is optional, never follows redirects, and rejects arbitrary destinations", async () => {
  assert.equal(await createMonitor({ env: {} })("success", "OK"), "not_configured");
  for (const value of ["https://example.com/", "http://hc-ping.com/00000000-0000-0000-0000-000000000001", "https://hc-ping.com/00000000-0000-0000-0000-000000000001?secret=bad"]) {
    await assert.rejects(createMonitor({ env: { INSTAGRAM_MONITOR_PING_URL: value } })("failure", "FAILED"), { code: "MONITOR_CONFIGURATION_INVALID" });
  }
  await assert.rejects(createMonitor({ env: { INSTAGRAM_MONITOR_PING_URL: "https://hc-ping.com/00000000-0000-0000-0000-000000000001" }, fetcher: async (url, options) => { assert.equal(options.redirect, "error"); return new Response(null, { status: 500 }); } })("success", "OK"), { code: "MONITOR_UNAVAILABLE" });
});

test("public feed retains its JSON contract and successful cache header", async () => {
  const calls = []; const res = response();
  const fetcher = async url => { calls.push(new URL(url)); return url.includes("/me/media") ? json({ data: [{ id: "post", media_type: "IMAGE", media_url: "https://example.com/image.webp", permalink: "https://www.instagram.com/p/example/", timestamp: "2026-01-01T00:00:00Z" }] }) : json({ username: "profile" }); };
  await createInstagramHandler({ env: { INSTAGRAM_ACCESS_TOKEN: TOKEN }, fetcher })({}, res);
  assert.equal(res.statusCode, 200); assert.equal(res.headers["Cache-Control"], "s-maxage=3600, stale-while-revalidate=86400");
  assert.deepEqual(res.body, { username: "profile", profilePictureUrl: null, posts: [{ id: "post", caption: "", mediaType: "IMAGE", mediaUrl: "https://example.com/image.webp", thumbnailUrl: null, permalink: "https://www.instagram.com/p/example/", timestamp: "2026-01-01T00:00:00Z" }] });
  assert.equal(calls.length, 2); assert.ok(!JSON.stringify(res.body).includes(TOKEN));
});

test("public feed serves the refreshed Blob credential without returning it", async () => {
  const store = memoryStore(state({ token: NEXT })); const seen = []; const res = response();
  const tokenProvider = () => resolveInstagramToken({ env: environment(), storeFactory: () => store, now: () => NOW });
  await createInstagramHandler({ tokenProvider, fetcher: async input => { const url = new URL(input); seen.push(url.searchParams.get("access_token")); return url.pathname.endsWith("/media") ? json({ data: [] }) : json({ username: "profile", profile_picture_url: "https://example.com/profile.webp" }); } })({}, res);
  assert.deepEqual(seen, [NEXT, NEXT]); assert.equal(res.statusCode, 200); assert.ok(!JSON.stringify(res.body).includes(NEXT));
});

test("public feed preserves error responses and redacts diagnostic fields", async () => {
  const missing = response(); await createInstagramHandler({ env: {} })({}, missing);
  assert.equal(missing.statusCode, 500); assert.equal(missing.body.error, "Instagram access token is not configured");
  const unavailable = response(); await createInstagramHandler({ tokenProvider: async () => { throw new Error(TOKEN); } })({}, unavailable);
  assert.equal(unavailable.body.error, "Unable to load Instagram posts");
  const log = logger(); const res = response();
  await createInstagramHandler({ env: { INSTAGRAM_ACCESS_TOKEN: TOKEN }, logger: log, fetcher: async () => json({ error: { code: TOKEN, type: TOKEN, error_subcode: TOKEN, message: TOKEN } }, 400) })({}, res);
  assert.equal(res.body.error, "Instagram API request failed"); assert.ok(!JSON.stringify([res.body, log.messages]).includes(TOKEN));
});

test("schedule targets the authenticated API daily and preserves the existing SPA rewrite", () => {
  const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url)));
  assert.deepEqual(config.crons, [{ path: "/api/instagram-maintenance", schedule: "0 6 * * *" }]);
  assert.deepEqual(config.rewrites, [{ source: "/(.*)", destination: "/index.html" }]);
});

test("initialization validates the account before a Blob record becomes available to the feed", async () => {
  const env = environment({ INSTAGRAM_TOKEN_REFRESH_ENABLED: "false", INSTAGRAM_TOKEN_BOOTSTRAP_ENABLED: "true", INSTAGRAM_TOKEN_COMPATIBILITY_CONFIRMED: "true", INSTAGRAM_TOKEN_ISSUED_AT: String((NOW - 2 * DAY) / 1000), INSTAGRAM_TOKEN_EXPIRES_AT: "2027-01-11T12:00:00Z", INSTAGRAM_DATA_ACCESS_EXPIRES_AT: "2027-02-10T12:00:00Z" });
  const store = memoryStore(null); const meta = metaStub(); const result = await run(store, meta, env);
  assert.equal(result.status, "refresh_required"); assert.equal(store.value().accountId, "simulated-account");
  assert.equal(store.value().token, TOKEN); assert.deepEqual(meta.calls.map(c => c[0]), ["verify"]);
  assert.equal(await resolveInstagramToken({ env, storeFactory: () => store, now: () => NOW }), TOKEN);
});

test("OIDC storage configuration passes its store ID without requiring a static storage token", async () => {
  const oidc = await import("@vercel/oidc"); assert.equal(typeof oidc.getVercelOidcToken, "function");
  const env = environment({ BLOB_READ_WRITE_TOKEN: undefined, BLOB_STORE_ID: "simulated-store" });
  const store = createTokenStore({ env, loadSdk: async () => ({ get: async (path, options) => { assert.equal(options.storeId, "simulated-store"); assert.equal(options.token, undefined); return null; } }) });
  assert.equal(await store.read(), null);
});

test("a worker losing its lease cannot overwrite or release a newer owner's lease", async () => {
  const store = memoryStore(state({ expiresAt: NOW + 40 * DAY })); let clock = NOW;
  const meta = metaStub({ async verify() {
    const current = await store.read(); clock += 6 * 60_000;
    await store.write({ ...current.state, lease: { owner: "newer-owner", until: clock + 5 * 60_000 } }, current.etag);
    return "simulated-account";
  } });
  await assert.rejects(run(store, meta, environment(), () => clock), { code: "STATE_RECOVERY_REQUIRED" });
  assert.equal(store.value().lease.owner, "newer-owner"); assert.equal(store.value().token, TOKEN);
});

test("an acknowledged-lost promotion remains durable and is never overwritten by stale state", async () => {
  const store = memoryStore(); const write = store.write; let lost = false;
  store.write = async (next, etag) => {
    const saved = await write(next, etag);
    if (next.token === NEXT && !next.pending && next.lease && !lost) { lost = true; throw new InstagramError("STORAGE_UNAVAILABLE"); }
    return saved;
  };
  await assert.rejects(run(store), { code: "STATE_RECOVERY_REQUIRED" });
  assert.equal(store.value().token, NEXT); assert.equal(store.value().pending, null); assert.equal(store.value().lease, null);
  assert.equal((await run(store)).status, "healthy");
});

test("monitor failure is visible without rolling back a successfully stored token", async () => {
  const store = memoryStore(); const meta = simulatedMeta([]); const log = logger(); const res = response();
  const env = environment({ INSTAGRAM_MONITOR_PING_URL: "https://hc-ping.com/00000000-0000-0000-0000-000000000001" });
  const fetcher = async (url, options) => new URL(url).hostname === "hc-ping.com" ? new Response(null, { status: 503 }) : meta(url, options);
  await createMaintenanceHandler({ env, storeFactory: () => store, fetcher, now: () => NOW, logger: log })({ method: "GET", headers: { authorization: `Bearer ${CRON}` } }, res);
  assert.equal(res.statusCode, 503); assert.equal(res.body.code, "MONITOR_UNAVAILABLE"); assert.equal(res.body.monitoring, "failed");
  assert.equal(store.value().token, NEXT);
  const output = JSON.stringify([res.body, log.messages]);
  for (const secret of [TOKEN, NEXT, CRON, KEY, env.INSTAGRAM_MONITOR_PING_URL]) assert.ok(!output.includes(secret));
});

function unknownIssueEnvironment(overrides = {}) {
  return environment({
    INSTAGRAM_TOKEN_BOOTSTRAP_ENABLED: "true", INSTAGRAM_TOKEN_COMPATIBILITY_CONFIRMED: "true",
    INSTAGRAM_TOKEN_ISSUED_AT: "Unknown", INSTAGRAM_TOKEN_EXPIRES_AT: "2027-01-11T12:00:00Z",
    INSTAGRAM_DATA_ACCESS_EXPIRES_AT: "2027-02-10T12:00:00Z", ...overrides,
  });
}

test("Unknown or absent issuance is stored as null without an invented observation or issuance", () => {
  for (const value of [undefined, "", "Unknown", " unknown "]) {
    const initial = bootstrapState(unknownIssueEnvironment({ INSTAGRAM_TOKEN_ISSUED_AT: value }));
    assert.equal(initial.issuedAt, null); assert.equal(initial.firstObservedAt, null); assert.equal(initial.observationFingerprint, null);
    assert.equal(decryptState(encryptState(initial, encryptionKey(KEY)), encryptionKey(KEY)).issuedAt, null);
  }
  assert.throws(() => bootstrapState(unknownIssueEnvironment({ INSTAGRAM_TOKEN_ISSUED_AT: 123 })), { code: "BOOTSTRAP_METADATA_INVALID" });
});

test("Unknown issuance starts a server-verified 24-hour observation clock, including the exact boundary", async () => {
  const store = memoryStore(null); const env = unknownIssueEnvironment(); const meta = metaStub();
  const initial = await run(store, meta, env);
  assert.equal(initial.status, "waiting_minimum_age"); assert.equal(initial.credentialStatus, "verified");
  assert.equal(store.value().issuedAt, null); assert.equal(store.value().firstObservedAt, NOW);
  assert.equal(store.value().observationFingerprint, credentialFingerprint(TOKEN));
  assert.deepEqual(meta.calls.map(call => call[0]), ["verify"]);
  assert.equal(await resolveInstagramToken({ env, storeFactory: () => store, now: () => NOW }), TOKEN);
  assert.equal((await run(store, meta, env, () => NOW + DAY - 1)).status, "waiting_minimum_age");
  assert.equal(store.value().firstObservedAt, NOW);
  assert.equal((await run(store, meta, env, () => NOW + DAY)).status, "refreshed");
  assert.equal(meta.calls.filter(call => call[0] === "refresh").length, 1);
  assert.equal(store.value().token, NEXT); assert.equal(store.value().issuedAt, null);
  assert.equal(store.value().firstObservedAt, NOW + DAY);
  assert.equal(store.value().observationFingerprint, credentialFingerprint(NEXT));
});

test("a failed verification cannot start or backdate the credential observation clock", async () => {
  const store = memoryStore(null); const env = unknownIssueEnvironment();
  await assert.rejects(run(store, metaStub({ verify: async () => { throw new InstagramError("META_UNAVAILABLE"); } }), env), { code: "META_UNAVAILABLE" });
  assert.equal(store.value().firstObservedAt, null); assert.equal(store.value().observationFingerprint, null);
  assert.equal(store.value().lastCheckedAt, null);
  const result = await run(store, metaStub(), env, () => NOW + DAY);
  assert.equal(result.status, "waiting_minimum_age"); assert.equal(store.value().firstObservedAt, NOW + DAY);
  assert.equal(store.value().issuedAt, null);
});

test("legacy state gains a fresh verified observation instead of deriving age from old timestamps", async () => {
  const legacy = state(); delete legacy.firstObservedAt; delete legacy.observationFingerprint;
  assert.equal(decryptState(encryptState(legacy, encryptionKey(KEY)), encryptionKey(KEY)).firstObservedAt, undefined);
  const store = memoryStore(legacy); const meta = metaStub();
  assert.equal((await run(store, meta)).status, "waiting_minimum_age");
  assert.equal(store.value().firstObservedAt, NOW); assert.equal(store.value().issuedAt, legacy.issuedAt);
  assert.deepEqual(meta.calls.map(call => call[0]), ["verify"]);
});

test("observation proof is bound to one credential and cannot be reused for a different token", async () => {
  const original = state({ issuedAt: null }); const changed = { ...original, token: NEXT };
  assert.throws(() => validateState(changed), { code: "STATE_INVALID" });
  const meta = metaStub(); await assert.rejects(run(memoryStore(changed), meta), { code: "STATE_INVALID" });
  assert.equal(meta.calls.length, 0);
  const store = memoryStore({ ...changed, firstObservedAt: null, observationFingerprint: null });
  assert.equal((await run(store)).status, "waiting_minimum_age");
  assert.equal(store.value().firstObservedAt, NOW); assert.equal(store.value().observationFingerprint, credentialFingerprint(NEXT));
});

test("a future observation is rejected before Meta work", async () => {
  const meta = metaStub();
  await assert.rejects(run(memoryStore(state({ issuedAt: null, firstObservedAt: NOW + 1, lastCheckedAt: NOW + 1 })), meta), { code: "TOKEN_OBSERVATION_DATE_INVALID" });
  assert.equal(meta.calls.length, 0);
});

test("refreshing the same credential preserves its observation and any genuine issuance metadata", async () => {
  for (const issuedAt of [null, NOW - 29 * DAY]) {
    const store = memoryStore(state({ issuedAt })); const meta = metaStub({ refresh: async () => ({ token: TOKEN, expiresIn: 60 * DAY / 1000 }) });
    assert.equal((await run(store, meta)).status, "refreshed");
    assert.equal(store.value().issuedAt, issuedAt); assert.equal(store.value().firstObservedAt, NOW - 29 * DAY);
    assert.equal(store.value().lastRefreshAt, NOW);
  }
});

test("pending-token recovery observes the candidate only after successful verification", async () => {
  const store = memoryStore(state({ issuedAt: null, pending: { token: NEXT, receivedAt: NOW - DAY, expiresAt: NOW + 59 * DAY } }));
  assert.equal((await run(store)).status, "recovered");
  assert.equal(store.value().issuedAt, null); assert.equal(store.value().firstObservedAt, NOW);
  assert.equal(store.value().lastRefreshAt, NOW - DAY);
});

test("passed data-access metadata does not block a successful public feed read or change its cache", async () => {
  const store = memoryStore(state({ dataAccessExpiresAt: NOW - DAY, issuedAt: null })); const env = environment(); const res = response(); const calls = [];
  const tokenProvider = () => resolveInstagramToken({ env, storeFactory: () => store, now: () => NOW });
  await createInstagramHandler({ tokenProvider, fetcher: simulatedMeta(calls) })({}, res);
  assert.equal(res.statusCode, 200); assert.deepEqual(res.body.posts, []);
  assert.equal(res.headers["Cache-Control"], "s-maxage=3600, stale-while-revalidate=86400");
  assert.equal(calls.length, 2); assert.equal(store.value().dataAccessExpiresAt, NOW - DAY);
});

test("passed data-access metadata allows verified refresh and remains flagged without rewriting the date", async () => {
  const store = memoryStore(state({ dataAccessExpiresAt: NOW - 2 * DAY, issuedAt: null })); const meta = metaStub();
  const result = await run(store, meta);
  assert.equal(result.status, "refreshed"); assert.equal(result.dataAccessStatus, "potentially_stale");
  assert.equal(result.dataAccessWarning, true); assert.equal(result.credentialStatus, "verified");
  assert.equal(store.value().dataAccessExpiresAt, NOW - 2 * DAY); assert.equal(store.value().token, NEXT);
  assert.equal(meta.calls.filter(call => call[0] === "refresh").length, 1);
});

for (const [label, fetcher, code, category] of [
  ["token rejection", async () => json({ error: { code: 190, message: TOKEN } }, 400), "META_TOKEN_REJECTED", "authentication"],
  ["HTTP authentication", async () => new Response(TOKEN, { status: 401 }), "META_TOKEN_REJECTED", "authentication"],
  ["permission rejection", async () => json({ error: { code: 10, message: TOKEN } }, 403), "META_PERMISSION_REJECTED", "authorization"],
  ["HTTP permission", async () => new Response(TOKEN, { status: 403 }), "META_PERMISSION_REJECTED", "authorization"],
  ["rate limiting", async () => json({ error: { code: 190, message: TOKEN } }, 429), "META_RATE_LIMITED", "temporary"],
  ["HTML outage", async () => new Response(TOKEN, { status: 503 }), "META_UNAVAILABLE", "temporary"],
  ["JSON outage", async () => json({ error: { code: 190, message: TOKEN } }, 500), "META_UNAVAILABLE", "temporary"],
  ["transient Meta error", async () => json({ error: { code: 2, is_transient: true, message: TOKEN } }, 400), "META_UNAVAILABLE", "temporary"],
  ["invalid response", async () => new Response(TOKEN), "META_INVALID_RESPONSE", "temporary"],
  ["timeout", async () => { throw new DOMException(TOKEN, "TimeoutError"); }, "META_UNAVAILABLE", "temporary"],
]) {
  test(`${label} stays distinct from stale metadata and never triggers a refresh after failed health checks`, async () => {
    const store = memoryStore(state({ issuedAt: null, dataAccessExpiresAt: NOW - DAY })); const res = response(); const log = logger(); const paths = [];
    await createMaintenanceHandler({ env: environment(), storeFactory: () => store, fetcher: (url, options) => { paths.push(new URL(url).pathname); return fetcher(url, options); }, now: () => NOW, logger: log })({ method: "GET", headers: { authorization: `Bearer ${CRON}` } }, res);
    assert.equal(res.statusCode, 503); assert.equal(res.body.code, code); assert.equal(res.body.category, category);
    assert.equal(store.value().lastFailure, code); assert.equal(store.value().token, TOKEN); assert.equal(store.value().dataAccessExpiresAt, NOW - DAY);
    assert.ok(!paths.includes("/refresh_access_token"));
    const output = JSON.stringify([res.body, log.messages]);
    for (const secret of [TOKEN, NEXT, CRON, KEY, credentialFingerprint(TOKEN)]) assert.ok(!output.includes(secret));
  });
}

test("a temporary outage does not invalidate observation history or prevent a later verified refresh", async () => {
  const store = memoryStore(state({ issuedAt: null, dataAccessExpiresAt: NOW - DAY }));
  await assert.rejects(run(store, metaStub({ verify: async () => { throw new InstagramError("META_UNAVAILABLE"); } })), { code: "META_UNAVAILABLE" });
  assert.equal(store.value().firstObservedAt, NOW - 29 * DAY);
  assert.equal(store.value().lastRefreshAttemptAt, null);
  assert.equal((await run(store)).status, "refreshed"); assert.equal(store.value().lastFailure, null);
});


test("successful maintenance releases using the last acknowledged write without a redundant read", async () => {
  const store = memoryStore(state({ expiresAt: NOW + 40 * DAY }));
  const read = store.read; let reads = 0;
  store.read = async () => {
    reads++;
    if (reads > 1) throw new InstagramError("STORAGE_UNAVAILABLE");
    return read();
  };
  assert.equal((await run(store)).status, "healthy");
  assert.equal(reads, 1);
  assert.equal(store.value().lease, null);
  assert.equal(store.value().token, TOKEN);
  assert.equal(store.value().lastCheckedAt, NOW);
});

test("release failure retains verified state and an expiring lease, then recovers after expiry", async () => {
  const store = memoryStore(state({ expiresAt: NOW + 40 * DAY }));
  const write = store.write; let failRelease = true;
  store.write = async (next, etag) => {
    if (!next.lease && failRelease) throw new InstagramError("STORAGE_UNAVAILABLE");
    return write(next, etag);
  };
  await assert.rejects(run(store), { code: "LEASE_RELEASE_FAILED" });
  assert.equal(store.value().lastCheckedAt, NOW);
  assert.equal(store.value().accountId, "simulated-account");
  assert.equal(store.value().token, TOKEN);
  assert.ok(store.value().lease.until > NOW);
  const blocked = metaStub();
  assert.equal((await run(store, blocked)).status, "busy");
  assert.equal(blocked.calls.length, 0);
  failRelease = false;
  assert.equal((await run(store, metaStub(), environment(), () => NOW + 6 * 60_000)).status, "healthy");
  assert.equal(store.value().lease, null);
  assert.equal(store.value().token, TOKEN);
});

test("conditional release cannot overwrite a newer worker or its durable token", async () => {
  const store = memoryStore(state({ expiresAt: NOW + 40 * DAY }));
  const write = store.write; let replaced = false;
  store.write = async (next, etag) => {
    if (!next.lease && !replaced) {
      replaced = true;
      const latest = await store.read();
      await write({ ...latest.state, lease: { owner: "newer-owner", until: NOW + 600_000 } }, latest.etag);
    }
    return write(next, etag);
  };
  await assert.rejects(run(store), { code: "LEASE_RELEASE_FAILED" });
  assert.equal(store.value().lease.owner, "newer-owner");
  assert.equal(store.value().token, TOKEN);
  assert.equal(store.value().lastCheckedAt, NOW);
});

test("a lost release acknowledgment leaves the verified credential durable and the lease cleared", async () => {
  const store = memoryStore(state({ expiresAt: NOW + 40 * DAY }));
  const write = store.write;
  store.write = async (next, etag) => {
    const saved = await write(next, etag);
    if (!next.lease) throw new InstagramError("STORAGE_UNAVAILABLE");
    return saved;
  };
  await assert.rejects(run(store), { code: "LEASE_RELEASE_FAILED" });
  assert.equal(store.value().lease, null);
  assert.equal(store.value().lastCheckedAt, NOW);
  assert.equal(store.value().token, TOKEN);
});


test("private Blob bootstrap and subsequent maintenance preserve encrypted state and release with write ETags", async () => {
  const { BlobPreconditionFailedError } = await import("@vercel/blob");
  let body = null; let revision = 0; let reads = 0;
  const sdk = {
    BlobPreconditionFailedError,
    async get(path, options) {
      assert.equal(options.useCache, false);
      reads++;
      return body === null ? null : { statusCode: 200, stream: new Response(body).body, blob: { etag: String(revision) } };
    },
    async put(path, data, options) {
      if (body !== null && (!options.allowOverwrite || options.ifMatch !== String(revision))) throw new BlobPreconditionFailedError();
      if (body === null) assert.equal(options.allowOverwrite, false);
      body = data; revision++;
      return { etag: String(revision) };
    },
  };
  const env = unknownIssueEnvironment({ INSTAGRAM_TOKEN_REFRESH_ENABLED: "false", INSTAGRAM_TOKEN_SOURCE: "env" });
  const store = createTokenStore({ env, loadSdk: async () => sdk });
  const clock = () => NOW;
  assert.equal((await run(store, metaStub(), env, clock)).status, "refresh_required");
  assert.equal(reads, 1);
  let saved = decryptState(body, encryptionKey(KEY));
  assert.equal(saved.token, TOKEN); assert.equal(saved.issuedAt, null);
  assert.equal(saved.firstObservedAt, NOW); assert.equal(saved.lease, null);
  assert.ok(!body.includes(TOKEN));
  assert.equal((await run(store, metaStub(), env, () => NOW + DAY)).status, "refresh_required");
  saved = decryptState(body, encryptionKey(KEY));
  assert.equal(saved.firstObservedAt, NOW); assert.equal(saved.lastCheckedAt, NOW + DAY);
  assert.equal(saved.lease, null); assert.equal(saved.token, TOKEN);
  assert.equal(reads, 2);
});

for (const [readEtag, apiEtag] of [['revision', 'revision'], ['"revision"', 'revision'], ['"revision"', '"revision"']]) {
  test(`Blob preserves canonical ifMatch for read ${readEtag} and API ${apiEtag}`, async () => {
    let heads = 0;
    const sdk = {
      async get() { return { statusCode: 200, stream: new Response(encryptState(state(), encryptionKey(KEY))).body, blob: { etag: readEtag } }; },
      async head() { heads++; return { etag: apiEtag }; },
      async put(path, body, options) { assert.equal(options.ifMatch, apiEtag); assert.equal(options.allowOverwrite, true); return { etag: apiEtag }; },
    };
    const store = createTokenStore({ env: environment(), loadSdk: async () => sdk });
    const current = await store.read();
    assert.equal(current.etag, apiEtag);
    await store.write(current.state, current.etag);
    assert.equal(heads, readEtag.startsWith('"') ? 1 : 0);
  });
}

test("Blob rejects a GET/head revision race and weak or malformed ETags without writing", async () => {
  for (const [getEtag, headEtag, code] of [['"old"', 'new', 'STATE_CONFLICT'], ['W/"revision"', 'revision', 'STORAGE_ETAG_INVALID'], ['"revision"', 'W/"revision"', 'STORAGE_ETAG_INVALID'], ['"broken', 'broken', 'STORAGE_ETAG_INVALID']]) {
    const store = createTokenStore({ env: environment(), loadSdk: async () => ({
      async get() { return { statusCode: 200, stream: new Response(encryptState(state(), encryptionKey(KEY))).body, blob: { etag: getEtag } }; },
      async head() { return { etag: headEtag }; },
      async put() { assert.fail("A mismatched or invalid ETag must not be written"); },
    }) });
    await assert.rejects(store.read(), { code });
  }
});

test("expired lease and persistent acquisition conflicts are errors rather than busy", async () => {
  for (const until of [NOW, NOW - 1, NOW - 600_000]) {
    const store = memoryStore(state({ lease: { owner: "old-worker", until } }));
    store.write = async () => { throw new InstagramError("STATE_CONFLICT"); };
    const meta = metaStub();
    await assert.rejects(run(store, meta), { code: "LEASE_ACQUISITION_CONFLICT" });
    await assert.rejects(run(store, meta), { code: "LEASE_ACQUISITION_CONFLICT" });
    assert.equal(meta.calls.length, 0);
    assert.equal(store.value().token, TOKEN);
  }
});

test("a lease is recoverable exactly at its expiration timestamp", async () => {
  const store = memoryStore(state({ expiresAt: NOW + 40 * DAY, lease: { owner: "old-worker", until: NOW } }));
  assert.equal((await run(store)).status, "healthy");
  assert.equal(store.value().lease, null);
});

test("HTTP acquisition conflict is reported as a concurrency failure without exposing state", async () => {
  const store = memoryStore();
  store.write = async () => { throw new InstagramError("STATE_CONFLICT"); };
  const res = response(); const log = logger();
  await createMaintenanceHandler({ env: environment(), storeFactory: () => store, now: () => NOW, logger: log })({ method: "GET", headers: { authorization: `Bearer ${CRON}` } }, res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.body.code, "LEASE_ACQUISITION_CONFLICT");
  assert.equal(res.body.category, "concurrency");
  const output = JSON.stringify([res.body, log.messages]);
  for (const secret of [TOKEN, KEY, CRON]) assert.ok(!output.includes(secret));
});

test("expired legacy lease is reclaimed with quoted GET and unquoted API ETags", async () => {
  const { BlobPreconditionFailedError } = await import("@vercel/blob");
  let revision = 1;
  let body = encryptState(state({ expiresAt: NOW + 40 * DAY, lease: { owner: "original-deploy", until: NOW - 600_000 } }), encryptionKey(KEY));
  const sdk = {
    BlobPreconditionFailedError,
    async get() { return { statusCode: 200, stream: new Response(body).body, blob: { etag: `"revision-${revision}"` } }; },
    async head() { return { etag: `revision-${revision}` }; },
    async put(path, data, options) {
      assert.equal(options.allowOverwrite, true);
      if (options.ifMatch !== `revision-${revision}`) throw new BlobPreconditionFailedError();
      body = data; revision++;
      return { etag: `revision-${revision}` };
    },
  };
  const store = createTokenStore({ env: environment(), loadSdk: async () => sdk });
  assert.equal((await run(store)).status, "healthy");
  const saved = (await store.read()).state;
  assert.equal(saved.token, TOKEN);
  assert.equal(saved.lease, null);
  assert.equal(saved.lastCheckedAt, NOW);
  assert.equal(revision, 4);
});
