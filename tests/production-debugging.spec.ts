import { test } from '@playwright/test';

test.describe('Production Debugging', () => {
  test.use({ baseURL: 'https://quillworks-site.vercel.app' });

  test('should inspect form behavior in detail', async ({ page }) => {
    // Enable console logging
    page.on('console', (msg) => {
      if (msg.type() === 'log' || msg.type() === 'error') {
        console.log(`🖥️ Console: ${msg.text()}`);
      }
    });

    // Navigate to production site
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the form and elements
    const form = page.locator('form').filter({ hasText: 'Stay in the Loop' });
    const emailInput = form.locator('input[type="email"]');
    const submitButton = form.locator('button[type="submit"]');

    // Log initial button state
    const initialText = await submitButton.textContent();
    const initialDisabled = await submitButton.isDisabled();
    console.log(`📝 Initial button text: "${initialText}"`);
    console.log(`📝 Initial disabled state: ${initialDisabled}`);

    // Fill email
    await emailInput.fill('debug@example.com');

    // Set up request interception with detailed logging
    let requestIntercepted = false;
    let responseReceived = false;

    await page.route('https://formspree.io/f/mvgqbovv', async (route) => {
      requestIntercepted = true;
      const requestData = await route.request().postData();
      console.log(`🌐 REQUEST INTERCEPTED`);
      console.log(`📊 Request data: ${requestData}`);

      // Add delay to observe state changes
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await route.continue();
      responseReceived = true;
    });

    // Check button attributes before clicking
    const beforeClickText = await submitButton.textContent();
    const beforeClickDisabled = await submitButton.isDisabled();
    const beforeClickAriaBusy = await submitButton.getAttribute('aria-busy');

    console.log(`📝 BEFORE CLICK:`);
    console.log(`  - Text: "${beforeClickText}"`);
    console.log(`  - Disabled: ${beforeClickDisabled}`);
    console.log(`  - Aria-busy: ${beforeClickAriaBusy}`);

    // Click and immediately check state
    await submitButton.click();

    // Check immediately after click (within 100ms)
    await page.waitForTimeout(50);

    const afterClickText = await submitButton.textContent();
    const afterClickDisabled = await submitButton.isDisabled();
    const afterClickAriaBusy = await submitButton.getAttribute('aria-busy');

    console.log(`📝 IMMEDIATELY AFTER CLICK (50ms):`);
    console.log(`  - Text: "${afterClickText}"`);
    console.log(`  - Disabled: ${afterClickDisabled}`);
    console.log(`  - Aria-busy: ${afterClickAriaBusy}`);

    // Check again after 500ms
    await page.waitForTimeout(450);

    const after500msText = await submitButton.textContent();
    const after500msDisabled = await submitButton.isDisabled();
    const after500msAriaBusy = await submitButton.getAttribute('aria-busy');

    console.log(`📝 AFTER 500ms:`);
    console.log(`  - Text: "${after500msText}"`);
    console.log(`  - Disabled: ${after500msDisabled}`);
    console.log(`  - Aria-busy: ${after500msAriaBusy}`);

    // Wait for request to complete
    await page.waitForTimeout(2000);

    console.log(`🔍 FINAL STATE:`);
    console.log(`  - Request intercepted: ${requestIntercepted}`);
    console.log(`  - Response received: ${responseReceived}`);

    // Check final state
    const finalText = await submitButton.textContent();
    const finalDisabled = await submitButton.isDisabled();
    const finalAriaBusy = await submitButton.getAttribute('aria-busy');

    console.log(`📝 FINAL BUTTON STATE:`);
    console.log(`  - Text: "${finalText}"`);
    console.log(`  - Disabled: ${finalDisabled}`);
    console.log(`  - Aria-busy: ${finalAriaBusy}`);

    // Check if success message appeared
    const successVisible = await page
      .getByText(/thanks for joining the journey/i)
      .isVisible();
    const errorVisible = await page
      .getByText(/something went wrong/i)
      .isVisible();

    console.log(`📝 MESSAGES:`);
    console.log(`  - Success message visible: ${successVisible}`);
    console.log(`  - Error message visible: ${errorVisible}`);
  });

  test('should check if JavaScript is working correctly', async ({ page }) => {
    await page.goto('/');

    // Check if the page has JavaScript errors
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    await page.waitForLoadState('networkidle');

    // Check if React is loaded
    const reactExists = await page.evaluate(() => {
      return (
        typeof window.React !== 'undefined' ||
        document.querySelector('[data-reactroot]') !== null ||
        document.querySelector('#__next') !== null
      );
    });

    console.log(`⚛️ React detected: ${reactExists}`);
    console.log(`❌ JavaScript errors: ${errors.length > 0 ? errors : 'None'}`);

    // Check if the form has event listeners
    const hasEventListeners = await page.evaluate(() => {
      const form = document.querySelector('form');
      return form
        ? form.onsubmit !== null || form.addEventListener !== undefined
        : false;
    });

    console.log(`🎯 Form has event handling: ${hasEventListeners}`);
  });
});
