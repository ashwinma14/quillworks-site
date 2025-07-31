import { expect, test } from '@playwright/test';

/**
 * Snapshot created from visually-locked-2025-07-30
 * Commit: 0246dc3 + Phase 2 icon improvements
 * Visual Diff Threshold: 0.03
 * Rationale: Ensure icon rendering consistency and alignment
 * Phase: Icon Rendering Consistency
 */

test.describe('Icon Rendering Consistency Tests', () => {
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

  test('StoryCards icon rendering and alignment', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait for animations to complete and fonts to load
    await page.waitForTimeout(3000);
    await page.evaluate(() => document.fonts.ready);

    // Scroll to StoryCards section
    await page
      .locator('[data-testid="story-card-grid"]')
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Wait for scroll animations

    // Screenshot just the StoryCards section
    const storyCardsSection = page.locator('[data-testid="story-card-grid"]');
    const storyCardsScreenshot = await storyCardsSection.screenshot({
      animations: 'disabled',
    });

    // Validate with strict threshold
    await expect(storyCardsScreenshot).toMatchSnapshot(
      'story-cards-icons.png',
      {
        threshold: 0.03,
        maxDiffPixels: 500,
      }
    );
  });

  test('Icon sizing and color consistency validation', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    await page.waitForTimeout(2000);
    await page.evaluate(() => document.fonts.ready);

    // Scroll to StoryCards section
    await page
      .locator('[data-testid="story-card-grid"]')
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Get all icons from StoryCards
    const iconElements = page.locator('[data-testid="story-card-grid"] svg');
    const iconCount = await iconElements.count();

    expect(iconCount).toBe(3); // Should have exactly 3 icons

    // Validate each icon's properties
    for (let i = 0; i < iconCount; i++) {
      const icon = iconElements.nth(i);

      // Check icon dimensions (should be h-7 w-7 = 28px)
      const iconBox = await icon.boundingBox();
      expect(iconBox?.width).toBeCloseTo(28, 2);
      expect(iconBox?.height).toBeCloseTo(28, 2);

      // Check computed styles
      const iconStyles = await icon.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          width: styles.width,
          height: styles.height,
          color: styles.color,
        };
      });

      // Validate dimensions
      expect(iconStyles.width).toBe('28px');
      expect(iconStyles.height).toBe('28px');

      // Validate color is using text-gray-600 token
      // Actual rendered color: rgb(113, 128, 150) - acceptable gray tone
      expect(iconStyles.color).toBe('rgb(113, 128, 150)');

      console.log(
        `✅ Icon ${i + 1}: ${iconStyles.width} × ${iconStyles.height}, color: ${iconStyles.color}`
      );
    }
  });

  test('Icon wrapper aspect-square consistency', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    await page.waitForTimeout(2000);
    await page.evaluate(() => document.fonts.ready);

    // Scroll to StoryCards section
    await page
      .locator('[data-testid="story-card-grid"]')
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Get all icon wrappers
    const iconWrappers = page.locator(
      '[data-testid="story-card-grid"] .rounded-full'
    );
    const wrapperCount = await iconWrappers.count();

    expect(wrapperCount).toBe(3); // Should have exactly 3 icon wrappers

    // Validate each wrapper's aspect ratio and centering
    for (let i = 0; i < wrapperCount; i++) {
      const wrapper = iconWrappers.nth(i);

      // Check wrapper dimensions (should be size-14 = 56px)
      const wrapperBox = await wrapper.boundingBox();
      expect(wrapperBox?.width).toBeCloseTo(56, 2);
      expect(wrapperBox?.height).toBeCloseTo(56, 2);

      // Check computed styles for aspect-square
      const wrapperStyles = await wrapper.evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          width: styles.width,
          height: styles.height,
          display: styles.display,
          alignItems: styles.alignItems,
          justifyContent: styles.justifyContent,
          aspectRatio: styles.aspectRatio,
        };
      });

      // Validate perfect square dimensions
      expect(wrapperStyles.width).toBe('56px');
      expect(wrapperStyles.height).toBe('56px');
      expect(wrapperStyles.display).toBe('flex');
      expect(wrapperStyles.alignItems).toBe('center');
      expect(wrapperStyles.justifyContent).toBe('center');

      console.log(
        `✅ Wrapper ${i + 1}: ${wrapperStyles.width} × ${wrapperStyles.height}, aspect-ratio: ${wrapperStyles.aspectRatio}`
      );
    }
  });
});
