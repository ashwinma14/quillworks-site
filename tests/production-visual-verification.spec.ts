import { expect, test } from '@playwright/test';

test.describe('Production Visual Verification', () => {
  test.use({ baseURL: 'https://quillworks-site.vercel.app' });

  test('should capture form states for visual verification', async ({
    page,
  }) => {
    // Navigate to production site
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the email capture form
    const form = page.locator('form').filter({ hasText: 'Stay in the Loop' });
    await expect(form).toBeVisible({ timeout: 10000 });

    // Take screenshot of initial form state
    await page.screenshot({
      path: '/Users/ashwinappiah/Dev/project-stillworks/test-results/form-initial-state.png',
      fullPage: false,
      clip: { x: 0, y: 300, width: 1000, height: 500 },
    });
    console.log('📸 Captured initial form state');

    // Fill the email input
    const emailInput = form.locator('input[type="email"]');
    await emailInput.fill('visual-test@example.com');

    // Take screenshot with filled email
    await page.screenshot({
      path: '/Users/ashwinappiah/Dev/project-stillworks/test-results/form-filled-state.png',
      fullPage: false,
      clip: { x: 0, y: 300, width: 1000, height: 500 },
    });
    console.log('📸 Captured filled form state');

    // Get the submit button
    const submitButton = form.locator('button[type="submit"]');

    // Set up slower network to capture loading state
    await page.route('https://formspree.io/f/mvgqbovv', async (route) => {
      console.log('🌐 Request intercepted, adding delay...');
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay
      await route.continue();
    });

    // Click submit and immediately try to capture loading state
    const clickPromise = submitButton.click();

    // Wait just a tiny bit for the click to register
    await page.waitForTimeout(100);

    // Try to capture loading state
    try {
      await expect(submitButton).toContainText('Submitting…', { timeout: 500 });

      await page.screenshot({
        path: '/Users/ashwinappiah/Dev/project-stillworks/test-results/form-loading-state.png',
        fullPage: false,
        clip: { x: 0, y: 300, width: 1000, height: 500 },
      });
      console.log('📸 Captured loading state successfully!');

      // Verify disabled state
      await expect(submitButton).toBeDisabled();
      await expect(submitButton).toHaveAttribute('aria-busy', 'true');
      console.log(
        '✅ Button is correctly disabled and has aria-busy=true during loading'
      );
    } catch (error) {
      console.log(
        '⚠️ Could not capture loading state - checking if button was disabled'
      );

      // Even if we can't see the text change, check if button gets disabled
      const isDisabled = await submitButton.isDisabled();
      if (isDisabled) {
        console.log('✅ Button is disabled even if loading text not visible');
      } else {
        console.log('❌ Button was not disabled during submission');
      }
    }

    // Wait for the click to complete
    await clickPromise;

    // Wait for response and capture final state
    try {
      await expect(
        page.getByText(/thanks for joining the journey/i)
      ).toBeVisible({ timeout: 10000 });

      await page.screenshot({
        path: '/Users/ashwinappiah/Dev/project-stillworks/test-results/form-success-state.png',
        fullPage: false,
        clip: { x: 0, y: 300, width: 1000, height: 500 },
      });
      console.log('📸 Captured success state');
      console.log('✅ Form submission completed successfully');
    } catch (error) {
      // Check for error state
      const errorMessage = page.getByText(/something went wrong/i);
      if (await errorMessage.isVisible()) {
        await page.screenshot({
          path: '/Users/ashwinappiah/Dev/project-stillworks/test-results/form-error-state.png',
          fullPage: false,
          clip: { x: 0, y: 300, width: 1000, height: 500 },
        });
        console.log('📸 Captured error state');
        console.log('⚠️ Form showed error message');
      }
    }
  });

  test('should verify rapid click prevention', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const form = page.locator('form').filter({ hasText: 'Stay in the Loop' });
    const emailInput = form.locator('input[type="email"]');
    const submitButton = form.locator('button[type="submit"]');

    await emailInput.fill('rapid-click-test@example.com');

    let requestCount = 0;
    await page.route('https://formspree.io/f/mvgqbovv', async (route) => {
      requestCount++;
      console.log(`🌐 Request #${requestCount} intercepted`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.continue();
    });

    // Perform rapid clicks
    const clickPromises = [];
    for (let i = 0; i < 5; i++) {
      clickPromises.push(
        submitButton.click({ force: true }).catch(() => {
          // Expected to fail for disabled button
        })
      );
    }

    await Promise.all(clickPromises);

    // Wait a bit for any delayed requests
    await page.waitForTimeout(2000);

    console.log(`🔍 Total requests sent: ${requestCount}`);

    if (requestCount === 1) {
      console.log(
        '✅ Double-submit prevention working correctly - only 1 request sent'
      );
    } else if (requestCount > 1) {
      console.log(
        `❌ Double-submit prevention failed - ${requestCount} requests sent`
      );
      throw new Error(
        `Expected 1 request, but ${requestCount} requests were sent`
      );
    } else {
      console.log('❌ No requests sent - form may not be working');
      throw new Error('No requests were sent to Formspree');
    }
  });
});
