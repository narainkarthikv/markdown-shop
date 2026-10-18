import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /build.*project docs/i,
      })
    ).toBeVisible();
  });

  test('navigates to shop page from home', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('link', { name: /open builder/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/shop$/);
  });

  test('navigates between pages using navbar', async ({ page }) => {
    await page.goto('/shop');

    const componentLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', {
        name: 'Components',
      });
    await expect(componentLink).toBeVisible();
    await componentLink.click();
    await expect(page).toHaveURL(/\/components$/);

    const templateLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', {
        name: 'Templates',
      });
    await expect(templateLink).toBeVisible();
    await templateLink.click();
    await expect(page).toHaveURL(/\/templates$/);

    const shopLink = page.getByRole('link', { name: /view shopping cart/i });
    await expect(shopLink).toBeVisible();
    await shopLink.click();
    await expect(page).toHaveURL(/\/shop$/);
  });

  test('navigates to non-existent route shows 404', async ({ page }) => {
    await page.goto('/non-existent-route');
    await expect(page.getByText('404')).toBeVisible();
  });
});
