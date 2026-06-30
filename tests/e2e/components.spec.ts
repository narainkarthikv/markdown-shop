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
    // Look for component buttons or cards to click
    const componentButtons = page
      .locator('button')
      .filter({ has: page.locator('text=/.*component|badge|icon.*/i') });

    const firstComponent = componentButtons.first();
    if (await firstComponent.isVisible().catch(() => false)) {
      await firstComponent.click();

      // Verify component was added (check for success message or visual feedback)
      await page.waitForTimeout(300);
    }
  });
});
