import { test, expect } from "@playwright/test";

test.describe("portfolio home page", () => {
  test("loads without console errors and shows hero and core sections", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");

    // Verify hero presence
    await expect(page.locator(".hero-name")).toContainText("Felix Windriyareksa Hardyan");
    await expect(page.locator(".hero-headline")).toBeVisible();

    // Verify core sections exist on the page
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("#experience")).toBeAttached();
    await expect(page.locator("#skills")).toBeAttached();
    await expect(page.locator("#research")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();

    expect(errors).toEqual([]);
  });

  test("navigation brand and minimal actions are visible", async ({ page }) => {
    await page.goto("/");

    const brand = page.locator(".nav-brand");
    await expect(brand).toBeVisible();
    await expect(brand).toContainText("flxhrdyn");

    await expect(page.locator("#top-nav")).toBeVisible();
  });

  test("menu panel opens and displays navigation links", async ({ page }) => {
    await page.goto("/");

    const menuTrigger = page.locator(".nav-menu-trigger");
    if (await menuTrigger.isVisible()) {
      await menuTrigger.click();
      await expect(page.locator("#nav-section-menu")).toBeVisible();
      await expect(page.locator('#nav-section-menu a[href="#projects"]')).toBeVisible();
    }
  });

  test("Ask AI chat panel toggles open", async ({ page }) => {
    await page.goto("/");

    const askButton = page.locator(".nav-ask-link");
    if (await askButton.isVisible()) {
      await askButton.click();
      await expect(page.locator("#portfolio-chat-panel")).toBeVisible();
    }
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
