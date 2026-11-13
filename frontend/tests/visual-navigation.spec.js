import { test, expect, translations } from "./fixtures";

for (const width of [390, 1440]) {
  for (const language of ["pt", "en", "es", "ca"]) {
    test(`${language}: Services hierarchy and recommended anchor at ${width}px`, async ({ page }) => {
      const copy = translations[language];
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(language => localStorage.setItem("bmv-language", language), language);
      await page.goto("/");
      const mobile = width < 1001;
      if (mobile) await page.getByRole("button", { name: copy.accessibility.openMenu }).click();
      const nav = mobile ? page.getByRole("dialog").locator("nav") : page.locator("header > nav");
      const services = nav.getByRole("link", { name: new RegExp(copy.navigation.services) });
      await expect(services).toHaveAttribute("href", "/services");
      if (mobile) await nav.getByRole("button", { name: copy.navigation.expand.replace("{{section}}", copy.navigation.services) }).click();
      else await services.hover();
      const weddings = nav.getByRole("link", { name: copy.navigation.weddings, exact: true });
      await expect(weddings).toBeVisible();
      await expect(weddings).toHaveAttribute("href", "/services/weddings");
      if (mobile) await nav.getByRole("button", { name: copy.navigation.expand.replace("{{section}}", copy.navigation.weddings) }).click();
      else await weddings.hover();
      const recommended = nav.getByRole("link", { name: copy.navigation.professionals, exact: true });
      await expect(recommended).toBeVisible();
      await recommended.click();
      await expect(page).toHaveURL(/\/services\/weddings#recommended-professionals$/);
      const target = page.locator("#recommended-professionals");
      await expect(target).toHaveCount(1);
      await expect.poll(async () => (await target.boundingBox()).y).toBeGreaterThanOrEqual(90);
      await expect.poll(async () => (await target.boundingBox()).y).toBeLessThan(160);
      await expect(target.locator('a[href*="instagram.com"]')).toHaveCount(4);
    });
  }

  test(`Hero manual controls wrap, support keyboard and retain autoplay at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
    await page.clock.pauseAt(new Date("2026-01-01T00:01:00Z"));
    await page.goto("/");
    const hero = page.locator("main > section").first();
    const counter = hero.locator(':scope > div[aria-hidden="true"]').last().locator("span").first();
    const previous = hero.getByRole("button", { name: translations.en.home.hero.previous });
    const next = hero.getByRole("button", { name: translations.en.home.hero.next });
    await expect(hero.locator("picture")).toHaveCount(5);
    for (const button of [previous, next]) {
      const bounds = await button.boundingBox();
      expect(bounds.width).toBeGreaterThanOrEqual(44);
      expect(bounds.height).toBeGreaterThanOrEqual(44);
    }
    await previous.click();
    await expect(counter).toHaveText("05");
    await next.focus();
    await page.keyboard.press("Enter");
    await expect(counter).toHaveText("01");
    await page.keyboard.press("Space");
    await expect(counter).toHaveText("02");
    await page.clock.runFor(4000);
    await expect(counter).toHaveText("03");
    await hero.screenshot({ path: testInfo.outputPath(`hero-controls-${width}.png`) });
  });

  test(`About text-only closing, versatility and fine review indicators at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    const closing = page.locator("main > section").filter({ has: page.getByRole("heading", { name: /From Barcelona.*New York/ }) });
    await expect(closing.locator("img")).toHaveCount(0);
    await expect(closing).toContainText("21 days");
    await closing.scrollIntoViewIfNeeded();
    await closing.screenshot({ path: testInfo.outputPath(`about-closing-${width}.png`) });
    const range = page.locator("main > section").filter({ has: page.getByRole("heading", { name: /One artist.*Different stories/ }) });
    for (const term of ["Audiovisual", "Campaigns", "Photoshoots", "Weddings", "Beauty", "Social", "Artistic", "Editorial"]) {
      await expect(range).toContainText(term);
    }
    const copies = range.locator('div[aria-hidden="true"]');
    await expect(copies).toHaveCount(2);
    for (const copy of await copies.all()) {
      const geometry = await copy.evaluate(group => ({ width: group.getBoundingClientRect().width, track: group.parentElement.getBoundingClientRect().width }));
      expect(geometry.width).toBeGreaterThanOrEqual(width - 0.5);
      expect(geometry.track).toBeCloseTo(geometry.width * 2, 0);
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect.poll(() => range.evaluate(section => [...section.querySelectorAll("div")].filter(el => getComputedStyle(el).animationName !== "none").length)).toBe(0);

    await page.goto("/");
    const indicator = page.getByRole("button", { name: translations.en.home.reviews.goTo.replace("{{number}}", "1") });
    await indicator.scrollIntoViewIfNeeded();
    expect(await indicator.evaluate(button => getComputedStyle(button, "::after").height)).toBe("1px");
    expect((await indicator.boundingBox()).height).toBeGreaterThanOrEqual(44);
  });
}

test("desktop submenus open by focus and Escape closes each level", async ({ page }) => {
  await page.goto("/");
  const nav = page.locator("header > nav");
  await nav.getByRole("link", { name: "Services", exact: true }).focus();
  const weddings = nav.getByRole("link", { name: "Weddings", exact: true });
  await expect(weddings).toBeVisible();
  await weddings.focus();
  const recommended = nav.getByRole("link", { name: "Recommended professionals", exact: true });
  await expect(recommended).toBeVisible();
  await recommended.focus();
  await page.keyboard.press("Escape");
  await expect(recommended).toBeHidden();
  await expect(weddings).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(weddings).toBeHidden();
  await expect(nav.getByRole("link", { name: "Services", exact: true })).toBeFocused();
});

for (const width of [390, 1440]) {
  test(`Services and Weddings remain separate clickable destinations at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const nav = width < 1001 ? page.getByRole("dialog").locator("nav") : page.locator("header > nav");
    if (width < 1001) await page.getByRole("button", { name: "Open navigation menu" }).click();
    await nav.getByRole("link", { name: /Services/, exact: false }).click();
    await expect(page).toHaveURL(/\/services$/);
    if (width < 1001) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await nav.getByRole("button", { name: "Expand Services", exact: true }).click();
    } else {

      await nav.getByRole("link", { name: "Home", exact: true }).hover();
      await nav.getByRole("link", { name: "Services", exact: true }).hover();
    }
    await nav.getByRole("link", { name: "Weddings", exact: true }).click();
    await expect(page).toHaveURL(/\/services\/weddings$/);
    const desktopServices = page.locator('header > nav a[href="/services"]');
    await expect(desktopServices).toHaveAttribute("data-active", "true");
    await expect(page.locator('header > nav a[href="/services/weddings"]')).toHaveAttribute("aria-current", "page");
  });
}

test("mobile Escape collapses nested disclosure before closing the dialog", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Expand Services", exact: true }).click();
  await dialog.getByRole("button", { name: "Expand Weddings", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(dialog.getByRole("link", { name: "Recommended professionals" })).toBeHidden();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog.getByRole("link", { name: "Weddings", exact: true })).toBeHidden();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("real mobile viewport does not preload the desktop hero photograph", async ({ browser }) => {
  const context = await browser.newContext({ isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.route("**/api/instagram", route => route.fulfill({ json: { posts: [] } }));
  const requested = [];
  page.on("request", request => { if (request.resourceType() === "image") requested.push(new URL(request.url()).pathname); });
  await page.goto("http://127.0.0.1:4273/");
  await expect.poll(() => page.locator("main > section").first().locator("img").first().evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  expect(requested).toContain("/assets/images/home/hero/mobile/red-dress-glamour-portrait.webp");
  expect(requested).not.toContain("/assets/images/shared/weddings/bride-behind-white-bouquet.webp");
  await context.close();
});

for (const width of [390, 1440]) {
  test(`About marquee rows travel at equal pixel speeds in all languages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    const rows = page.locator('[class*="marqueeGroup"]:not([aria-hidden])');
    const speedDifference = () => rows.evaluateAll(groups => {
      const speeds = groups.map(group => group.getBoundingClientRect().width / parseFloat(getComputedStyle(group.parentElement).animationDuration));
      return Math.abs(speeds[0] - speeds[1]);
    });
    for (const language of ["pt", "en", "es", "ca"]) {
      await page.evaluate(language => window.localStorage.setItem("bmv-language", language), language);
      await page.reload();
      await page.evaluate(() => document.fonts.ready);
      await expect.poll(speedDifference).toBeLessThan(0.01);
      for (const row of await rows.all()) {
        const geometry = await row.evaluate(group => ({ width: group.getBoundingClientRect().width, track: group.parentElement.getBoundingClientRect().width }));
        expect(geometry.width).toBeGreaterThanOrEqual(width - 0.5);
        expect(geometry.track).toBeCloseTo(geometry.width * 2, 0);
      }
    }
    await page.setViewportSize({ width: width === 390 ? 1440 : 390, height: 900 });
    await expect.poll(speedDifference).toBeLessThan(0.01);
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const row of await rows.all()) {
      expect(await row.evaluate(group => getComputedStyle(group.parentElement).animationName)).toBe("none");
    }
  });
}
