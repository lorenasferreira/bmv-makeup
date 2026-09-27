import { test, expect } from "./fixtures";

const image = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#173605"/></svg>');

test("Instagram success shows captions, post links and video thumbnails", async ({ page }) => {
  await page.route("**/api/instagram", route => route.fulfill({ json: {
    username: "bmvmakeup",
    posts: [
      { id: "photo", mediaType: "IMAGE", mediaUrl: image, permalink: "https://www.instagram.com/p/test-photo/", caption: "A makeup story", timestamp: "2026-01-10T12:00:00Z" },
      { id: "video", mediaType: "VIDEO", thumbnailUrl: image, permalink: "https://www.instagram.com/p/test-video/", timestamp: "2026-01-11T12:00:00Z" },
    ],
  } }));
  await page.goto("/");
  const photo = page.getByRole("link", { name: "A makeup story", exact: true });
  await expect(photo).toHaveAttribute("href", "https://www.instagram.com/p/test-photo/");
  await photo.locator("..").scrollIntoViewIfNeeded();
  await expect(photo.getByRole("img")).toBeVisible();
  const video = page.locator('a[href="https://www.instagram.com/p/test-video/"]');
  await expect(video).toHaveAccessibleName(/Instagram/);
  await expect(video.locator("img")).toHaveAttribute("src", image);
  await expect(page.getByRole("link", { name: /View on Instagram/ })).toHaveAttribute("href", "https://www.instagram.com/p/test-photo/");
});

for (const state of ["empty", "missing", "http-error", "network-error", "invalid-json"]) {
  test(`Instagram ${state} leaves Home and the Instagram fallback usable`, async ({ page }) => {
    await page.route("**/api/instagram", route => {
      if (state === "network-error") return route.abort();
      if (state === "http-error") return route.fulfill({ status: 503, body: "Unavailable" });
      if (state === "invalid-json") return route.fulfill({ contentType: "application/json", body: "invalid" });
      return route.fulfill({ json: state === "empty" ? { posts: [] } : {} });
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("The art");
    const instagram = page.locator("main section").filter({ has: page.getByRole("link", { name: /Follow on Instagram/ }) });
    await expect(instagram.getByRole("link", { name: /Follow on Instagram/ })).toHaveAttribute("href", "https://www.instagram.com/bmvmakeup/");
    await expect(instagram.locator("article")).toHaveCount(0);
    await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Services", exact: true }).click();
    await expect(page).toHaveURL(/\/services$/);
  });
}
