import { expect, test } from '@playwright/test';

test.describe('Template actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/templates');
    await page.waitForLoadState('networkidle');
  });

  test('copies template content to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const copyButton = page
      .getByRole('button', {
        name: /copy template to clipboard|copied to clipboard/i,
      })
      .first();
    await expect(copyButton).toBeVisible();
    await copyButton.click();
    await expect(copyButton).toHaveAttribute(
      'aria-label',
      /copied to clipboard/i
    );
  });

  test('uses a template in the markdown editor', async ({ page }) => {
    const useButton = page
      .getByRole('button', { name: /use template in editor/i })
      .first();
    await expect(useButton).toBeVisible();
    await useButton.click();
    await expect(page).toHaveURL(/\/shop$/);
    await expect(
      page.getByRole('textbox', { name: /write your readme markdown here/i })
    ).not.toHaveValue('');
  });

  test('shows quick actions on templates', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /preview template/i }).first()
    ).toBeVisible();
    await expect(
      page
        .getByRole('button', {
          name: /copy template to clipboard|copied to clipboard/i,
        })
        .first()
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /use template in editor/i }).first()
    ).toBeVisible();
  });
});
