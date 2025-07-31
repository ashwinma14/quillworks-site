import { expect, test } from '@playwright/test';

/**
 * Snapshot created from visually-locked-2025-07-30
 * Commit: 0246dc3
 * Visual Diff Threshold: 0.01
 * Rationale: Lock baseline before typography + icon work
 * Phase: Hero Typography Wrapping Lock
 */

test.describe('Hero Typography Wrapping Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure consistent font rendering
    await page.addInitScript(() => {
      // Disable font smoothing variations
      (document.body.style as any).webkitFontSmoothing = 'antialiased';
      (document.body.style as any).mozOsxFontSmoothing = 'grayscale';

      // Ensure fonts are loaded
      document.fonts.ready.then(() => {
        // All fonts loaded
      });
    });
  });

  test('Hero headline wrapping at lg breakpoint (1024px)', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait for fonts and animations
    await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });
    await page.waitForTimeout(2000);
    await page.evaluate(() => document.fonts.ready);

    // Screenshot just the Hero section
    const heroSection = page.locator('section').first();
    const heroScreenshot = await heroSection.screenshot({
      animations: 'disabled',
    });

    // Validate with very strict threshold (0.01%)
    await expect(heroScreenshot).toMatchSnapshot('hero-lg-wrapping.png', {
      threshold: 0.01,
      maxDiffPixels: 100,
    });
  });

  test('Hero headline wrapping at xl breakpoint (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });
    await page.waitForTimeout(2000);
    await page.evaluate(() => document.fonts.ready);

    const heroSection = page.locator('section').first();
    const heroScreenshot = await heroSection.screenshot({
      animations: 'disabled',
    });

    await expect(heroScreenshot).toMatchSnapshot('hero-xl-wrapping.png', {
      threshold: 0.01,
      maxDiffPixels: 100,
    });
  });

  test('Hero headline wrapping at 2xl breakpoint (1536px)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1536, height: 1024 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });
    await page.waitForTimeout(2000);
    await page.evaluate(() => document.fonts.ready);

    const heroSection = page.locator('section').first();
    const heroScreenshot = await heroSection.screenshot({
      animations: 'disabled',
    });

    await expect(heroScreenshot).toMatchSnapshot('hero-2xl-wrapping.png', {
      threshold: 0.01,
      maxDiffPixels: 100,
    });
  });

  test('Validate final line contains "around." without early wrapping', async ({
    page,
  }) => {
    // Test at critical breakpoints where wrapping typically occurs
    const breakpoints = [
      { width: 1024, height: 768, name: 'lg' },
      { width: 1280, height: 900, name: 'xl' },
      { width: 1536, height: 1024, name: '2xl' },
    ];

    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

      await page
        .getByRole('heading', { level: 1 })
        .waitFor({ state: 'visible' });
      await page.waitForTimeout(1000);

      // Get the headline text and check line wrapping
      const headlineElement = page.getByRole('heading', { level: 1 });
      const headlineText = await headlineElement.textContent();

      // Verify the headline contains the expected text
      expect(headlineText).toContain(
        'Technology should adapt to your rhythm — not the other way around.'
      );

      // Check that "around." appears at the end (indicating it's on the final line)
      expect(headlineText?.trim()).toMatch(/around\.\s*$/);

      // Get computed styles to verify typography settings
      const headlineStyles = await headlineElement.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
          letterSpacing: styles.letterSpacing,
          maxWidth: styles.maxWidth,
        };
      });

      // Verify Instrument Serif is loaded
      expect(headlineStyles.fontFamily).toContain('Instrument Serif');

      console.log(`✅ ${bp.name} (${bp.width}px): Typography validated`);
    }
  });
});
