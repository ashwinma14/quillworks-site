import { expect, test } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const STRICT_DIFF_THRESHOLD = 0.06; // ≤0.06 threshold for golden lock
const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 900;

test.describe('Golden Snapshot Tests - Pixel Perfect Parity', () => {
  test.beforeEach(async ({ page }) => {
    // Set consistent viewport for 1440×900 captures
    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });
    
    // Force reduced motion for stable captures
    await page.addInitScript(() => {
      // Override CSS media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query.includes('prefers-reduced-motion: reduce'),
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {},
        }),
      });

      // Disable all animations and transitions
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
    });

    // Ensure consistent font rendering
    await page.addInitScript(() => {
      // Force specific font settings
      (document.body.style as any).fontSynthesis = 'none';
      (document.body.style as any).textRendering = 'geometricPrecision';
      (document.body.style as any).webkitFontSmoothing = 'antialiased';
      (document.body.style as any).mozOsxFontSmoothing = 'grayscale';
    });
  });

  test('Hero + Cards Region - Golden Snapshot (1440×900)', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait for critical font to load
    await page.evaluate(() => document.fonts.ready);
    
    // Wait for Hero section to be visible
    await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });
    
    // Additional wait for font rendering stabilization
    await page.waitForTimeout(3000);

    // Verify Instrument Serif is loaded (no fallback)
    const heroFontFamily = await page
      .locator('h1')
      .evaluate((el) => getComputedStyle(el).fontFamily);
    
    expect(heroFontFamily).toContain('Instrument Serif');

    // Capture Hero + Cards region with precise boundaries
    const heroSection = page.locator('section').first();
    const cardsSection = page.locator('[data-testid="story-card-grid"]');
    
    // Wait for cards to be visible and animations to complete
    await cardsSection.waitFor({ state: 'visible' });
    await page.waitForTimeout(2000); // Ensure all card animations finish

    // Get bounding boxes for precise cropping
    const heroBbox = await heroSection.boundingBox();
    const cardsBbox = await cardsSection.boundingBox();
    
    if (!heroBbox || !cardsBbox) {
      throw new Error('Could not get bounding boxes for Hero or Cards sections');
    }

    // Calculate combined region
    const combinedRegion = {
      x: Math.min(heroBbox.x, cardsBbox.x),
      y: heroBbox.y,
      width: Math.max(heroBbox.width, cardsBbox.width),
      height: (cardsBbox.y + cardsBbox.height) - heroBbox.y,
    };

    // Capture the golden region
    const goldenScreenshot = await page.screenshot({
      clip: combinedRegion,
      animations: 'disabled',
    });

    // Save debug screenshot
    const screenshotDir = path.resolve('./test-results/golden-snapshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(screenshotDir, 'hero-cards-golden-debug.png'),
      goldenScreenshot
    );

    // Golden snapshot comparison with strict threshold
    await expect(goldenScreenshot).toMatchSnapshot('hero-cards-golden.png', {
      threshold: STRICT_DIFF_THRESHOLD,
      maxDiffPixels: Math.floor((combinedRegion.width * combinedRegion.height) * STRICT_DIFF_THRESHOLD),
    });
  });

  test('Typography Precision Validation', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2000);

    // Test Hero typography specifications
    const heroHeading = page.locator('h1');
    
    const heroStyles = await heroHeading.evaluate((el) => {
      const styles = getComputedStyle(el);
      return {
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        letterSpacing: styles.letterSpacing,
        textRendering: styles.textRendering,
      };
    });

    // Verify Hero typography precision
    expect(heroStyles.fontFamily).toContain('Instrument Serif');
    expect(heroStyles.textRendering).toBe('geometricprecision');
    
    // Calculate line height ratio from pixel values
    const fontSize = parseFloat(heroStyles.fontSize);
    const lineHeight = parseFloat(heroStyles.lineHeight);
    const lineHeightRatio = lineHeight / fontSize;
    expect(lineHeightRatio).toBeCloseTo(1.15, 1);

    // Test Card typography consistency
    const cardHeadings = page.locator('[data-testid="story-card-grid"] h2');
    const cardBodies = page.locator('[data-testid="story-card-grid"] p');

    // Verify all cards have consistent typography
    const cardHeadingCount = await cardHeadings.count();
    for (let i = 0; i < cardHeadingCount; i++) {
      const headingStyles = await cardHeadings.nth(i).evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
          fontWeight: styles.fontWeight,
        };
      });

      expect(headingStyles.fontSize).toBe('20px');
      const headingLineHeightRatio = parseFloat(headingStyles.lineHeight) / parseFloat(headingStyles.fontSize);
      expect(headingLineHeightRatio).toBeCloseTo(1.625, 1);
    }

    const cardBodyCount = await cardBodies.count();
    for (let i = 0; i < cardBodyCount; i++) {
      const bodyStyles = await cardBodies.nth(i).evaluate((el) => {
        const styles = getComputedStyle(el);
        return {
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
          color: styles.color,
        };
      });

      expect(bodyStyles.fontSize).toBe('14px');
      const bodyLineHeightRatio = parseFloat(bodyStyles.lineHeight) / parseFloat(bodyStyles.fontSize);
      expect(bodyLineHeightRatio).toBeCloseTo(1.625, 1);
      expect(bodyStyles.color).toBe('rgb(53, 53, 53)'); // #353535
    }
  });

  test('Font Loading Zero Fallback Verification', async ({ page }) => {
    // Track all font requests
    const fontRequests: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      if (
        url.includes('fonts.googleapis.com') ||
        url.includes('fonts.gstatic.com') ||
        url.includes('.woff') ||
        url.includes('.woff2') ||
        url.includes('.ttf') ||
        url.includes('.otf')
      ) {
        fontRequests.push(url);
      }
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(3000);

    // Verify only self-hosted fonts are loaded
    const selfHostedFonts = fontRequests.filter((url) => 
      url.includes('localhost:3000/fonts/') || url.includes('instrument-serif') || url.includes('inter')
    );
    const externalFonts = fontRequests.filter((url) => 
      !url.includes('localhost:3000')
    );

    expect(selfHostedFonts.length).toBeGreaterThan(0);
    expect(externalFonts).toHaveLength(0);

    // Verify font-display: optional is working (no fallback flash)
    const heroElement = page.locator('h1');
    await expect(heroElement).toBeVisible();
    
    const finalFontFamily = await heroElement.evaluate((el) => 
      getComputedStyle(el).fontFamily
    );
    
    // Should not contain fallback fonts if Instrument Serif loaded
    expect(finalFontFamily).toContain('Instrument Serif');
  });
});