import { InstagramError } from "./errors.js";
import { DAY } from "./state.js";

export function createMetaClient({ fetcher = fetch } = {}) {
  async function request(path, token, params) {
    const url = new URL(path, "https://graph.instagram.com");
    url.search = new URLSearchParams({ ...params, access_token: token }).toString();
    let response;
    let body;
    try {
      response = await fetcher(url, { method: "GET", redirect: "error", cache: "no-store", signal: AbortSignal.timeout(8000) });
    } catch {
      throw new InstagramError("META_UNAVAILABLE");
    }
    if (response.status === 429) throw new InstagramError("META_RATE_LIMITED");
    if (response.status >= 500) throw new InstagramError("META_UNAVAILABLE");
    try {
      body = await response.json();
    } catch {
      if (response.status === 401) throw new InstagramError("META_TOKEN_REJECTED");
      if (response.status === 403) throw new InstagramError("META_PERMISSION_REJECTED");
      throw new InstagramError("META_INVALID_RESPONSE");
    }
    if (!response.ok || body?.error) {
      if (body?.error?.code === 190 || response.status === 401) throw new InstagramError("META_TOKEN_REJECTED");
      if (body?.error?.code === 10 || body?.error?.code === 200 || response.status === 403) throw new InstagramError("META_PERMISSION_REJECTED");
      if (body?.error?.is_transient === true) throw new InstagramError("META_UNAVAILABLE");
      throw new InstagramError("META_REQUEST_FAILED");
    }
    return body;
  }

  return {
    async verify(token, expectedAccountId = null) {
      const profile = await request("/me", token, { fields: "id,username" });
      if (typeof profile?.id !== "string" || !profile.id || typeof profile.username !== "string" || !profile.username) throw new InstagramError("META_INVALID_RESPONSE");
      if (expectedAccountId && profile.id !== expectedAccountId) throw new InstagramError("ACCOUNT_MISMATCH");
      const media = await request("/me/media", token, { fields: "id", limit: "1" });
      if (!Array.isArray(media?.data)) throw new InstagramError("META_INVALID_RESPONSE");
      return profile.id;
    },
    async refresh(token) {
      const body = await request("/refresh_access_token", token, { grant_type: "ig_refresh_token" });
      if (typeof body?.access_token !== "string" || !body.access_token || body.access_token.length > 8192 || /[\r\n]/.test(body.access_token) || typeof body.token_type !== "string" || body.token_type.toLowerCase() !== "bearer" || !Number.isSafeInteger(body.expires_in) || body.expires_in <= DAY / 1000 || body.expires_in > 90 * DAY / 1000) {
        throw new InstagramError("META_INVALID_REFRESH_RESPONSE");
      }
      return { token: body.access_token, expiresIn: body.expires_in };
    },
  };
}
