import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 60000,  // Increased timeout to 60 seconds
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 30000,  // Action timeout of 30 seconds
  },
  reporter: [['html'], ['list']],
};

export default config;