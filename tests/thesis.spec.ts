import { expect, test } from '@playwright/test';

test.describe('Thesis section', () => {
  test.skip('visual + a11y', async ({ page, browserName }) => {
    await page.goto('/'); // adjust if base route differs
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Allow time for reveal animations

    // Wait for the thesis section to be visible
    await page.waitForSelector(
      'h2:has-text("Technology should adapt to human rhythm")',
      { timeout: 30000 },
    );
    const thesis = page.locator(
      'section:has(h2:has-text("Technology should adapt to human rhythm"))',
    );

    // Visual snapshot per viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(thesis).toHaveScreenshot(`thesis-${browserName}-1280.png`, {
      timeout: 60000,
    });

    await page.setViewportSize({ width: 375, height: 812 });
    await expect(thesis).toHaveScreenshot(`thesis-${browserName}-375.png`, {
      timeout: 60000,
    });

    // Axe a11y scan
    await page.addScriptTag({ path: require.resolve('axe-core') });
    const accessibilityScanResults = await page.evaluate(async () => {
      // @ts-ignore
      return axe.run();
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
