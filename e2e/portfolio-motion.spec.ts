import { expect, test } from "@playwright/test";

const portfolioUrl = process.env.PORTFOLIO_TEST_URL ?? "http://localhost:3000";

test.describe("portfolio motion", () => {
  test("wheel damping moderates a large burst and allows reversal", async ({ page }) => {
    await page.goto(portfolioUrl);
    await expect(page.locator("html")).toHaveClass(/lenis/);
    await page.mouse.move(600, 400);

    const initialY = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 900);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(initialY);
    await page.waitForTimeout(80);

    const dampedY = await page.evaluate(() => window.scrollY);
    expect(dampedY - initialY).toBeLessThan(700);

    await page.mouse.wheel(0, -600);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(dampedY);
  });

  test("keyboard scrolling remains available", async ({ page }) => {
    await page.goto(portfolioUrl);
    await page.keyboard.press("PageDown");

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });

  test("reduced motion keeps wheel scrolling native", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(portfolioUrl);
    await page.mouse.move(600, 400);

    await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains("lenis"))).toBe(false);
    await page.mouse.wheel(0, 300);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });
});
