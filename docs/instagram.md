# Instagram integration and automatic token maintenance

Local implementation prepared on 13 November 2026. No storage account, monitor, production setting or credential was created or changed. No authenticated Meta request or real refresh was executed. Production activation remains a separate step.

## Confirmed information and remaining verification

The owner confirmed the Meta Access Token Debugger reports the application **BMV Makeup Website-IG**, token type **User**, valid status, and the `instagram_business_basic` permission. Token expiry is **11 January 2027**; data-access expiry is **10 February 2027**. These dates use day/month/year notation from the supplied results.

Those facts are consistent with an Instagram Login long-lived user token, but `User` alone does not prove its issuance flow. Confirm that the app uses **Instagram API with Instagram Login** and that the credential is long-lived. The debugger reports `Issued: Unknown`; initialization accepts that without inventing an issuance date. The confirmed expiry timestamps are `1799668811` (11 January 2027, 12:00:11 UTC) and `1802260808` (10 February 2027, 12:00:08 UTC). Record exact known metadata without sharing the credential. Day-only dates are not accepted as runtime configuration because timezone and time-of-day would otherwise be invented.

The official refresh endpoint is `GET https://graph.instagram.com/refresh_access_token`, using `grant_type=ig_refresh_token` and the current token, entirely on the server. The token must be valid, at least 24 hours old, and have the required basic permission. The code explicitly checks the declared flow/kind, timestamps and permission before the scheduled work, and verifies profile/media access before a refresh. A real refresh remains the final proof that Meta accepts this particular token; it is intentionally not part of this local delivery.

Reference: [Meta Business Login and token refresh](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/business-login).

## Current feed contract

`frontend/api/instagram.js` keeps its existing successful JSON response: `username`, `profilePictureUrl` and `posts`. Post normalization, existing error response messages and `s-maxage=3600, stale-while-revalidate=86400` are preserved. The frontend is unchanged.

The default token source remains `INSTAGRAM_ACCESS_TOKEN`; absent new configuration, the feed does not contact Blob and behaves as before. The optional `blob` mode resolves the active token from the encrypted private record. A missing/unverified/corrupt record, or expired token produces the existing generic unavailable response, rather than returning secrets or silently falling back to a potentially obsolete environment credential.

Only allow-listed numeric Meta diagnostics and known error types are logged. Full errors, authenticated request URLs, access tokens, encryption keys, cron secrets and monitor URLs are never deliberately logged or returned.

## Files and responsibilities

| File | Responsibility |
| --- | --- |
| `frontend/api/instagram.js` | Existing public feed with an injectable token provider for tests |
| `frontend/api/instagram-maintenance.js` | Authenticated maintenance endpoint and safe operational responses |
| `frontend/server/instagram/state.js` | State schema, bootstrap metadata, AES-256-GCM encryption and validation |
| `frontend/server/instagram/store.js` | Private Blob access, fresh reads, exclusive initialization and ETag compare-and-swap |
| `frontend/server/instagram/meta.js` | Fixed Meta endpoints, bounded requests, identity/media verification and sanitized failures |
| `frontend/server/instagram/maintenance.js` | Daily health checks, refresh eligibility, expiring lease and durable pending-token recovery |
| `frontend/server/instagram/monitor.js` | Optional Healthchecks.io heartbeat/failure adapter |
| `frontend/scripts/instagram.test.js` | Network-isolated tests with simulated Meta, storage and monitor responses |
| `frontend/vercel.json` | Daily schedule and bounded function duration; original SPA rewrite retained |

Server modules are outside `api/`, so they do not create extra public endpoints. Vite does not import them into the browser bundle. No explanatory source comments were introduced; technical notes are maintained here.

## Daily workflow

The prepared Vercel Cron schedule calls `/api/instagram-maintenance` at **06:00 UTC daily**. It is not active anywhere until deployment. Requests must use GET and the correct bearer `CRON_SECRET`; the endpoint uses a constant-time secret comparison and `Cache-Control: private, no-store`.

Automation is disabled by default. Even if enabled, the endpoint rejects non-production Vercel environments. It never turns a missing setting into implicit authorization to contact Meta. `VERCEL_ENV` is supplied by Vercel; do not set it manually to bypass the local/preview guard.

Once explicitly configured:

1. Read and authenticate/decrypt the private state. When absent, initialize it only if the separate bootstrap flag and all required metadata are configured.
2. Reject incompatible, expired or future-dated credentials. Data-access metadata alone never rejects a credential. A usable durable pending token can recover an expired previous token.
3. Claim a five-minute lease using an ETag conditional write, or an exclusive write for initial creation. A confirmed live lease returns `202` / `busy` without calling Meta or emitting a success heartbeat. If acquisition loses compare-and-swap, reread the record: return busy only if it now has a live lease; otherwise report `LEASE_ACQUISITION_CONFLICT` as HTTP 503/category concurrency. Persistent ETag failures must not masquerade as a running worker.
4. Verify profile identity and a minimal media read. Empty media is a valid feed state. Initialization binds the record to the current account; later checks reject another account. Only after successful authenticated verification, persist the first observation time and a credential fingerprint inside the encrypted record. Neither is supplied by an operator or exposed in logs/responses.
5. If more than 30 days remain, update health state and finish. At 30 days or less, refresh only when the separate refresh flag is enabled, the public feed is already reading Blob, at least 24 hours have elapsed since the first verified observation of that same credential, any known issuance is at least 24 hours old, and the last refresh attempt was at least 24 hours ago.
6. Persist the attempt timestamp before the refresh request. On success, immediately save the candidate token encrypted as `pending`, while retaining the previous active token. Verify the candidate against the bound account and media endpoint before promoting it.
7. Persist the returned token lifetime, preserve the independently recorded data-access expiry, and release only this worker's lease. Send an optional sanitized monitoring signal.

Unknown issuance remains `null`. An observation proves only a minimum age; it is never presented as issuance. Legacy records without observation proof start a new 24-hour wait at their next successful verification, even if their older health-check timestamp exists. A changed credential starts its own observation period after verification; an unchanged credential preserves its original observation and any genuine issuance metadata. Pending candidates record `receivedAt`, not a fabricated issuance date; legacy pending timestamps are interpreted as receipt times during recovery.

The function is capped at 180 seconds, shorter than the five-minute lease. Meta calls have eight-second timeouts, Blob operations ten-second abort signals, and monitor calls five-second timeouts. If a function is terminated, the lease eventually expires. There is no dependence on visitor traffic.

A lost response after a remote refresh has an unavoidable ambiguity: Meta and Blob do not form one atomic transaction. The persisted attempt timestamp prevents another refresh for 24 hours. A saved pending candidate is verified and resumed on the next run without refreshing it again. A storage error does not report success or intentionally overwrite the prior token. Operators receive a failure signal when monitoring is configured; some failures can still require manual recovery. Do not assume a refresh always returns the same token or that the previous token remains usable forever.

## Lease release diagnosis and recovery

`LEASE_RELEASE_FAILED` means the final cleanup failed after processing; it does not imply token verification or persistence failed. The verified state, or even a refreshed token, may already be durable. A write can also succeed remotely while its acknowledgment is lost, so this error alone cannot establish whether the lease remains present. `monitoring: not_configured` simply means no external monitor is configured.

Successful processing now releases conditionally using the state and ETag from its last acknowledged write, without an unnecessary origin reread. Blob `get` takes its ETag from the HTTP response header, whereas `put` returns the API response ETag. The installed SDK forwards `ifMatch` unchanged as `x-if-match`; its `head()` returns API metadata and documents its ETag for conditional writes. When GET returns a quoted strong HTTP ETag, the adapter obtains `head()` metadata and compares the strong identifiers. Quotes are interpreted only for this identity comparison; the API-provided ETag is forwarded unchanged as `ifMatch`, whether quoted or unquoted. A mismatched GET/head revision fails closed with `STATE_CONFLICT`; malformed download ETags and weak/malformed API metadata ETags are rejected. Valid weak download ETags use the consistent-read path described below. Unquoted GET identifiers are forwarded unchanged. This adds one metadata request for quoted GET results, without changing the encrypted record format. The reported production log does not identify whether its cleanup failed on a read, write, or precondition; a format discrepancy is not established by that log. The change removes the additional read and uses the write-returned identifier directly on the successful path.

After a processing/storage failure, cleanup still rereads the latest encrypted state before attempting a conditional release. That recovery path must preserve a candidate or promoted token whose write may have succeeded without acknowledgment. Every release retains the ETag precondition and checks lease ownership; a competing writer cannot be overwritten blindly. There is no unconditional retry or record reinitialization.

If cleanup did not persist, the lease expires five minutes after acquisition. A later authorized maintenance run can reclaim an expired lease without deleting or replacing the token record. Before expiry, another run returns `busy`. The feed resolver does not reject a verified record solely because it contains a lease. Do not delete the production object or rebootstrap to resolve this error. Confirmation of production state remains a separate authorized operation; local tests never access that object.

### Weak download ETags and consistent reads

Production confirmed a valid weak HTTP ETag from `get()`. It is a download validator, not a write version. The adapter does not remove `W/` to create an `ifMatch` value and does not compare the weak identifier with API metadata.

After detecting it, cancel the initial body and perform `head → get(useCache: false) → consume the complete body → head`. Both metadata results must provide valid strong API ETags and be exactly identical. Return the decrypted state only after that check, paired with the original unmodified API ETag for conditional writes. A changed version or disappearance is `STATE_CONFLICT`; missing/weak/malformed API metadata fails closed. There are no automatic repeated reads or unconditional write fallbacks.

The justification relies on the SDK's documented origin-read behavior for private `useCache: false`, API metadata describing the current object, and the object ETag serving as its conditional-write version. It is optimistic version validation, not a transactional lock spanning services. The version checks reject changes during the read; a later modification is rejected by `ifMatch`. Restoring exactly identical content/ETag is equivalent for the state consumed; Blob writers here encrypt each update with a fresh random IV. The approach cannot compensate for a service violating those consistency/version contracts; a transactional store would be required if those guarantees do not hold. No live service verification was performed locally.

For each weak download read, this adds two metadata operations and one additional origin GET beyond initial detection. Record encryption, active/pending tokens, lease rules, disabled defaults and public API responses remain unchanged. The existing encrypted object needs no deletion or migration.

### Safe ETag diagnostics

Failed ETag validation emits a server-only structured warning with stage `get_etag_validation` or `head_etag_validation`. A failed identity comparison emits `etag_comparison` with `matches: false`. Successful validation/comparison emits no diagnostic log. Fields are limited to presence, type, string length, weak-prefix/outer-quotes/control-character booleans and a fixed rejection reason (`missing`, `not_string`, `empty`, `weak_etag`, `control_characters`, `unsupported_format`, `identity_mismatch` or `version_changed`). Comparison failures include structural metadata for each source, or the before/after API versions for a consistent-read failure. Values, fragments, hashes, credentials, Blob content and HTTP headers are never included. Logger failures are ignored to preserve the original storage behavior and API error. These diagnostics do not change validation, conditional writes, lease processing or token renewal.

## Token expiry and data-access expiry are independent

`expiresAt` changes using the refresh response's `expires_in`. The stored `dataAccessExpiresAt` is retained unchanged, never inferred from token expiry or automatically advanced by this job.

Within 30 days of that date, successful checks report `dataAccessStatus: review_due` and `DATA_ACCESS_METADATA_REVIEW_DUE`. After it passes, they report `potentially_stale` and `DATA_ACCESS_METADATA_STALE`. Both are metadata warnings, not proof of revoked authorization: authenticated Meta profile/media responses determine whether the credential currently works. Neither warning blocks feed reads or otherwise eligible refreshes. A successful check reports `credentialStatus: verified` while retaining the warning and original date.

The optional monitor receives a failure signal for these warnings so an operator reviews them; that alert does not mean the feed failed or reauthorization was confirmed necessary. Do not erase the warning or move its date forward without verified metadata.

The official Instagram Login refresh documentation does not establish that refreshing extends this separate debugger field, nor establish a mandatory human login every 90 days for this flow. Continuous refresh therefore cannot be promised to eliminate every future authorization: revocation or changed permissions can still require Bruno's action. Actual field behavior remains an external verification item, not a reason to stop a working feed preemptively.

The supplied token-refresh window starts **12 December 2026 at 12:00:11 UTC**. The metadata-warning window starts **11 January 2027 at 12:00:08 UTC**. These timestamps are operational references, not hard-coded dates.

## Configuration to perform later in Vercel

Use the existing Pro project with `frontend/` as its root. Keep production resources and secrets isolated from Preview and Development.

| Variable/resource | Configuration |
| --- | --- |
| Existing `INSTAGRAM_ACCESS_TOKEN` | Keep its current value during initial migration. The code never edits it. |
| Private Vercel Blob store | Create a dedicated **Private** store and connect only the intended Production project/environment. Never use a public photo store. |
| `BLOB_STORE_ID` / platform OIDC | Preferred Blob access. Vercel supplies runtime OIDC; the SDK obtains the credential. Grant access only to the intended store and environment. |
| `BLOB_READ_WRITE_TOKEN` | Optional server-only alternative if OIDC cannot be used. Do not configure both without deliberately choosing the static credential, which the code gives precedence. |
| `INSTAGRAM_TOKEN_ENCRYPTION_KEY` | New Secret containing exactly 32 cryptographically random bytes encoded as standard base64. Generate and retain it privately; do not paste it into chat or commit it. |
| `CRON_SECRET` | New independent Secret, at least 32 characters, with no newline. Vercel sends it in the cron request's Authorization header. |
| `INSTAGRAM_TOKEN_SOURCE` | Default `env`; change to `blob` only after a verified private record exists. |
| `INSTAGRAM_TOKEN_AUTOMATION_ENABLED` | Default disabled; `true` enables daily maintenance in Production. |
| `INSTAGRAM_TOKEN_REFRESH_ENABLED` | Default disabled; keep `false` during initialization and feed migration. Enable only after separate approval for a real refresh. |
| `INSTAGRAM_TOKEN_BOOTSTRAP_ENABLED` | Default disabled; temporarily enable for the first record only, then disable. It never replaces an existing record. |
| `INSTAGRAM_TOKEN_COMPATIBILITY_CONFIRMED` | Set `true` only after confirming long-lived Instagram Login provenance and basic permission. Required for bootstrap. |
| `INSTAGRAM_TOKEN_ISSUED_AT` | Optional genuine issuance timestamp: UTC ISO 8601 with seconds and `Z`, or ten-digit Unix seconds. Leave unset, empty or `Unknown` when unavailable. Never estimate it; the server records verified observation separately. |
| `INSTAGRAM_TOKEN_EXPIRES_AT` | Exact token-expiry timestamp in the same accepted format. |
| `INSTAGRAM_DATA_ACCESS_EXPIRES_AT` | Exact independent data-access expiry timestamp in the same accepted format. |
| `INSTAGRAM_MONITOR_PING_URL` | Optional Secret for the standard HTTPS `hc-ping.com` UUID URL after an authorized monitor is created. Without it, no external alert is sent. |

The Vercel creation screen may initially connect both Production and Preview. Before storing any credential, use the store’s Projects → Update Project Connection settings to retain only Production, and verify Preview cannot access a harmless test object. A future CLI creation can explicitly select `--environment production`; do not rely solely on the runtime Production guard as storage authorization. No connection was configured locally.

The encrypted record is `instagram/token-state.enc` inside the private store. It is never served by a download endpoint. AES-GCM protects its contents and integrity in addition to store access controls. Store reads use `useCache: false`; writes use `ifMatch` for updates, and forbid overwrite on initialization. There is no TTL that could unexpectedly delete a valid token record.

Do not rotate the encryption key independently of the record: it would make the stored state unreadable. Plan an authorized re-encryption or reinitialization first. Keep an access-controlled copy of the key in the project's secret-management process.

References: [private Blob](https://vercel.com/docs/vercel-blob/private-storage), [conditional writes and consistent reads](https://vercel.com/docs/vercel-blob/using-blob-sdk), [cron authentication](https://vercel.com/docs/schedules/cron-jobs/manage-cron-jobs).

## Safe activation sequence, after authorization

1. Use the confirmed precise expiry timestamps, leave unknown issuance unset, and confirm the app's issuance flow. Create/configure the private store and new operational secrets; keep the existing Instagram credential unchanged.
2. Deploy manually with feed source `env`, bootstrap and automation enabled, and **refresh disabled**. An authenticated production maintenance run will read Meta and seed/verify the record, but will not call the refresh endpoint. This stage does make real authenticated read requests and requires separate authorization; none were made during development.
3. Confirm the maintenance response indicates a verified healthy record, the feed still works, and no secret appears in responses/logs. Configure/test the external monitoring channel if approved.
4. Change the source to `blob`, disable bootstrap, and redeploy. Confirm the existing feed response and cache. Keep refresh disabled until this migration is validated.
5. Only after authorization to allow real renewal, enable the refresh flag and redeploy. The job still waits until the 30-day window and at least 24 hours after the same credential’s first verified observation, even if issuance is known. Do not falsify production dates to force a test.
6. Check the first scheduled renewal and subsequent feed read. Configure the monitor to expect one successful signal per day with a suitable grace period, such as two hours. Test delivery to the chosen recipient.

Environment changes apply to new deployments, not the currently running one. A manually invoked production maintenance request must authenticate using the cron secret in an HTTP header, never a URL parameter. Use a trusted administrative client that does not print headers or authenticated URLs. Preview/local executions are rejected even with automation enabled.

The original environment token can support a controlled rollback only while it remains valid. Once the stored token has been refreshed, do not assume the old environment value remains a permanent backup. A Blob outage is surfaced as feed unavailability with the existing frontend fallback; it does not silently substitute an obsolete token.

## Monitoring and operational responses

No external monitoring account was registered. The adapter supports the standard Healthchecks.io ping URL and rejects arbitrary destinations and redirects. It sends success only after health checks and persistence complete; data-access warnings, disabled-but-due refreshes and operational failures send `/fail` with a fixed safe code. A busy worker sends neither success nor failure, leaving the actual owner responsible for the heartbeat.

Without a configured URL, the authenticated response explicitly reports `monitoring: not_configured`; safe server logs remain available but are not proactive email alerts. An unavailable monitor produces a visible maintenance error even if token persistence succeeded. A configured monitor can detect a missing daily heartbeat independently of the Vercel function. Vercel Cron does not automatically retry failed invocations; this job checks again daily and rate-limits refresh attempts to one per 24 hours. Revocation or permanent permission failures may require operator action rather than endless rapid retrying.

Authenticated maintenance responses and safe logs include `category` on failure or `warningCategory` on warnings:

| Category | Examples | Interpretation |
| --- | --- | --- |
| `authentication` | `META_TOKEN_REJECTED` (HTTP 401 or Meta code 190) | Meta rejected the credential; inspect securely before deciding whether new authorization is needed. |
| `authorization` | `META_PERMISSION_REJECTED` (HTTP 403 or permission codes) | Check account/permission configuration. |
| `temporary` | `META_UNAVAILABLE`, `META_RATE_LIMITED`, `META_INVALID_RESPONSE` | Timeout, network failure, HTTP 429/5xx, transient errors or unreadable responses; not evidence of revocation. |
| `metadata` | `DATA_ACCESS_METADATA_REVIEW_DUE`, `DATA_ACCESS_METADATA_STALE` | Review the recorded date; authenticated verification succeeded. |

HTTP 429/5xx take precedence over any authentication-looking body. Failed health checks do not refresh, erase observation history, or rewrite expiry metadata. Other operational codes include `STORAGE_UNAVAILABLE`, `STATE_CONFLICT`, `STATE_RECOVERY_REQUIRED` and `LEASE_RELEASE_FAILED`. Error responses never include the upstream exception or credential. Do not enable request/HTTP tracing that records Meta query strings.

Reference: [Healthchecks ping API](https://healthchecks.io/docs/http_api/).

## Reauthorization and record replacement

Editing bootstrap variables does not update an existing encrypted record. This prevents stale environment metadata from overwriting later successful renewals.

If Bruno reauthorizes access, verify the new credential, account and exact metadata first. For a controlled replacement: disable automation, switch the feed to a newly verified environment credential through an authorized deployment, and ensure no maintenance lease is running. Retain the old encrypted state privately for rollback/diagnosis if needed, then remove only the active token-state object from the private store. Configure the new precise metadata and repeat initialization with refresh disabled before switching back to Blob. Never change only the data-access date to imply consent was renewed, and never delete the active record while the live feed still relies on it.

## Local tests and security checks

From `frontend/`:

```sh
npm run test:instagram
npm run test:i18n
npm run test:images
npm run lint
npm run build
npm run test:behavior -- tests/instagram.spec.js
```

Use an installed Playwright browser or set the optional `BMV_BROWSER_PATH` for browser tests. No real Meta, Blob or monitor credentials are required. The Node tests inject all service boundaries and reject accidental use of the global fetch function. They include the actual SDK's conflict-error class and OIDC export compatibility, without calling external services.

Coverage includes encryption/tampering, compatibility metadata, private/consistent Blob reads, conditional/exclusive writes, unknown issuance, credential-bound observation, legacy migration, exact 24-hour observation boundaries, same/changed-token promotion, the exact 30-day boundary, unchanged data-access expiry and nonblocking stale-date warnings, authentication/authorization versus temporary failure classification, bootstrap verification, expired credentials, single-worker leases, lease takeover, pending-token recovery, lost storage acknowledgments, upstream/network errors, monitoring failures, redacted logs, unchanged public JSON/cache behavior and disabled/local/preview safety gates.

The official Blob SDK is the only new direct runtime dependency. A narrow override selects `@vercel/oidc` 4.0.9 because the Blob SDK's default older OIDC dependency brought a vulnerable configuration-parser chain. The installed SDK still exposes the required OIDC function; integration tests check that interface. Remove/revisit the override when upstream resolves the dependency. Production dependency audit currently reports zero vulnerabilities. Existing development-tool audit findings were not changed through broad updates in this task.

## Cost and remaining external checks

The existing Pro plan is sufficient; no SQL or Redis database, extra Vercel project or paid monitoring tier is required by the code. Expect roughly 30 scheduled checks per month and about one refresh per month when successful 60-day renewals are performed at the 30-day threshold. Blob stores a small encrypted object, with reads/writes for checks and token resolution on uncached feed requests. Actual costs depend on traffic, region, function usage and available Pro usage credits; do not assume a guaranteed zero bill.

[Vercel Blob pricing](https://vercel.com/docs/vercel-blob/usage-and-pricing) and [cron usage](https://vercel.com/docs/schedules/cron-jobs/usage-and-pricing) apply. A monitor may fit its free tier; verify its current terms before registering it.

Still required: service creation, flow/provenance confirmation, production-only permissions, deployment, real read-only verification, monitoring delivery, and eventually an explicitly authorized refresh. None of those external actions was performed by this local implementation.
