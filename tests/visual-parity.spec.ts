import { expect, test } from '@playwright/test';

test.describe('Visual parity', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('baseline', async ({ page }) => {
    await page.goto('/baseline');
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('baseline.png');
  });

  test('react', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('react.png');
  });
});
