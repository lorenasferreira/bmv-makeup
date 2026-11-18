import { test, expect } from "./fixtures";

const routes = [
  ["/", [["selected", "#portfolio h2"], ["bridal-preview", "#weddings h2"], ["behind", "main > section:nth-of-type(6) h2"], ["reviews", "main > section:nth-of-type(7) h2"], ["cta", "#contact h2"]]],
  ["/about", [["journey", "main > section:nth-of-type(3) h2"]]],
  ["/education", [["learning", "main > section:nth-of-type(2) h2"]]],
  ["/services/weddings", [["bridal", "main > section:nth-of-type(2) h2"], ["process", "main > section:nth-of-type(3) h2"], ["bridal-reviews", "main > section:nth-of-type(4) h2"], ["partners", "#recommended-professionals h2"]]],
];

for (const width of [320, 390, 768, 1440]) {
  for (const language of ["pt", "en", "es", "ca"]) {
    test(`editorial ${language} at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript(language => localStorage.setItem("bmv-language", language), language);
      const measurements = [];
      for (const [route, headings] of routes) {
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        for (const [name, selector] of headings) {
          const heading = page.locator(selector);
          await heading.scrollIntoViewIfNeeded();
          await expect(heading).toBeVisible();
          const measurement = await heading.evaluate(element => {
            const bounds = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return { text: element.innerText, width: bounds.width, height: bounds.height, fontSize: style.fontSize, lineHeight: style.lineHeight, scrollWidth: element.scrollWidth, clientWidth: element.clientWidth };
          });
          measurements.push({ route, name, ...measurement });
          await heading.screenshot({ path: testInfo.outputPath(`${language}-${width}-${name}.png`) });
          expect(measurement.scrollWidth).toBeLessThanOrEqual(measurement.clientWidth + 1);
        }
        if (route === "/" || route === "/services/weddings") {
          const selector = route === "/" ? '#services [role="region"]' : "main > section:nth-of-type(3) ol";
          const scroller = page.locator(selector);
          await scroller.scrollIntoViewIfNeeded();
          const cards = scroller.locator(":scope > *");
          await expect(cards).toHaveCount(route === "/" ? 3 : 4);
          if (width <= 640) {
            expect(await scroller.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
            const first = await cards.first().boundingBox();
            const second = await cards.nth(1).boundingBox();
            expect(second.y).toBeCloseTo(first.y, 0);
            expect(second.x).toBeLessThan(width);
            expect(second.x + second.width).toBeGreaterThan(width);
            await scroller.screenshot({ path: testInfo.outputPath(`${language}-${width}-${route === "/" ? "work-carousel" : "steps-carousel"}.png`) });
            await scroller.focus();
            await expect(scroller).toBeFocused();
            await page.keyboard.press("ArrowRight");
            await expect.poll(() => scroller.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
            await scroller.evaluate(element => { element.scrollLeft = element.scrollWidth; });
            await expect.poll(async () => {
              const last = await cards.last().boundingBox();
              return last.x + last.width <= width + 1;
            }).toBe(true);
            if (route !== "/") {
              await expect(cards.locator(':scope > span')).toHaveText(["01", "02", "03", "04"]);
            }
          } else expect(await scroller.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
        }
        if (route === "/") {
          const navigation = page.locator("main > section:nth-of-type(7) button[aria-current]").locator("..");
          await navigation.scrollIntoViewIfNeeded();
          const bounds = await navigation.boundingBox();
          expect(Math.abs(bounds.x + bounds.width / 2 - width / 2)).toBeLessThanOrEqual(2);
          await navigation.screenshot({ path: testInfo.outputPath(`${language}-${width}-review-indicators.png`) });
          const arrow = page.locator("#home-hero-slides").locator("..").getByRole("button").first();
          await expect(arrow).toHaveCSS("border-top-width", "0px");
          const arrowBounds = await arrow.boundingBox();
          expect(arrowBounds.width).toBeGreaterThanOrEqual(44);
          expect(arrowBounds.height).toBeGreaterThanOrEqual(44);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      }
      await testInfo.attach("heading-measurements", { body: JSON.stringify(measurements, null, 2), contentType: "application/json" });
    });
  }
}
