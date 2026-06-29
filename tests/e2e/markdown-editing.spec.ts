import { expect, test } from '@playwright/test';

const getMarkdownEditor = (page) =>
  page.getByRole('textbox', { name: /write your readme markdown here/i });

test.describe('Markdown Editing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
    await expect(getMarkdownEditor(page)).toBeVisible();
  });

  test('edits markdown content and preview updates', async ({ page }) => {
    const testMarkdown = '# Hello World\n\nThis is a **test** markdown.';
    const markdownTextarea = getMarkdownEditor(page);
    await markdownTextarea.fill(testMarkdown);

    const preview = page.locator('.markdown-preview');
    await expect(preview).toContainText('Hello World');
    await expect(preview.locator('strong')).toContainText('test');
  });

  test('markdown preview renders links correctly', async ({ page }) => {
    const markdownWithLink =
      '# Title\n\nCheck out [my repo](https://github.com/user/repo)';

    const markdownTextarea = getMarkdownEditor(page);
    await markdownTextarea.fill(markdownWithLink);

    const preview = page.locator('.markdown-preview');
    const link = preview.locator('a');
    await expect(link).toContainText('my repo');
    await expect(link).toHaveAttribute('href', 'https://github.com/user/repo');
  });

  test('markdown preview renders code blocks', async ({ page }) => {
    const markdownWithCode = '```javascript\nconst x = 10;\n```';

    const markdownTextarea = getMarkdownEditor(page);
    await markdownTextarea.fill(markdownWithCode);

    const preview = page.locator('.markdown-preview');
    await expect(preview.locator('code')).toContainText('const x = 10');
  });

  test('clears markdown content', async ({ page }) => {
    const testMarkdown = '# Test Content';

    const markdownTextarea = getMarkdownEditor(page);
    await markdownTextarea.fill(testMarkdown);
    await expect(markdownTextarea).toHaveValue(testMarkdown);
    await markdownTextarea.fill('');
    await expect(markdownTextarea).toHaveValue('');
  });

  test('resets markdown content after route navigation', async ({
    page,
  }) => {
    const testMarkdown = '# Persistent Content\n\nThis should persist.';

    const markdownTextarea = getMarkdownEditor(page);
    await markdownTextarea.fill(testMarkdown);
    await page.goto('/templates');
    await page.goto('/shop');
    await expect(getMarkdownEditor(page)).toHaveValue('');
  });
});
