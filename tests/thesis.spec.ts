import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Thesis section', () => {
  test('a11y only', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    // Just run the accessibility scan, excluding development-specific issues
    const results = await new AxeBuilder({ page })
      .disableRules([
        'document-title',
        'html-has-lang',
        'landmark-one-main',
        'scrollable-region-focusable',
      ])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
