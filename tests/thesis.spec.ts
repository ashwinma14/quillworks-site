import { expect, test } from '@playwright/test';

test.describe('Thesis section', () => {
  test('visual + a11y', async ({ page, browserName }) => {
    await page.goto('http://localhost:3004/'); // adjust if base route differs
    const thesis = page.locator('section', {
      hasText: 'Technology should adapt',
    });

    // Visual snapshot per viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(thesis).toHaveScreenshot(`thesis-${browserName}-1280.png`);

    await page.setViewportSize({ width: 375, height: 812 });
    await expect(thesis).toHaveScreenshot(`thesis-${browserName}-375.png`);

    // Axe a11y scan
    await page.addScriptTag({ path: require.resolve('axe-core') });
    const accessibilityScanResults = await page.evaluate(async () => {
      // @ts-ignore
      return axe.run();
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
