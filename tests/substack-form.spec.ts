import { expect, test } from '@playwright/test';

test.describe('Substack Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Substack subscription form', async ({ page }) => {
    // Wait for the form to be present
    const form = page.locator('form[aria-label="Subscribe to Quillworks"]');
    await expect(form).toBeVisible({ timeout: 10000 });

    // Verify form attributes
    await expect(form).toHaveAttribute(
      'action',
      'https://quillworks.substack.com/subscribe'
    );
    await expect(form).toHaveAttribute('method', 'POST');
    await expect(form).toHaveAttribute('target', '_blank');

    // Check email input
    const emailInput = form.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('name', 'email');
    await expect(emailInput).toHaveAttribute('placeholder', 'Your email');
    await expect(emailInput).toHaveAttribute('required', '');
    await expect(emailInput).toHaveAttribute('autoComplete', 'email');

    // Check submit button
    const submitButton = form.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText('Subscribe');

    // Check form styling
    await expect(form).toHaveClass(
      /mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row/
    );
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const form = page.locator('form[aria-label="Subscribe to Quillworks"]');
    await expect(form).toBeVisible();

    // Check that form elements stack vertically on mobile
    const emailInput = form.locator('input[type="email"]');
    const submitButton = form.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Check email input contains responsive classes
    await expect(emailInput).toHaveClass(/w-full.*sm:w-auto/);
  });

  test('should have proper keyboard navigation', async ({ page }) => {
    const form = page.locator('form[aria-label="Subscribe to Quillworks"]');
    const emailInput = form.locator('input[type="email"]');
    const submitButton = form.locator('button[type="submit"]');

    // Tab to email input
    await emailInput.focus();
    await expect(emailInput).toBeFocused();

    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(submitButton).toBeFocused();
  });
});
