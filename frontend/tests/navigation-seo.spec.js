import { test, expect, translations } from "./fixtures";
import { readFileSync } from "node:fs";

const { hero: { desktop, mobile } } = JSON.parse(readFileSync(new URL("./fixtures/approved-images.json", import.meta.url), "utf8"));

const routes = ["/", "/about", "/services", "/portfolio", "/education", "/contact", "/services/weddings"];
const keys = ["home", "about", "services", "portfolio", "education", "contact", "weddings"];

for (const width of [390, 1440]) {
  for (const language of ["pt", "en", "es", "ca"]) {
    test(`${language}: current navigation and document metadata at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(language => localStorage.setItem("bmv-language", language), language);
      const copy = translations[language];
      for (const [index, route] of routes.entries()) {
        await page.goto(route);
        await expect(page.locator("html")).toHaveAttribute("lang", language);
        await expect(page).toHaveTitle(index ? `${copy.seo.pages[keys[index]]} | ${copy.seo.title}` : copy.seo.title);
        await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", copy.seo.description);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.bmvmakeup.com${route}`);
        let navigation = page.locator("header > nav");
        if (width < 1001) {
          await page.getByRole("button", { name: copy.accessibility.openMenu }).click();
          navigation = page.getByRole("dialog").locator("nav");
        }
        const current = navigation.locator('a[aria-current="page"]');
        await expect(current).toHaveCount(1);
        await expect(current).toHaveAttribute("href", route);
        const marker = await current.isVisible() ? current : navigation.locator('a[data-active="true"]');
        expect(await marker.evaluate(link => parseFloat(getComputedStyle(link, "::after").height))).toBeGreaterThan(0);
        if (width < 1001) await page.keyboard.press("Escape");
      }
    });
  }

  test(`Weddings process retains all four steps without images at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/services/weddings");
    const process = page.locator("main > section").nth(2);
    await expect(process.locator("img, picture")).toHaveCount(0);
    await expect(process.getByRole("listitem")).toHaveCount(4);
    const steps = ["vision", "trial", "weddingDay", "celebration"];
    for (const [index, key] of steps.entries()) {
      const step = process.getByRole("listitem").nth(index);
      await expect(step).toContainText(String(index + 1).padStart(2, "0"));
      await expect(step.getByRole("heading")).toHaveText(translations.en.weddings.process.steps[key].title);
      await expect(step).toContainText(translations.en.weddings.process.steps[key].description);
    }
    await process.scrollIntoViewIfNeeded();
    await process.screenshot({ path: testInfo.outputPath(`weddings-process-${width}.png`) });
  });

  test(`Home requests only the selected device's hero set at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const images = [];
    page.on("request", request => { if (request.resourceType() === "image") images.push(new URL(request.url()).pathname); });
    await page.goto("/");
    const hero = page.locator("main > section").first();
    await expect.poll(() => hero.locator("img").evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
    for (const url of width < 769 ? desktop : mobile) expect(images).not.toContain(url);
    await expect(hero.locator('img[fetchpriority="high"]')).toHaveCount(1);
    await expect(page.locator('main > section').nth(1).locator("img")).toHaveAttribute("loading", "lazy");
  });
}

test("social metadata and social image are delivered before JavaScript", async ({ browser, request }) => {
  const response = await request.get("/");
  const html = await response.text();
  for (const key of ["og:title", "og:description", "og:image", "og:image:width", "og:image:height", "og:type", "og:url", "og:site_name"]) {
    expect(html).toContain(`property="${key}"`);
  }
  for (const key of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) expect(html).toContain(`name="${key}"`);
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://www.bmvmakeup.com/assets/images/social/bmv-makeup-bruno.jpg");
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  await page.goto("/assets/images/social/bmv-makeup-bruno.jpg");
  await expect.poll(() => page.locator("img").evaluate(image => image.naturalWidth)).toBe(1200);
  await expect.poll(() => page.locator("img").evaluate(image => image.naturalHeight)).toBe(630);
  await context.close();
});
