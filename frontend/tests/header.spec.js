import { test, expect, scrollTo } from './fixtures';

for (const width of [1440, 390]) {
  test(`header follows scroll direction and protects focus at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/portfolio');
    await page.evaluate(() => document.fonts.ready);
    const header = page.locator('header');
    await scrollTo(page, 500);
    await expect(header).toHaveClass(/hidden/);
    await scrollTo(page, 498);
    await expect(header).toHaveClass(/hidden/);
    await scrollTo(page, 700);
    await expect(header).toHaveClass(/hidden/);
    await expect.poll(() => header.evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(1);
    await scrollTo(page, 500);
    await expect(header).not.toHaveClass(/hidden/);
    await header.getByRole('link').first().focus();
    await scrollTo(page, 1000);
    await expect(header).not.toHaveClass(/hidden/);
    await scrollTo(page, 0);
    await expect(header).not.toHaveClass(/hidden/);
  });

  test(`tall portfolio reveals and stays readable after filters at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/portfolio');
    const gallery = page.locator('main > section').nth(1);
    await scrollTo(page, await gallery.evaluate(el => el.offsetTop));
    await expect(gallery).toHaveCSS('opacity', '1');
    for (const button of await gallery.getByRole('button').all()) {
      await button.click();
      await expect(gallery).toHaveCSS('opacity', '1');
      await expect(gallery.locator('figure').first()).toBeVisible();
    }
    await scrollTo(page, 0);
    await expect(gallery).toHaveCSS('opacity', '1');
  });
}
