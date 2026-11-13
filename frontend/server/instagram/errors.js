export class InstagramError extends Error {
  constructor(code) {
    super(code);
    this.name = "InstagramError";
    this.code = code;
  }
}

export function failureCode(error) {
  return error instanceof InstagramError ? error.code : "INTERNAL_ERROR";
}

export function metaErrorDetails(body) {
  const error = body?.error;
  const types = ["OAuthException", "IGApiException", "GraphMethodException"];
  return {
    code: Number.isSafeInteger(error?.code) ? error.code : null,
    type: types.includes(error?.type) ? error.type : "unknown",
    subcode: Number.isSafeInteger(error?.error_subcode) ? error.error_subcode : null,
  };
}

export function failureCategory(code) {
  if (typeof code !== "string") return "unexpected";
  if (code === "META_TOKEN_REJECTED") return "authentication";
  if (code === "META_PERMISSION_REJECTED") return "authorization";
  if (["META_UNAVAILABLE", "META_RATE_LIMITED", "META_INVALID_RESPONSE"].includes(code)) return "temporary";
  if (["DATA_ACCESS_METADATA_REVIEW_DUE", "DATA_ACCESS_METADATA_STALE"].includes(code)) return "metadata";
  if (code.startsWith("META_")) return "upstream";
  if (["STATE_INVALID", "STATE_DECRYPTION_FAILED", "ACCOUNT_MISMATCH"].includes(code)) return "integrity";
  if (code === "TOKEN_EXPIRED" || code === "PENDING_TOKEN_EXPIRED") return "expiration";
  if (code.startsWith("STORAGE_") || code === "STATE_RECOVERY_REQUIRED") return "storage";
  if (code.startsWith("LEASE_") || code === "STATE_CONFLICT") return "concurrency";
  if (code.startsWith("MONITOR_")) return "monitoring";
  if (code.startsWith("TOKEN_") || code.startsWith("BOOTSTRAP_") || code === "STATE_NOT_INITIALIZED" || code === "ENCRYPTION_KEY_INVALID") return "configuration";
  return "unexpected";
}
