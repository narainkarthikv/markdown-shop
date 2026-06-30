import { expect, test } from '@playwright/test';

const STORE_KEY = 'markdown-shop-store';

const getStoredThemeMode = (page) =>
  page.evaluate((storeKey) => {
    const raw = window.localStorage.getItem(storeKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.themeMode ?? null;
  }, STORE_KEY);

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
  });

  test('cycles theme preference and persists to localStorage', async ({
    page,
  }) => {
    const themeToggle = page
      .locator('button[aria-label^="switch to "]')
      .first();
    await expect(themeToggle).toBeVisible();
    const beforeLabel = await themeToggle.getAttribute('aria-label');
    await themeToggle.click();
    await expect(themeToggle).not.toHaveAttribute(
      'aria-label',
      beforeLabel ?? ''
    );
    const storedTheme = await getStoredThemeMode(page);
    expect(storedTheme).toMatch(/^(light|dark)$/);
  });

  test('persists theme preference across page reload', async ({ page }) => {
    const themeToggle = page
      .locator('button[aria-label^="switch to "]')
      .first();
    await expect(themeToggle).toBeVisible();
    await themeToggle.click();
    const themeAfterToggle = await getStoredThemeMode(page);
    expect(themeAfterToggle).toMatch(/^(light|dark)$/);

    await page.reload();
    const themeAfterReload = await getStoredThemeMode(page);

    expect(themeAfterReload).toEqual(themeAfterToggle);
  });
});
