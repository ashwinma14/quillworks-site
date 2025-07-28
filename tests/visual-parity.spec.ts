import { expect, test } from '@playwright/test';

const loadAndSnap = async (page: any, route: string, name: string) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route, { waitUntil: 'load' });
  await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });
  await expect(page).toHaveScreenshot(`${name}.png`);
};

test('baseline', async ({ page }) => {
  await loadAndSnap(page, '/baseline', 'baseline');
});

test('react', async ({ page }) => {
  await loadAndSnap(page, '/', 'react');
});
