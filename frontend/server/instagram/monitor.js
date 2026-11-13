import { InstagramError } from "./errors.js";

export function createMonitor({ env = process.env, fetcher = fetch } = {}) {
  return async function notify(event, code) {
    if (!env.INSTAGRAM_MONITOR_PING_URL) return "not_configured";
    let url;
    try {
      url = new URL(env.INSTAGRAM_MONITOR_PING_URL);
      if (url.protocol !== "https:" || url.hostname !== "hc-ping.com" || url.port || url.username || url.password || url.search || url.hash || !/^\/[a-f0-9-]{36}$/i.test(url.pathname)) throw new Error();
    } catch {
      throw new InstagramError("MONITOR_CONFIGURATION_INVALID");
    }
    if (event === "failure") url.pathname += "/fail";
    try {
      const response = await fetcher(url, {
        method: "POST",
        redirect: "error",
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
        headers: { "Content-Type": "text/plain" },
        body: code,
      });
      if (!response.ok) throw new Error();
      return "sent";
    } catch {
      throw new InstagramError("MONITOR_UNAVAILABLE");
    }
  };
}
