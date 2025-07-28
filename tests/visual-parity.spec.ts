import { expect, test } from '@playwright/test';

const VIEWPORT = { width: 1440, height: 900 };
async function snapshot(page: any, name: string) {
  await page.setViewportSize(VIEWPORT);
  await page.waitForSelector('h1', { state: 'visible' }); // hero ready
  await page.evaluate(() => window.scrollBy(0, 400)); // trigger card fade-in
  await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: false });
}

test('baseline', async ({ page }) => {
  await page.goto('/baseline', { waitUntil: 'networkidle' });
  await snapshot(page, 'baseline');
});

test('react', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await snapshot(page, 'react');
});
