import { test, expect } from "./fixtures";
import { readFileSync } from "node:fs";

const report = JSON.parse(readFileSync(new URL("./fixtures/approved-images.json", import.meta.url), "utf8"));
const { desktop, mobile } = report.hero;
const metadata = JSON.parse(readFileSync(new URL("../src/data/image-metadata.json", import.meta.url), "utf8"));
const exports = Object.entries(metadata).flatMap(([url, image]) => [{ url, width: image.width }, ...image.variants.map(variant => ({ url: variant.src, width: variant.width }))]);

for (const width of [390, 1440]) {
  test(`approved hero has five correct images and wraps at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
    await page.clock.pauseAt(new Date("2026-01-01T00:01:00Z"));
    await page.goto("/");
    const hero = page.locator("main > section").first();
    const images = hero.locator("picture img");
    await expect(images).toHaveCount(5);
    const bounds = await hero.boundingBox();
    for (const image of await images.all()) {
      const imageBounds = await image.boundingBox();
      expect(imageBounds.width).toBeCloseTo(bounds.width, 0);
      expect(imageBounds.height).toBeCloseTo(bounds.height, 0);
    }
    const expected = (width <= 768 ? mobile : desktop);
    await expect.poll(() => images.evaluateAll(elements => elements.map(image => image.currentSrc ? new URL(image.currentSrc).pathname : ""))).toEqual(expected);
    await expect.poll(() => images.evaluateAll(elements => elements.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
    const counter = hero.locator(':scope > div[aria-hidden="true"]').last().locator("span");
    await expect(counter.last()).toHaveText("05");
    for (let index = 0; index < 5; index++) {
      await expect(counter.first()).toHaveText(String(index + 1).padStart(2, "0"));

      await images.nth(index).screenshot({ path: testInfo.outputPath(`hero-${width}-${index + 1}.png`) });
      await page.clock.runFor(4000);
    }
    await expect(counter.first()).toHaveText("01");
    await page.setViewportSize({ width: width === 390 ? 1440 : 390, height: 900 });
    const resized = (width === 390 ? desktop : mobile);
    await expect.poll(() => images.evaluateAll(elements => elements.map(image => image.currentSrc ? new URL(image.currentSrc).pathname : ""))).toEqual(resized);
  });
}

test("all approved photographs decode and retain nonblank pixels", async ({ page }, testInfo) => {
  await page.goto("/");
  expect(report.images).toHaveLength(52);
  const results = await page.evaluate(async photos => {
    return Promise.all(photos.map(async photo => {
      const response = await fetch(photo.url);
      const bitmap = await createImageBitmap(await response.blob());
      const canvas = new OffscreenCanvas(16, 16);
      const context = canvas.getContext("2d");
      context.drawImage(bitmap, 0, 0, 16, 16);
      const pixels = context.getImageData(0, 0, 16, 16).data;
      const colours = new Set();
      for (let index = 0; index < pixels.length; index += 4) colours.add(`${pixels[index]},${pixels[index + 1]},${pixels[index + 2]}`);
      return { url: photo.url, ok: response.ok && bitmap.width === photo.width && colours.size > 8 };
    }));
  }, exports);
  expect(results.filter(result => !result.ok)).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.setContent(`<style>body{margin:0;padding:12px;background:#eee8df;font:11px sans-serif}main{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}figure{margin:0}img{display:block;width:100%;height:200px;object-fit:contain;background:#292620}figcaption{padding:8px 0}</style><main>${report.images.map(photo => `<figure><img src="${photo.url}"><figcaption>${photo.url.split("/").pop()}</figcaption></figure>`).join("")}</main>`);
  await expect.poll(() => page.locator("img").evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("approved-contact-sheet.png"), fullPage: true });
});

for (const width of [390, 1440]) {
  test(`selected photos appear on their assigned pages at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const [route, urls] of Object.entries(report.placements)) {
      await page.goto(route);
      const images = page.locator('main img[src^="/assets/images/"]');
      const pageImages = await images.evaluateAll(images => images.map(image => image.getAttribute("src")));
      expect(pageImages.filter(url => !url.includes("/testimonials/"))).toEqual(urls);
      if (route === "/portfolio") {
        for (const [url, position] of Object.entries(report.focalPoints)) {
          await expect(page.locator(`main img[src="${url}"]`)).toHaveCSS("object-position", position);
        }
      }
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll("/", "-")}-${width}.png`) });
    }
  });
}
