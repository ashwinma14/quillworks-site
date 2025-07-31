// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1, // run serially: avoids port fights
  timeout: 60_000, // per-test timeout
  use: { baseURL: 'http://localhost:3000' },

  // Configure visual comparison settings
  expect: {
    toHaveScreenshot: {
      threshold: 0.15, // Allow 15% pixel difference for visual regression tests
      maxDiffPixels: 150000, // Allow up to 150k different pixels
    },
  },

  webServer: {
    command: 'npm run start:test',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000, // wait up to 3 min for Next.js production build
  },
});
