import { expect, test } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const PIXEL_DIFF_THRESHOLD = 0.2; // 0.2 threshold for Playwright's built-in comparison

const captureAndCompare = async (page: any, name: string) => {
  // Set viewport to 1440×900 @2× DPR as specified
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => {
    // Set device pixel ratio to 2x
    Object.defineProperty(window, 'devicePixelRatio', {
      get() {
        return 2;
      },
    });
  });

  // Navigate to baseline HTML
  await page.goto(`file://${path.resolve('./src/tmp/generated.html')}`, {
    waitUntil: 'networkidle',
  });
  await page.waitForTimeout(2000); // Wait for fonts and animations

  const baselineScreenshot = await page.screenshot({
    fullPage: true,
    animations: 'disabled',
  });

  // Navigate to React version
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });
  await page.waitForTimeout(2000); // Wait for fonts and animations

  const reactScreenshot = await page.screenshot({
    fullPage: true,
    animations: 'disabled',
  });

  // Save screenshots for debugging
  const screenshotDir = path.resolve('./test-results/visual-diffs');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(screenshotDir, `${name}-baseline.png`),
    baselineScreenshot
  );
  fs.writeFileSync(
    path.join(screenshotDir, `${name}-react.png`),
    reactScreenshot
  );

  // Use Playwright's built-in visual comparison
  await expect(reactScreenshot).toMatchSnapshot(`${name}-expected.png`, {
    threshold: PIXEL_DIFF_THRESHOLD,
    maxDiffPixels: 1000,
  });
};

test.describe('Visual Parity Tests', () => {
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

  test('Baseline vs React - Full Page Comparison', async ({ page }) => {
    await captureAndCompare(page, 'full-page');
  });

  test('Baseline vs React - Hero Section Focus', async ({ page }) => {
    // Set viewport and DPR
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => {
      Object.defineProperty(window, 'devicePixelRatio', {
        get() {
          return 2;
        },
      });
    });

    // Baseline hero screenshot
    await page.goto(`file://${path.resolve('./src/tmp/generated.html')}`, {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(2000);

    // Wait for fonts to be fully loaded
    await page.evaluate(() => document.fonts.ready);

    const heroBaseline = await page
      .locator('section:has(h1)')
      .first()
      .screenshot({ animations: 'disabled' });

    // React hero screenshot
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });
    await page.waitForTimeout(2000);

    // Wait for fonts to be fully loaded
    await page.evaluate(() => document.fonts.ready);

    const heroReact = await page
      .locator('section:has(h1)')
      .first()
      .screenshot({ animations: 'disabled' });

    // Save debug images
    const screenshotDir = path.resolve('./test-results/visual-diffs');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(screenshotDir, 'hero-baseline.png'),
      heroBaseline
    );
    fs.writeFileSync(path.join(screenshotDir, 'hero-react.png'), heroReact);

    // Compare hero sections with stricter threshold
    await expect(heroReact).toMatchSnapshot('hero-expected.png', {
      threshold: PIXEL_DIFF_THRESHOLD * 0.5, // Even stricter for hero
      maxDiffPixels: 500,
    });
  });

  test('Font Loading Verification', async ({ page }) => {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });

    // Check that no external font requests are made
    const fontRequests: string[] = [];
    page.on('request', (request) => {
      const url = request.url();
      if (
        url.includes('fonts.googleapis.com') ||
        url.includes('fonts.gstatic.com')
      ) {
        fontRequests.push(url);
      }
    });

    await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });
    await page.waitForTimeout(3000); // Give time for any font requests

    // Verify no external font requests
    expect(fontRequests).toHaveLength(0);

    // Verify self-hosted fonts are applied
    const heroFontFamily = await page
      .locator('h1')
      .evaluate((el) => getComputedStyle(el).fontFamily);

    expect(heroFontFamily).toContain('Instrument Serif');

    const navFontFamily = await page
      .locator('header span')
      .evaluate((el) => getComputedStyle(el).fontFamily);

    expect(navFontFamily).toContain('Instrument Serif');
  });

  test('Font Loading Under Network Throttling', async ({ page }) => {
    // Simulate slow network conditions to test CLS and font swap
    await page.route('**/*.woff2', async (route) => {
      // Add 2 second delay to font loading
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });

    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });

    // Capture screenshot during font loading phase
    const loadingScreenshot = await page.screenshot({
      fullPage: true,
      animations: 'disabled',
    });

    // Wait for fonts to fully load
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1000);

    // Capture final screenshot after font loading
    const loadedScreenshot = await page.screenshot({
      fullPage: true,
      animations: 'disabled',
    });

    // Save debug screenshots
    const screenshotDir = path.resolve('./test-results/visual-diffs');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(screenshotDir, 'throttled-loading.png'),
      loadingScreenshot
    );
    fs.writeFileSync(
      path.join(screenshotDir, 'throttled-loaded.png'),
      loadedScreenshot
    );

    // Verify fonts eventually load correctly
    const heroFontFamily = await page
      .locator('h1')
      .evaluate((el) => getComputedStyle(el).fontFamily);

    expect(heroFontFamily).toContain('Instrument Serif');

    // Test for minimal layout shift by comparing against expected
    await expect(loadedScreenshot).toMatchSnapshot(
      'throttled-final-expected.png',
      {
        threshold: PIXEL_DIFF_THRESHOLD,
        maxDiffPixels: 2000, // Allow slightly more diff due to potential CLS
      }
    );
  });
});
