import { test as base, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

export const translations = Object.fromEntries(["pt", "en", "es", "ca"].map(language => [
  language,
  JSON.parse(readFileSync(new URL(`../src/i18n/locales/${language}.json`, import.meta.url), "utf8")),
]));

export const test = base.extend({
  // Only the network boundary is mocked; production components run unchanged.
  page: async ({ page }, runTest) => {
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (message.type() === "warning") errors.push(message.text());
    });
    await page.route("**/api/instagram", route => route.fulfill({ json: { posts: [] } }));
    await runTest(page);
    expect(errors, "No application errors or console warnings").toEqual([]);
  },
});
export { expect };

export async function scrollTo(page, top) {
  await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), top);
}

export async function expectUnlocked(page) {
  await expect.poll(() => page.evaluate(() => [
    document.body.style.overflow, document.documentElement.style.overflow,
  ])).toEqual(["", ""]);
}
