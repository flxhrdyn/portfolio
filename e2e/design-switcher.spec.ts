import { test, expect } from '@playwright/test';

test.describe('Multi-Design Switcher & 5 Directions', () => {
  test('renders default design d1 (Swiss Editorial Ledger)', async ({ page }) => {
    await page.goto('/');

    // Check switcher presence
    const switcher = page.locator('nav[aria-label="Design version switcher"]');
    await expect(switcher).toBeVisible();

    // Check active button is 01
    const btn01 = page.locator('button[data-design="d1"]');
    await expect(btn01).toHaveAttribute('aria-pressed', 'true');

    // Check D1 specific elements
    await expect(page.locator('text=Felix Windriyareksa Hardyan').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Selected Work & Systems' })).toBeVisible();
    await expect(page.locator('text=01 / Portfolio')).toBeVisible();
  });

  test('switches dynamically to d2 (Architectural Frame)', async ({ page }) => {
    await page.goto('/');

    const btn02 = page.locator('button[data-design="d2"]');
    await expect(btn02).toBeVisible();
    await btn02.click();

    await expect(btn02).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('text=ARCH-FRAME // 02')).toBeVisible();
    await expect(page.locator('text=SPECIFICATION : PORTFOLIO_V2')).toBeVisible();
  });

  test('switches dynamically to d3 (Scientific Proof Sheet)', async ({ page }) => {
    await page.goto('/');

    const btn03 = page.locator('button[data-design="d3"]');
    await expect(btn03).toBeVisible();
    await btn03.click();

    await expect(btn03).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('text=PROOF_SHEET // V3.0')).toBeVisible();
    await expect(page.locator('text=EMPIRICAL EVALUATION MATRIX')).toBeVisible();
  });

  test('switches dynamically to d4 (Swiss Quiet Inline)', async ({ page }) => {
    await page.goto('/');

    const btn04 = page.locator('button[data-design="d4"]');
    await expect(btn04).toBeVisible();
    await btn04.click();

    await expect(btn04).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('text=[ 00 · INTRO ]')).toBeVisible();
  });

  test('switches dynamically to d5 (Kinetic Minimal Workspace)', async ({ page }) => {
    await page.goto('/');

    const btn05 = page.locator('button[data-design="d5"]');
    await expect(btn05).toBeVisible();
    await btn05.click();

    await expect(btn05).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('text=workspace://felix-hardyan')).toBeVisible();
    await expect(page.locator('text=~/projects')).toBeVisible();
  });

  test('direct load via URL query param (?v=d3)', async ({ page }) => {
    await page.goto('/?v=d3');

    const btn03 = page.locator('button[data-design="d3"]');
    await expect(btn03).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('text=PROOF_SHEET // V3.0')).toBeVisible();
  });
});
