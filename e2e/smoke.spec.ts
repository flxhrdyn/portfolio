import { test, expect } from "@playwright/test";

test.describe("home (chat landing)", () => {
  test("loads without console errors and shows the chat widget", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Felix Windriyareksa Hardyan" })).toBeVisible();
    await expect(page.getByText("Hawat (AI Agent)")).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("chat widget responds to a chip click", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Who is Felix?" }).click();
    await expect(page.getByText(/AI\/ML Engineer/i)).toBeVisible({ timeout: 10_000 });
  });

  test("Enter Portfolio link navigates to /portfolio", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /enter portfolio/i }).click();
    await expect(page).toHaveURL(/\/portfolio\/?$/);
  });
});

test.describe("portfolio page", () => {
  test("loads without console errors and nav links jump to sections", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/portfolio");
    await expect(page.getByRole("heading", { name: "Felix Windriyareksa Hardyan" })).toBeVisible();

    await page.getByRole("link", { name: "Projects", exact: true }).click();
    await expect(page.locator("#projects")).toBeInViewport();

    await page.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page.locator("#contact")).toBeInViewport();

    expect(errors).toEqual([]);
  });

  test("dark mode toggle persists the data-theme attribute", async ({ page }) => {
    await page.goto("/portfolio");

    await page.getByRole("button", { name: "Toggle user theme preference" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});
