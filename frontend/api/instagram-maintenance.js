import { timingSafeEqual } from "node:crypto";
import { createTokenStore } from "../server/instagram/store.js";
import { createMetaClient } from "../server/instagram/meta.js";
import { createMonitor } from "../server/instagram/monitor.js";
import { maintainInstagramToken } from "../server/instagram/maintenance.js";
import { failureCategory, failureCode } from "../server/instagram/errors.js";

function authorized(header, secret) {
  if (typeof secret !== "string" || secret.length < 32 || /[\r\n]/.test(secret) || typeof header !== "string") return false;
  const received = Buffer.from(header);
  const expected = Buffer.from(`Bearer ${secret}`);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function createMaintenanceHandler({ env = process.env, fetcher = fetch, storeFactory = createTokenStore, now = Date.now, logger = console } = {}) {
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "private, no-store");
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }
    if (!authorized(req.headers?.authorization, env.CRON_SECRET)) return res.status(401).json({ error: "Unauthorized" });
    if (env.INSTAGRAM_TOKEN_AUTOMATION_ENABLED !== "true") return res.status(200).json({ status: "disabled" });
    if (env.VERCEL_ENV !== "production") return res.status(409).json({ error: "Production execution required" });

    const notify = createMonitor({ env, fetcher });
    try {
      const result = await maintainInstagramToken({ env, store: storeFactory({ env }), meta: createMetaClient({ fetcher }), now });
      if (result.status === "busy") return res.status(202).json(result);
      const warning = result.dataAccessWarning
        ? result.dataAccessStatus === "potentially_stale" ? "DATA_ACCESS_METADATA_STALE" : "DATA_ACCESS_METADATA_REVIEW_DUE"
        : result.status === "refresh_required" ? "TOKEN_REFRESH_DISABLED" : null;
      const warningCategory = warning ? failureCategory(warning) : null;
      const monitoring = await notify(warning ? "failure" : "success", warning || "INSTAGRAM_MAINTENANCE_OK");
      logger.info("Instagram maintenance", { status: result.status, warning, warningCategory, monitoring });
      return res.status(200).json({ ...result, warning, warningCategory, monitoring });
    } catch (error) {
      const code = failureCode(error);
      const category = failureCategory(code);
      let monitoring;
      try {
        monitoring = await notify("failure", code);
      } catch {
        monitoring = "failed";
      }
      logger.error("Instagram maintenance failed", { code, category, monitoring });
      return res.status(503).json({ status: "error", code, category, monitoring });
    }
  };
}

export default createMaintenanceHandler();
