import { test, expect, translations, scrollTo } from "./fixtures";

const routes = [
  ["/", "home"], ["/about", "about"], ["/services", "services"],
  ["/portfolio", "portfolio"], ["/education", "education"],
  ["/contact", "contact"], ["/services/weddings", "weddings"],
];

for (const width of [320, 390, 768, 1440]) {
  for (const language of ["pt", "en", "es", "ca"]) {
    test(`${language}: all seven pages render without overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(language => localStorage.setItem("bmv-language", language), language);
      const copy = translations[language];
      for (const [route, key] of routes) {
        await page.goto(route);
        const hero = copy[key].hero;
        const heading = page.getByRole("heading", { level: 1 });
        await expect(heading).toBeVisible();
        await expect(heading).toContainText(key === "about" ? "Mënezess" : hero.title);
        await expect(page.locator("html")).toHaveAttribute("lang", language);
        // Verify page-specific localized body content too (About's name is invariant).
        if (hero.description) await expect(page.getByText(hero.description, { exact: true })).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        if (key === "about" && width <= 390) {
          const bounds = await heading.boundingBox();
          expect(bounds.x).toBeGreaterThanOrEqual(0);
          expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
        }
        await expect.poll(() => page.evaluate(() =>
          document.documentElement.scrollWidth <= window.innerWidth,
        )).toBe(true);
        await expect(page.getByRole("main")).not.toContainText(/(?:home|about|services|portfolio|education|contact|weddings)\.hero\./);
      }
    });
  }
}

test("language selection changes visible copy, selected state and persisted document language", async ({ page }) => {
  await page.goto("/");
  for (const language of ["pt", "en", "es", "ca"]) {
    const button = page.getByRole("button", { name: language.toUpperCase(), exact: true });
    await button.click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(translations[language].home.hero.title);
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("html")).toHaveAttribute("lang", language);
    expect(await page.evaluate(() => localStorage.getItem("bmv-language"))).toBe(language);
  }
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ca");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(translations.ca.home.hero.title);
});

test("SPA navigation resets scroll and Home's portfolio anchor still works", async ({ page }) => {
  await page.goto("/portfolio");
  await scrollTo(page, 1500);
  // Use the visible header link without Playwright scrolling it into view first.
  await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "The Artist" }).evaluate(link => link.click());
  await expect(page).toHaveURL(/\/about$/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Home", exact: true }).click();
  await page.getByRole("link", { name: /Discover the work/ }).click();
  await expect(page).toHaveURL(/#portfolio$/);
  await expect(page.locator("#portfolio")).toHaveCSS("opacity", "1");
  await expect(page.locator("#portfolio").getByRole("heading")).toBeInViewport();
});

test("unknown route shows localized 404 and its Home link works", async ({ page }) => {
  for (const language of ["pt", "en", "es", "ca"]) {
    await page.goto("/not-a-real-page");
    await page.getByRole("button", { name: language.toUpperCase(), exact: true }).click();
    await expect(page.getByRole("heading", { name: "404", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: translations[language].notFound.title, exact: true })).toBeVisible();
    await expect(page.getByText(translations[language].notFound.text, { exact: true })).toBeVisible();
  }
  await page.getByRole("main").getByRole("link").click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(translations.ca.home.hero.title);
});
