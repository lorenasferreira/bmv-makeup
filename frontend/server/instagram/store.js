import { decryptState, encryptState, encryptionKey, validateState } from "./state.js";
import { InstagramError } from "./errors.js";

const PATHNAME = "instagram/token-state.enc";

function strongEtagIdentity(value) {
  if (typeof value !== "string" || !value || value.startsWith("W/")) throw new InstagramError("STORAGE_ETAG_INVALID");
  if (/^"[\x21\x23-\x7e\x80-\xff]+"$/.test(value)) return value.slice(1, -1);
  if (/^[\x21\x23-\x7e\x80-\xff]+$/.test(value)) return value;
  throw new InstagramError("STORAGE_ETAG_INVALID");
}

export function createTokenStore({ env = process.env, loadSdk = () => import("@vercel/blob"), logger = console } = {}) {
  const key = encryptionKey(env.INSTAGRAM_TOKEN_ENCRYPTION_KEY);
  const credentials = env.BLOB_READ_WRITE_TOKEN ? { token: env.BLOB_READ_WRITE_TOKEN } : { storeId: env.BLOB_STORE_ID };
  if (!env.BLOB_READ_WRITE_TOKEN && !env.BLOB_STORE_ID) throw new InstagramError("STORAGE_NOT_CONFIGURED");

  function etagMetadata(value) {
    const isString = typeof value === "string";
    return {
      present: value !== undefined && value !== null,
      type: value === null ? "null" : typeof value,
      length: isString ? value.length : null,
      weakPrefix: isString && value.startsWith("W/"),
      outerQuotes: isString && value.length >= 2 && value.startsWith('"') && value.endsWith('"'),
      controlCharacters: isString && Array.from(value).some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127),
    };
  }

  function diagnose(stage, details) {
    try {
      logger.warn("Instagram storage ETag diagnostic", { stage, ...details });
    } catch {
      return;
    }
  }

  function validatedIdentity(value, stage) {
    try {
      return strongEtagIdentity(value);
    } catch (error) {
      const metadata = etagMetadata(value);
      const reason = !metadata.present ? "missing" : metadata.type !== "string" ? "not_string" : metadata.length === 0 ? "empty" : metadata.weakPrefix ? "weak_etag" : metadata.controlCharacters ? "control_characters" : "unsupported_format";
      diagnose(stage, { ...metadata, reason });
      throw error;
    }
  }

  const store = {
    async read() {
      try {
        const sdk = await loadSdk();
        const result = await sdk.get(PATHNAME, { ...credentials, access: "private", useCache: false, abortSignal: AbortSignal.timeout(10_000) });
        if (!result) return null;
        if (result.statusCode !== 200 || !result.stream || !result.blob?.etag) throw new InstagramError("STORAGE_INVALID_RESPONSE");
        let etag = result.blob.etag;
        try {
          validatedIdentity(etag, "get_etag_validation");
        } catch (error) {
          await result.stream.cancel().catch(() => {});
          throw error;
        }
        if (etag.startsWith('"')) {
          try {
            const metadata = await sdk.head(PATHNAME, { ...credentials, abortSignal: AbortSignal.timeout(10_000) });
            if (validatedIdentity(metadata?.etag, "head_etag_validation") !== validatedIdentity(etag, "get_etag_validation")) {
              diagnose("etag_comparison", { get: etagMetadata(etag), head: etagMetadata(metadata?.etag), reason: "identity_mismatch", matches: false });
              throw new InstagramError("STATE_CONFLICT");
            }
            etag = metadata.etag;
          } catch (error) {
            await result.stream.cancel().catch(() => {});
            throw error;
          }
        }
        const reader = result.stream.getReader();
        let size = 0;
        const chunks = [];
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > 65_536) throw new InstagramError("STATE_INVALID");
            chunks.push(Buffer.from(value));
          }
        } finally {
          await reader.cancel().catch(() => {});
        }
        return { state: decryptState(Buffer.concat(chunks).toString("utf8"), key), etag };
      } catch (error) {
        if (error instanceof InstagramError) throw error;
        throw new InstagramError("STORAGE_UNAVAILABLE");
      }
    },
    async write(state, etag = null) {
      validateState(state);
      let sdk;
      try {
        sdk = await loadSdk();
        const result = await sdk.put(PATHNAME, encryptState(state, key), {
          ...credentials,
          access: "private",
          addRandomSuffix: false,
          allowOverwrite: etag !== null,
          ...(etag !== null ? { ifMatch: etag } : {}),
          contentType: "application/octet-stream",
          cacheControlMaxAge: 60,
          abortSignal: AbortSignal.timeout(10_000),
        });
        if (!result?.etag) throw new InstagramError("STORAGE_INVALID_RESPONSE");
        return { state: structuredClone(state), etag: result.etag };
      } catch (error) {
        if (sdk?.BlobPreconditionFailedError && error instanceof sdk.BlobPreconditionFailedError) throw new InstagramError("STATE_CONFLICT");
        if (error instanceof InstagramError) throw error;
        if (etag === null) {
          let existing;
          try {
            existing = await store.read();
          } catch {
            existing = null;
          }
          if (existing) throw new InstagramError("STATE_CONFLICT");
        }
        throw new InstagramError("STORAGE_UNAVAILABLE");
      }
    },
  };
  return store;
}

export async function resolveInstagramToken({ env = process.env, storeFactory = createTokenStore, now = Date.now } = {}) {
  const source = env.INSTAGRAM_TOKEN_SOURCE || "env";
  if (source === "env") return env.INSTAGRAM_ACCESS_TOKEN;
  if (source !== "blob") throw new InstagramError("TOKEN_SOURCE_INVALID");
  const stored = await storeFactory({ env }).read();
  if (!stored) throw new InstagramError("STATE_NOT_INITIALIZED");
  validateState(stored.state);
  if (!stored.state.accountId || !stored.state.lastCheckedAt) throw new InstagramError("STATE_NOT_VERIFIED");
  if (stored.state.expiresAt <= now()) throw new InstagramError("TOKEN_EXPIRED");
  return stored.state.token;
}
