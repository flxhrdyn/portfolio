import { test, expect } from "@playwright/test";

test.describe("portfolio home page", () => {
  test("loads without console errors and shows hero and core sections", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");

    // Verify hero text presence
    await expect(page.locator("[data-direction-shell] h1")).toContainText("Felix Windriyareksa Hardyan");

    // Verify core sections exist on the page
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("#experience")).toBeAttached();
    await expect(page.locator("#skills")).toBeAttached();
    await expect(page.locator("#research")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();

    expect(errors).toEqual([]);
  });

  test("design switcher navigation pill is visible", async ({ page }) => {
    await page.goto("/");

    const switcher = page.locator('nav[aria-label="Design version switcher"]');
    await expect(switcher).toBeVisible();
    await expect(page.locator('button[data-design="d1"]')).toBeVisible();
  });
});

test.describe("404 not found page", () => {
  test("renders 404 page for unknown routes with recovery link", async ({ page }) => {
    const response = await page.goto("/non-existent-route-for-testing");
    expect(response?.status()).toBe(404);

    await expect(page.locator(".notfound-scatter-404")).toContainText("404");
    await expect(page.locator(".notfound-scatter-found")).toContainText("found.");

    const homeLink = page.locator(".notfound-scatter-link");
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toContainText("Back to home");

    // Click back to home
    await homeLink.click();
    await expect(page).toHaveURL(/\/$/);
  });
});
