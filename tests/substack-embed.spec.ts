import { expect, test } from '@playwright/test';

test.describe('Substack Embed', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Substack subscription iframe', async ({ page }) => {
    // Wait for the iframe to be present
    const iframe = page.locator(
      'iframe[title="Subscribe to Quillworks Substack"]'
    );
    await expect(iframe).toBeVisible({ timeout: 10000 });

    // Verify iframe attributes
    await expect(iframe).toHaveAttribute(
      'src',
      'https://quillworks.substack.com/embed'
    );
    await expect(iframe).toHaveAttribute('height', '150');

    // Check that iframe has proper styling
    await expect(iframe).toHaveClass(/w-full border border-gray-200 bg-white/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const iframe = page.locator(
      'iframe[title="Subscribe to Quillworks Substack"]'
    );
    await expect(iframe).toBeVisible();

    // Check that the iframe container respects max-width on mobile
    const container = page.locator(
      'div:has(> iframe[title="Subscribe to Quillworks Substack"])'
    );
    await expect(container).toHaveClass(/mx-auto.*w-full.*max-w-\[480px\]/);
  });
});
