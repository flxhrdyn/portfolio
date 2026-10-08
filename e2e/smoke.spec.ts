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

  test("keeps publication details readable without tiny eyebrow styling", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const article = page.locator(".d1-research-study-models");
    await expect(article.locator(".d1-research-models-title > span")).toHaveText("JITET · Vol. 13 No. 3");
    await expect(article.locator(".d1-research-compact-authors")).toHaveCount(0);
    await expect(article.locator(".d1-research-model-result > span")).toHaveText("MobileNetV2 test accuracy");
    const typeSizes = await article.evaluate((element) => {
      const size = (selector: string) =>
        Number.parseFloat(getComputedStyle(element.querySelector(selector)!).fontSize);

      return {
        journal: size(".d1-research-models-title > span"),
        modelLabel: size(".d1-research-model-result > span"),
        publicationLink: size(".d1-research-paper-link"),
      };
    });

    expect(typeSizes.journal).toBeGreaterThanOrEqual(14);
    expect(typeSizes.modelLabel).toBeGreaterThanOrEqual(14);
    expect(typeSizes.publicationLink).toBeGreaterThanOrEqual(15);
  });

  test("keeps publication title and model result separate on narrower screens", async ({ page }) => {
    for (const width of [906, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");

      const article = page.locator(".d1-research-study-models");
      const overlaps = await article.evaluate((element) => {
        const title = element.querySelector(".d1-research-models-title")!.getBoundingClientRect();
        const result = element.querySelector(".d1-research-model-result")!.getBoundingClientRect();
        return {
          overlaps: title.left < result.right && title.right > result.left && title.top < result.bottom && title.bottom > result.top,
          display: getComputedStyle(element).display,
        };
      });

      expect(overlaps.overlaps, `research title and model result overlap at ${width}px`).toBe(false);
      expect(overlaps.display, `research block should stack at ${width}px`).not.toBe("grid");
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
