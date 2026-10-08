import { expect, test } from "@playwright/test";

test.describe("sticky editorial navigation", () => {
  test("keeps the header grounded with a solid surface and working controls", async ({ page }) => {
    await page.goto("/");

    const navbar = page.locator("#top-nav");
    await expect(navbar).toHaveCSS("position", "sticky");
    await expect(navbar).toHaveCSS("background-color", "rgb(247, 246, 242)");
    await expect(navbar).toHaveCSS("border-bottom-width", "0px");

    const askAi = page.locator(".nav-ask-link");
    await askAi.hover();
    await expect(askAi).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const menu = page.locator("#nav-section-menu");
    await expect(menu).toBeVisible();
    await expect(navbar.locator("#nav-section-menu")).toHaveCount(1);
    await expect(menu).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  });

  test("section links scroll the portfolio column when the chat is open", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    await page.getByRole("button", { name: "Ask AI" }).click();
    const portfolio = page.locator(".portfolio-main-column");
    await expect(portfolio).toHaveCSS("overflow-y", "auto");
    await expect(page.getByRole("button", { name: "Close Ask AI" })).toBeFocused();

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const menu = page.locator("#nav-section-menu");
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Projects" }).click();

    await expect(page).toHaveURL(/#projects$/);
    await expect.poll(() => portfolio.evaluate((element) => element.scrollTop)).toBeGreaterThan(100);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("keeps the menu inside a phone viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const menu = page.locator("#nav-section-menu");
    await expect(menu).toBeVisible();

    const bounds = await menu.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(844);
  });

  test("keeps the sticky navigation anchored while scrolling", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const navbar = page.locator("#top-nav");
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));

    await expect(navbar).toHaveCSS("position", "sticky");
    await expect(navbar).toHaveCSS("background-color", "rgb(247, 246, 242)");

    await expect.poll(() => navbar.evaluate((element) => element.getBoundingClientRect().top)).toBe(0);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });
});
