import { test, expect } from "./fixtures";
import { readFileSync } from "node:fs";

const desktop = ["cas-09", "cas-13", "nov-b94ca63befe18347", "soc-10", "soc-08"];
const mobile = ["nov-c0a362f3c9338b3b", "nov-1ee9718a69d99658", "nov-ee9b3959e5e231e9", "nov-8578c4c71970766e", "nov-e517b557a712e6f1"];
const report = JSON.parse(readFileSync(new URL("../docs/PHOTO_CURATION.json", import.meta.url), "utf8"));

for (const width of [390, 1440]) {
  test(`curated hero has five correct images and wraps at ${width}px`, async ({ page }, testInfo) => {
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
    const expected = (width <= 768 ? mobile : desktop).map(id => `/assets/images/curated/${id}.webp`);
    await expect.poll(() => images.evaluateAll(elements => elements.map(image => image.currentSrc ? new URL(image.currentSrc).pathname : ""))).toEqual(expected);
    await expect.poll(() => images.evaluateAll(elements => elements.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
    const counter = hero.locator(':scope > div[aria-hidden="true"]').last().locator("span");
    await expect(counter.last()).toHaveText("05");
    for (let index = 0; index < 5; index++) {
      await expect(counter.first()).toHaveText(String(index + 1).padStart(2, "0"));
      // Capture each approved image without relying on the animated overlay's timing.
      await images.nth(index).screenshot({ path: testInfo.outputPath(`hero-${width}-${index + 1}.png`) });
      await page.clock.runFor(4000);
    }
    await expect(counter.first()).toHaveText("01");
    await page.setViewportSize({ width: width === 390 ? 1440 : 390, height: 900 });
    const resized = (width === 390 ? desktop : mobile).map(id => `/assets/images/curated/${id}.webp`);
    await expect.poll(() => images.evaluateAll(elements => elements.map(image => image.currentSrc ? new URL(image.currentSrc).pathname : ""))).toEqual(resized);
  });
}

test("all curated exports decode as photographs, and every annotation is accounted for", async ({ page }, testInfo) => {
  await page.goto("/");
  expect(report.annotations).toHaveLength(45);
  expect(report.photos).toHaveLength(44);
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
      return { id: photo.id, ok: response.ok && bitmap.width > 0 && colours.size > 8 };
    }));
  }, report.photos);
  expect(results.filter(result => !result.ok)).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.setContent(`<style>body{margin:0;padding:12px;background:#eee8df;font:11px sans-serif}main{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}figure{margin:0}img{display:block;width:100%;height:200px;object-fit:contain;background:#292620}figcaption{padding:8px 0}</style><main>${report.photos.map(photo => `<figure><img src="${photo.url}"><figcaption>${photo.id}</figcaption></figure>`).join("")}</main>`);
  await expect.poll(() => page.locator("img").evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("curated-contact-sheet.png"), fullPage: true });
});

for (const width of [390, 1440]) {
  test(`selected photos appear on their assigned pages at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const assignments = {
      "/about": ["bru-08", "bru-02", "bru-17", "bru-18"],
      "/services": ["nov-a5b3fc62a58cd428", "cas-05", "nov-d3e8a181458484e3", "art-03", "bru-06"],
      "/services/weddings": ["cas-08", "cas-10"],
      "/portfolio": ["cas-09", "art-11", "soc-09", "cas-12", "lbs-40", "art-09", "cas-20", "nov-4bcc06250447fcda", "art-05", "cas-06", "nov-83c3dfb6406f7a3c", "art-07"],
      "/education": ["bru-20", "nov-4e21615332f3066f"],
    };
    for (const [route, ids] of Object.entries(assignments)) {
      await page.goto(route);
      const images = page.locator('main img[src*="/curated/"]');
      expect(await images.evaluateAll(images => images.map(image => image.getAttribute("src").split("/").pop().replace(".webp", "")))).toEqual(ids);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({ path: testInfo.outputPath(`${route.replaceAll("/", "-")}-${width}.png`) });
    }
  });
}
