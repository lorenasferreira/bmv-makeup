import { test, expect, expectUnlocked, scrollTo, translations } from "./fixtures";

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("open, focus trap, Escape and close button restore focus and scrolling", async ({ page }) => {
    await page.goto("/");
    const opener = page.getByRole("button", { name: "Open navigation menu" });
    await opener.click();
    const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
    const close = dialog.locator("aside").getByRole("button", { name: "Close navigation menu" });
    await expect(dialog).toBeVisible();
    await expect(opener).toHaveAttribute("aria-expanded", "true");
    await expect(close).toBeFocused();
    expect(await page.evaluate(() => [document.body.style.overflow, document.documentElement.style.overflow])).toEqual(["hidden", "hidden"]);
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("button", { name: "CA", exact: true })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();
    await page.mouse.move(10, 400);
    await page.mouse.wheel(0, 500);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(opener).toBeFocused();
    await expectUnlocked(page);
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !!document.activeElement.closest("dialog"))).toBe(false);
    await opener.click();
    await close.click();
    await expect(opener).toBeFocused();
    await expectUnlocked(page);
  });

  test("menu navigation and desktop resize never leave scrolling locked", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: /Portfolio/ }).click();
    await expect(page).toHaveURL(/\/portfolio$/);
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expectUnlocked(page);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.setViewportSize({ width: 1024, height: 900 });
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expectUnlocked(page);
    await page.mouse.wheel(0, 500);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
  });

  test("changing language inside the menu updates the page and selection", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    for (const language of ["pt", "en", "es", "ca"]) {
      await page.getByRole("dialog").getByRole("button", { name: language.toUpperCase(), exact: true }).click();
      await expect(page.locator("html")).toHaveAttribute("lang", language);
      await expect(page.getByRole("dialog").getByRole("button", { name: language.toUpperCase(), exact: true })).toHaveAttribute("aria-pressed", "true");
      // The background is intentionally inert while the modal is open.
      await expect(page.locator("main h1")).toContainText(translations[language].home.hero.title);
    }
    await page.keyboard.press("Escape");
    await expectUnlocked(page);
  });
});

test("Portfolio categories filter the works and expose selected state", async ({ page }) => {
  await page.goto("/portfolio");
  const main = page.getByRole("main");
  await expect(main.locator("figure")).toHaveCount(24);
  const gallery = main.locator("section").filter({ has: page.getByRole("button", { name: "All", exact: true }) });
  await gallery.evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
  // Playwright's visibility check ignores opacity; wait for the reveal before clicking.
  await expect(gallery).toHaveCSS("opacity", "1");
  for (const category of ["Weddings", "Beauty", "Campaigns", "Photoshoots", "Artistic", "Audiovisual"]) {
    const button = main.getByRole("button", { name: category, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(main.getByRole("button", { pressed: true })).toHaveCount(1);
    await expect(main.locator("figure")).toHaveCount(4);
    for (const caption of await main.locator("figcaption").allTextContents()) expect(caption).toContain(category);
  }
  await main.getByRole("button", { name: "All", exact: true }).click();
  await expect(main.locator("figure")).toHaveCount(24);
});

for (const width of [390, 1440]) {
  test(`scroll-to-top hides, appears, and works by pointer and keyboard at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/about");
    const button = page.getByRole("button", { name: "Scroll to top", includeHidden: true });
    await expect(button).toBeHidden();
    await scrollTo(page, 1250);
    await expect(button).toBeVisible();
    await button.click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await expect(button).toBeHidden();
    await scrollTo(page, 1250);
    await expect(button).toBeVisible();
    await button.focus();
    await page.keyboard.press("Enter");
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await expect(button).toBeHidden();
  });
}
