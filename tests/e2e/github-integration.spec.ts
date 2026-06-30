import { expect, test } from '@playwright/test';

const getUsernameInput = (page) => page.getByPlaceholder(/octocat/i).first();

test.describe('GitHub Username Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
  });

  test('inputs and displays GitHub username', async ({ page }) => {
    const testUsername = 'octocat';
    const usernameInput = getUsernameInput(page);
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(testUsername);
    await expect(usernameInput).toHaveValue(testUsername);
  });

  test('resets GitHub username after route navigation', async ({ page }) => {
    const testUsername = 'narainkarthikv';

    const usernameInput = getUsernameInput(page);
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(testUsername);
    await page.goto('/components');
    await page.goto('/shop');
    await expect(getUsernameInput(page)).toHaveValue('');
  });

  test('clears username input', async ({ page }) => {
    const testUsername = 'testuser';

    const usernameInput = getUsernameInput(page);
    await usernameInput.fill(testUsername);
    await usernameInput.clear();
    await expect(usernameInput).toHaveValue('');
  });
});
