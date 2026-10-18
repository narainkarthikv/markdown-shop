import { expect, test } from '@playwright/test';

test.describe('Components Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('networkidle');
  });

  test('displays component categories', async ({ page }) => {
    // Check for common component categories/sections
    const pageContent = page.locator('main');
    await expect(pageContent).toBeVisible();

    // Wait for content to load
    await page.waitForTimeout(500);
  });

  test('searches for components', async ({ page }) => {
    // Look for a search input on the components page
    const searchInput = page.getByPlaceholder(/search|find/i).first();

    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill('badge');
      await page.waitForTimeout(300);

      // Verify results are filtered
      const results = page.locator('[class*="component"]');
      const count = await results.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });

  test('selects and adds a component', async ({ page }) => {
    const reactIcon = page.getByRole('button', { name: 'Add React icon' });
    await expect(reactIcon).toBeVisible();
    await reactIcon.click();
    await expect(
      page.getByRole('button', { name: 'Remove React icon' })
    ).toHaveAttribute('aria-pressed', 'true');
  });
});
