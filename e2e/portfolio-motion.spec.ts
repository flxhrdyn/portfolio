import { expect, test } from "@playwright/test";

const portfolioUrl = process.env.PORTFOLIO_TEST_URL ?? "http://localhost:3000";
type MotionTestWindow = Window & {
  lastHashClickPrevented: boolean;
  scrollIntoViewCalls: number;
};

async function countNativeScrollIntoViewCalls(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    const original = Element.prototype.scrollIntoView;
    Object.defineProperty(window, "scrollIntoViewCalls", { value: 0, writable: true });
    Object.defineProperty(window, "lastHashClickPrevented", { value: null, writable: true });
    Element.prototype.scrollIntoView = function (...args) {
      const counterWindow = window as unknown as MotionTestWindow;
      counterWindow.scrollIntoViewCalls += 1;
      original.apply(this, args);
    };
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('a[href^="#"]')) return;
      window.setTimeout(() => {
        (window as unknown as MotionTestWindow).lastHashClickPrevented = event.defaultPrevented;
      });
    });
  });
}

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

  test("reduced motion preserves native wheel and immediate anchor scrolling", async ({ page }) => {
    await countNativeScrollIntoViewCalls(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(portfolioUrl);
    await page.mouse.move(600, 400);

    await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains("lenis"))).toBe(false);
    await page.mouse.wheel(0, 300);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    await page.getByRole("link", { name: "Get in touch" }).click();
    await expect.poll(() => page.evaluate(() => (window as unknown as MotionTestWindow).lastHashClickPrevented)).toBe(true);
    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe("#contact");
    await expect(page.locator("#contact-editorial-heading")).toBeInViewport();
    expect(await page.evaluate(() => (window as unknown as MotionTestWindow).scrollIntoViewCalls)).toBe(1);
  });

  test("hero contact anchor routes through the shared scroll controller", async ({ page }) => {
    await countNativeScrollIntoViewCalls(page);
    await page.goto(portfolioUrl);
    await expect(page.locator("html")).toHaveClass(/lenis/);

    await page.getByRole("link", { name: "Get in touch" }).click();

    await expect.poll(() => page.evaluate(() => (window as unknown as MotionTestWindow).lastHashClickPrevented)).toBe(true);
    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe("#contact");
    await expect(page.locator("#contact-editorial-heading")).toBeInViewport();
    expect(await page.evaluate(() => (window as unknown as MotionTestWindow).scrollIntoViewCalls)).toBe(0);
  });

  test("section anchor uses the inner portfolio scroll root while chat is open", async ({ page }) => {
    await countNativeScrollIntoViewCalls(page);
    await page.goto(portfolioUrl);
    await expect(page.locator("html")).toHaveClass(/lenis/);

    await page.getByRole("button", { name: "Ask AI" }).click();
    await expect(page.locator(".portfolio-shell")).toHaveClass(/portfolio-shell--chat-open/);
    await expect(page.locator(".chat-header-close-btn")).toBeFocused();
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("link", { name: "Experience", exact: true }).click();

    await expect.poll(() => page.evaluate(() => window.location.hash)).toBe("#experience");
    await expect.poll(() => page.locator(".portfolio-main-column").evaluate((root) => root.scrollTop)).toBeGreaterThan(0);
    await expect(page.locator("#experience")).toBeInViewport();
    expect(await page.evaluate(() => (window as unknown as MotionTestWindow).scrollIntoViewCalls)).toBe(0);
  });
});
