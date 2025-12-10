import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['./custom-reporter.ts']],
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'MicroPlay Demo',
      use: { ...devices['Desktop Chrome'] },
    },

  ],

});
