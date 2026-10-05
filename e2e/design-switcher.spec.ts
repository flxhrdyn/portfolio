import { test, expect } from '@playwright/test';

test.describe('Portfolio design directions', () => {
  test('shows the editorial ledger by default', async ({ page }) => {
    await page.goto('/');
    const switcher = page.locator('nav[aria-label="Design version switcher"]');
    await expect(switcher).toBeVisible();
    await expect(page.locator('button[data-design="d1"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-layout="archival-ledger"]')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Selected projects' })).toBeVisible();
    await expect(page.getByText('AI Engineer & Data Scientist · Jakarta, Indonesia')).toBeVisible();
  });

  test('switches to the architectural frame', async ({ page }) => {
    await page.goto('/');
    await page.locator('button[data-design="d2"]').click();
    await expect(page.locator('button[data-design="d2"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-layout="architectural"]')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
  });

  test('switches to the research matrix', async ({ page }) => {
    await page.goto('/');
    await page.locator('button[data-design="d3"]').click();
    await expect(page.locator('[data-layout="precision-matrix"]')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Model results' })).toBeVisible();
    await expect(page.getByText('Coral condition classification')).toBeVisible();
  });

  test('switches to the spacious editorial portfolio', async ({ page }) => {
    await page.goto('/');
    await page.locator('button[data-design="d4"]').click();
    await expect(page.locator('[data-layout="quiet-editorial"]')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Felix Windriyareksa Hardyan' })).toBeVisible();
  });

  test('switches to the curated synthesis in slot 05', async ({ page }) => {
    await page.goto('/');
    await page.locator('button[data-design="d5"]').click();
    await expect(page.locator('button[data-design="d5"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-layout="synthesis-ledger"]')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
  });

  test('loads a selected direction from the URL', async ({ page }) => {
    await page.goto('/?v=d3');
    await expect(page.locator('button[data-design="d3"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-layout="precision-matrix"]')).toBeVisible();
  });
});
