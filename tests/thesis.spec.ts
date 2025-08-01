import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Thesis section', () => {
  test('a11y only', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    // Wait for main content to be visible before running accessibility scan
    await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });

    // Run accessibility scan in production environment, excluding environment-specific issues
    const results = await new AxeBuilder({ page })
      .disableRules([
        'document-title',
        'html-has-lang',
        'landmark-one-main',
        'scrollable-region-focusable',
      ])
      .exclude('iframe') // Exclude third-party Substack iframe from accessibility testing
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
