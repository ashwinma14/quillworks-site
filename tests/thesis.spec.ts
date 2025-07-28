import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Thesis section', () => {
  test.skip('a11y only', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    // Axe a11y scan
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
