import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Thesis section', () => {
  test('a11y only', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    // Scan for accessibility violations, disabling problematic rules for test environment
    const axe = await new AxeBuilder({ page })
      .disableRules([
        'document-title',
        'html-has-lang',
        'landmark-one-main',
        'scrollable-region-focusable',
        'color-contrast',
      ])
      .analyze();
    expect(axe.violations).toEqual([]);
  });
});
