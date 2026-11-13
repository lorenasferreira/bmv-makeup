import { test, expect } from "./fixtures";

for (const width of [390, 1440]) {
  test(`final content and course information remain usable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const capture = async (section, name) => {
      await section.evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
      await expect(section).toHaveCSS("opacity", "1");
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: testInfo.outputPath(`${name}-${width}.png`) });
    };

    await page.goto("/");
    const selected = page.locator("#portfolio");
    await expect(selected.locator("img")).toHaveCount(4);
    await expect(selected).not.toContainText(/Campaigns?/i);
    await capture(selected, "home-selected");
    const education = page.locator("#education");
    await expect(education.locator("img")).toHaveCount(0);
    await capture(education, "home-education");
    await education.getByRole("link").click();
    await expect(page).toHaveURL(/\/education$/);

    await expect(page.locator("main img")).toHaveCount(2);
    for (const source of ["bru-20.webp", "nov-4e21615332f3066f.webp"]) {
      await expect(page.locator(`main img[src$="${source}"]`)).toHaveCount(1);
    }
    await capture(page.locator("main > section").first(), "education-hero");
    const courses = page.locator("main > section").nth(2);
    await expect(courses.locator("article")).toHaveCount(2);
    for (const course of await courses.locator("article").all()) {
      await expect(course).toContainText("€170");
      await expect(course).toContainText("€300");
      await expect(course).toContainText("4 hours");
      await expect(course.locator("li")).not.toHaveCount(0);
    }
    await capture(courses.locator("article").first(), "education-course");
    await expect(page.locator("main > section").last().getByRole("link")).toHaveAttribute("href", /^https:\/\/wa.me\//);

    await page.goto("/services");
    const services = page.locator("main > section").nth(1);
    await expect(services.getByRole("heading", { level: 2 })).toHaveCount(3);
    await expect(services).not.toContainText(/Campaigns|Photoshoots|Audiovisual/);
    await capture(services, "services");
    await expect(services.getByRole("link")).toHaveAttribute("href", "/services/weddings");

    await page.goto("/portfolio");
    const gallery = page.locator("main > section").nth(1);
    await expect(gallery.locator("figure")).toHaveCount(12);
    await expect(gallery.locator("img[src*='campaign'], img[src*='photoshoot'], img[src*='audiovisual']")).toHaveCount(0);
    await capture(gallery, "portfolio");
  });
}
