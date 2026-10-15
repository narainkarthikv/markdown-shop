import { expect, test } from '@playwright/test';

const getUsernameInput = (page) =>
  page.getByRole('textbox', { name: 'GitHub username' });

test.describe('GitHub Username Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('inputs and displays GitHub username', async ({ page }) => {
    const testUsername = 'octocat';
    const usernameInput = getUsernameInput(page);
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(testUsername);
    await expect(usernameInput).toHaveValue(testUsername);
  });

  test('persists GitHub username after route navigation', async ({ page }) => {
    const testUsername = 'narainkarthikv';

    const usernameInput = getUsernameInput(page);
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(testUsername);
    await page.route('https://api.github.com/**', (route) =>
      route.fulfill({ json: [] })
    );
    await page.getByRole('button', { name: /update components/i }).click();
    await expect(
      page.getByText(`Showing components for @${testUsername}`)
    ).toBeVisible();
    await page.goto('/components');
    await expect(getUsernameInput(page)).toHaveValue(testUsername);
    await page.goto('/shop');
    await page.goto('/components');
    await expect(getUsernameInput(page)).toHaveValue(testUsername);
  });

  test('clears username input', async ({ page }) => {
    const testUsername = 'testuser';

    const usernameInput = getUsernameInput(page);
    await usernameInput.fill(testUsername);
    await usernameInput.clear();
    await expect(usernameInput).toHaveValue('');
  });
});
