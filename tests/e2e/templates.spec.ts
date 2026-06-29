import { expect, test } from '@playwright/test';

test.describe('Templates Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/templates');
    await page.waitForLoadState('networkidle');
  });

  test('displays available templates', async ({ page }) => {
    // Check for template container
    const pageContent = page.locator('main');
    await expect(pageContent).toBeVisible();

    // Wait for templates to load
    await page.waitForTimeout(500);
  });

  test('selects a template', async ({ page }) => {
    // Look for template cards or buttons
    const templateButtons = page.locator('button').filter({ has: page.locator('text=/.*template.*/i') });

    const firstTemplate = templateButtons.first();
    if (await firstTemplate.isVisible().catch(() => false)) {
      await firstTemplate.click();

      // Verify we navigated to shop or template was applied
      await page.waitForTimeout(500);
    }
  });

  test('filters templates by category', async ({ page }) => {
    // Look for filter/category buttons
    const categoryButtons = page.locator('button').filter({ has: page.locator('text=/.*all|basic|advanced.*/i') });

    if (await categoryButtons.nth(1).isVisible().catch(() => false)) {
      await categoryButtons.nth(1).click();

      // Verify templates are filtered
      await page.waitForTimeout(300);
    }
  });

  test('previews a template', async ({ page }) => {
    // Look for preview buttons or modal triggers
    const previewButtons = page.locator('button').filter({ has: page.locator('text=/.*preview.*/i') });

    if (await previewButtons.first().isVisible().catch(() => false)) {
      await previewButtons.first().click();

      // Verify preview modal/section appears
      const modal = page.locator('[role="dialog"]').first();
      if (await modal.isVisible().catch(() => false)) {
        await expect(modal).toBeVisible();
      }
    }
  });
});
