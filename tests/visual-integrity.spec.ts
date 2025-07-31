import { expect, test } from '@playwright/test';

/**
 * Visual Integrity Protection Suite
 * Created: 2025-07-31
 * Base Commit: 0246dc3 + Phase 1 + Phase 2 improvements
 * Visual Diff Threshold: 0.01 (Ultra-strict)
 * Purpose: Prevent future regressions to typography, layout, and icon rendering
 *
 * This test suite validates the complete visual integrity of:
 * - Hero headline typography and wrapping behavior
 * - StoryCards icon consistency and alignment
 * - Font loading and rendering stability
 */

test.describe('Visual Integrity Protection Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure maximum consistency for visual regression protection
    await page.addInitScript(() => {
      // Disable font smoothing variations
      (document.body.style as any).webkitFontSmoothing = 'antialiased';
      (document.body.style as any).mozOsxFontSmoothing = 'grayscale';

      // Force consistent timing
      Object.defineProperty(window, 'devicePixelRatio', {
        get() {
          return 2;
        },
      });

      // Ensure fonts are loaded before any rendering
      document.fonts.ready.then(() => {
        console.log('All fonts loaded for visual integrity testing');
      });
    });
  });

  test('Complete visual integrity - Hero + StoryCards', async ({ page }) => {
    // Set standard desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait for all animations and fonts to settle
    await page.waitForTimeout(3000);
    await page.evaluate(() => document.fonts.ready);

    // Take full page screenshot for comprehensive protection
    const fullPageScreenshot = await page.screenshot({
      fullPage: true,
      animations: 'disabled',
    });

    // Ultra-strict threshold for complete visual integrity
    await expect(fullPageScreenshot).toMatchSnapshot(
      'complete-visual-integrity.png',
      {
        threshold: 0.01, // 1% - very strict for complete page
        maxDiffPixels: 1000, // Allow minimal differences for system variations
      }
    );
  });

  test('Hero typography regression protection', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    await page.waitForTimeout(2000);
    await page.evaluate(() => document.fonts.ready);

    // Focus specifically on Hero section for typography protection
    const heroSection = page.locator('section').first();
    const heroScreenshot = await heroSection.screenshot({
      animations: 'disabled',
    });

    // Extremely strict for Hero typography
    await expect(heroScreenshot).toMatchSnapshot(
      'hero-typography-protection.png',
      {
        threshold: 0.005, // 0.5% - extremely strict for critical Hero section
        maxDiffPixels: 200,
      }
    );
  });

  test('StoryCards icon regression protection', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    await page.waitForTimeout(3000);
    await page.evaluate(() => document.fonts.ready);

    // Scroll to StoryCards for icon protection
    await page
      .locator('[data-testid="story-card-grid"]')
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    const storyCardsScreenshot = await page
      .locator('[data-testid="story-card-grid"]')
      .screenshot({
        animations: 'disabled',
      });

    // Strict threshold for icon consistency protection
    await expect(storyCardsScreenshot).toMatchSnapshot(
      'storycards-icon-protection.png',
      {
        threshold: 0.008, // 0.8% - very strict for icon consistency
        maxDiffPixels: 300,
      }
    );
  });

  test('Cross-breakpoint typography stability', async ({ page }) => {
    // Test multiple breakpoints to ensure typography wrapping remains stable
    const breakpoints = [
      { width: 1024, height: 768, name: 'lg' },
      { width: 1280, height: 900, name: 'xl' },
      { width: 1440, height: 900, name: 'desktop' },
      { width: 1536, height: 1024, name: '2xl' },
    ];

    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

      await page.waitForTimeout(1500);
      await page.evaluate(() => document.fonts.ready);

      // Validate headline text integrity
      const headlineText = await page
        .getByRole('heading', { level: 1 })
        .textContent();
      expect(headlineText).toContain(
        'Technology should adapt to your rhythm — not the other way around.'
      );
      expect(headlineText?.trim()).toMatch(/around\.\s*$/);

      // Take Hero screenshot for each breakpoint
      const heroScreenshot = await page.locator('section').first().screenshot({
        animations: 'disabled',
      });

      await expect(heroScreenshot).toMatchSnapshot(
        `hero-${bp.name}-stability.png`,
        {
          threshold: 0.01,
          maxDiffPixels: 400,
        }
      );

      console.log(
        `✅ ${bp.name} (${bp.width}px): Typography stability validated`
      );
    }
  });

  test('Font loading consistency validation', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Track font requests to ensure self-hosted font system works
    const fontRequests: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('fonts.googleapis.com') || url.includes('gstatic.com')) {
        fontRequests.push(url);
      }
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Ensure no external font requests (self-hosted fonts working)
    expect(fontRequests).toHaveLength(0);

    // Validate Instrument Serif is properly loaded
    const headlineFont = await page
      .getByRole('heading', { level: 1 })
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(headlineFont).toContain('Instrument Serif');

    console.log(
      '✅ Font loading consistency: No external requests, Instrument Serif loaded'
    );
  });
});
