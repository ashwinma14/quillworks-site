import { expect, test } from '@playwright/test';

test.describe('Email Capture Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display email capture form', async ({ page }) => {
    // Wait for the form to be present
    const form = page.locator('form').filter({ hasText: 'Stay in the Loop' });
    await expect(form).toBeVisible({ timeout: 10000 });

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
    await expect(
      page.getByRole('button', { name: /stay in the loop/i })
    ).toBeVisible();

    // Check form styling
    await expect(form).toHaveClass(
      /mt-4 flex flex-col items-start justify-start gap-3 sm:mt-6 sm:flex-row/
    );
  });

  test('should have hidden honeypot field', async ({ page }) => {
    const honeypot = page.locator('input[name="_gotcha"]');
    await expect(honeypot).toBeHidden();
  });

  test('should submit form successfully', async ({ page }) => {
    // Mock Formspree API
    await page.route('https://formspree.io/f/mvgqbovv', (route) =>
      route.fulfill({ status: 200, body: '{}' })
    );

    // Fill and submit
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("Stay in the Loop")');

    // Verify success message
    await expect(
      page.getByText(/thanks for joining the journey/i)
    ).toBeVisible();

    // Verify form reset
    await expect(page.locator('input[type="email"]')).toHaveValue('');
  });

  test('should show error on failed submission', async ({ page }) => {
    // Mock Formspree API failure
    await page.route('https://formspree.io/f/mvgqbovv', (route) =>
      route.fulfill({ status: 500, body: '{}' })
    );

    // Fill and submit
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button:has-text("Stay in the Loop")');

    // Verify error message
    await expect(page.getByText(/something went wrong/i)).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const form = page.locator('form').filter({ hasText: 'Stay in the Loop' });
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
    const form = page.locator('form').filter({ hasText: 'Stay in the Loop' });
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
