import { expect, test } from '@playwright/test';

const VIEWPORT = { width: 1440, height: 900 };
async function snapshot(page: any, name: string) {
  await page.setViewportSize(VIEWPORT);
  // Wait for page load and any animations
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // Allow time for reveal animations
  await page.evaluate(() => window.scrollBy(0, 400)); // trigger card fade-in
  await page.waitForTimeout(1000); // Allow time for scroll animations
  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage: false,
    timeout: 15000,
  });
}

test('baseline', async ({ page }) => {
  await page.goto('/baseline', { waitUntil: 'networkidle' });
  await snapshot(page, 'baseline');
});

test('react', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await snapshot(page, 'react');
});
