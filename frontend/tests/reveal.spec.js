import { test, expect, scrollTo } from "./fixtures";

const routes = ["/", "/about", "/services", "/portfolio", "/education", "/contact", "/services/weddings"];

for (const route of routes) {
  test(`scroll reveals content once without moving layout on ${route}`, async ({ page }) => {
    await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
    await page.clock.pauseAt(new Date("2026-01-01T00:01:00Z"));
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const sections = page.locator("main > section");
    const index = await sections.evaluateAll(elements => elements.findIndex((element, i) =>
      i > 0 && element.getBoundingClientRect().top >= innerHeight &&
      element.offsetHeight * 0.08 < innerHeight - 280,
    ));
    expect(index).toBeGreaterThan(0);
    const section = sections.nth(index);
    await expect(section).toBeVisible();
    await expect(section).toHaveCSS("opacity", "0");
    expect(await sections.first().evaluate(element => element.getAnimations().length)).toBe(0);
    const original = await section.evaluate(element => ({ top: element.offsetTop, height: element.offsetHeight }));
    const target = await section.evaluate(element => element.getBoundingClientRect().top + scrollY - 250);
    // Capture the transition in the page so a slow test runner cannot miss it.
    await section.evaluate((element, top) => new Promise(resolve => {
      const started = (event) => {
        if (event.target !== element || event.propertyName !== "opacity") return;
        element.removeEventListener("transitionrun", started);
        resolve();
      };
      element.addEventListener("transitionrun", started);
      window.scrollTo({ top, behavior: "instant" });
    }), target);
    await expect(section).toHaveCSS("opacity", "1");
    expect(await section.evaluate(element => ({ top: element.offsetTop, height: element.offsetHeight }))).toEqual(original);
    expect(await sections.first().evaluate(element => element.getAnimations().length)).toBe(0);
    await scrollTo(page, 0);
    await scrollTo(page, target);
    await page.clock.resume();
    // Observe across frames to ensure revisiting content does not restart its fade.
    const staysVisible = await section.evaluate(element => new Promise(resolve => {
      let frames = 0;
      const check = () => {
        if (getComputedStyle(element).opacity !== "1") return resolve(false);
        if (++frames === 12) return resolve(true);
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    }));
    expect(staysVisible).toBe(true);
  });
}

test("reduced motion keeps content still and scroll-to-top immediate", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  await scrollTo(page, 1250);
  const sections = page.locator("main > section");
  expect(await sections.evaluateAll(elements => elements.every(element =>
    getComputedStyle(element).opacity === "1" && element.getAnimations().length === 0,
  ))).toBe(true);
  const button = page.getByRole("button", { name: "Scroll to top" });
  await expect(button).toBeVisible();
  await button.click();
  expect(await page.evaluate(() => scrollY)).toBe(0);
});

test("enabling reduced motion mid-reveal immediately restores ordinary content", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:01:00Z"));
  await page.goto("/about", { waitUntil: "domcontentloaded" });
  const section = page.locator("main > section").nth(2);
  await expect(section).toHaveCSS("opacity", "0");
  await scrollTo(page, await section.evaluate(element => element.getBoundingClientRect().top + scrollY - 250));
  await expect.poll(() => section.evaluate(element => Number(getComputedStyle(element).opacity)), { intervals: [16, 32] }).toBeLessThan(0.95);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(section).toHaveCSS("opacity", "1");
  await expect.poll(() => section.evaluate(element => element.getAnimations().length)).toBe(0);
});

test("without IntersectionObserver the enhancement leaves all content readable", async ({ page }) => {
  await page.addInitScript(() => { window.IntersectionObserver = undefined; });
  await page.goto("/education");
  const sections = page.locator("main > section");
  for (const section of await sections.all()) {
    await expect(section).toBeVisible();
    await expect(section).toHaveCSS("opacity", "1");
  }
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Learn to");
});

test("existing Hero rotation and review controls remain independent", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("main > section").first();
  // The Hero counter is intentionally decorative; its displayed numbers still update.
  const counter = hero.locator(':scope > div[aria-hidden="true"]').last();
  const initial = await counter.textContent();
  await expect.poll(() => counter.textContent(), { timeout: 6000 }).not.toBe(initial);
  const quote = page.locator("blockquote");
  await quote.scrollIntoViewIfNeeded();
  const before = await quote.textContent();
  await page.getByRole("button", { name: "Next review", exact: true }).click();
  await expect(quote).not.toHaveText(before);
});

for (const route of ["/about", "/portfolio"]) {
  test(`offscreen content on ${route} waits for scrolling even after ten seconds`, async ({ page }) => {
    await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
    await page.clock.pauseAt(new Date("2026-01-01T00:01:00Z"));
    await page.goto(route);
    const section = page.locator("main > section").nth(route === "/about" ? 2 : 1);
    await expect(section).toHaveCSS("opacity", "0");
    await page.clock.runFor(10_000);
    await expect(section).toHaveCSS("opacity", "0");
    await scrollTo(page, await section.evaluate(element => element.getBoundingClientRect().top + scrollY));
    await expect(section).toHaveCSS("opacity", "1");
    await scrollTo(page, 0);
    await page.clock.runFor(1000);
    await expect(section).toHaveCSS("opacity", "1");
  });
}
