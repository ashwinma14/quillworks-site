// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1, // run serially: avoids port fights
  timeout: 60_000, // per-test timeout
  use: { baseURL: 'http://localhost:3000' },

  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // wait up to 2 min for Next.js
  },
});
