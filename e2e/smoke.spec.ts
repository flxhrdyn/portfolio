import { test, expect } from "@playwright/test";

test.describe("home (chat landing)", () => {
  test("loads without console errors and shows the chat widget and portfolio link", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Felix Windriyareksa Hardyan" })).toBeVisible();
    await expect(page.getByText("ASK MY PORTFOLIO")).toBeVisible();
    await expect(page.getByRole("link", { name: /view full portfolio/i })).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("chat widget responds to a chip click", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Who is Felix?" }).click();
    await expect(page.getByText(/AI\/ML Engineer/i)).toBeVisible({ timeout: 10_000 });
  });

  test("View Full Portfolio button navigates to /portfolio", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /view full portfolio/i }).click();
    await expect(page).toHaveURL(/\/portfolio\/?$/);
  });
});

test.describe("portfolio page (engineering console)", () => {
  test("loads without console errors and displays 3 telemetry metrics", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/portfolio");
    await expect(page.getByRole("heading", { name: "Felix Windriyareksa Hardyan" })).toBeVisible();

    // Verify 3 career telemetry metrics
    await expect(page.locator(".telemetry-value").filter({ hasText: "2+ Yrs" })).toBeVisible();
    await expect(page.getByText("AI/ML Experience")).toBeVisible();
    await expect(page.locator(".telemetry-value").filter({ hasText: "10+" })).toBeVisible();
    await expect(page.getByText("AI Projects Built")).toBeVisible();
    await expect(page.locator(".telemetry-value").filter({ hasText: "BNSP" })).toBeVisible();
    await expect(page.getByText("Certified Data Scientist")).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("featured project bento tab switcher toggles between Preview, Specs, and Code", async ({ page }) => {
    await page.goto("/portfolio");

    // Default tab is Preview with image thumbnail
    await expect(page.locator(".bento-demo-wrapper img")).toBeVisible();

    // Switch to Specs tab
    await page.getByRole("tab", { name: /specs/i }).click();
    await expect(page.getByText("TECHNICAL SPECIFICATIONS")).toBeVisible();
    await expect(page.locator(".specs-val").filter({ hasText: "Dense + Sparse Hybrid Search" })).toBeVisible();
    await expect(page.locator(".specs-val").filter({ hasText: "FlashRank Cross-Encoder" })).toBeVisible();

    // Switch to Code tab
    await page.getByRole("tab", { name: /code/i }).click();
    await expect(page.locator("pre.project-featured-code")).toBeVisible();

    // Switch back to Preview
    await page.getByRole("tab", { name: /preview/i }).click();
    await expect(page.locator(".bento-demo-wrapper img")).toBeVisible();
  });

  test("nav links jump to sections cleanly", async ({ page }) => {
    await page.goto("/portfolio");

    await page.getByRole("link", { name: "Projects", exact: true }).click();
    await expect(page.locator("#projects")).toBeInViewport();

    await page.getByRole("link", { name: "Experience", exact: true }).click();
    await expect(page.locator("#experience")).toBeInViewport();

    await page.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("dark mode toggle persists the data-theme attribute", async ({ page }) => {
    await page.goto("/portfolio");

    const toggle = page.locator("button.theme-toggle");
    await expect(toggle).toBeVisible();
    await toggle.click();

    const currentTheme = await page.locator("html").getAttribute("data-theme");
    expect(currentTheme).toBeTruthy();

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", currentTheme!);
  });
});
