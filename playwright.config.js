import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',              
  timeout: 100 * 1000,              
  reporter: [
    ['line'],                     
    ['allure-playwright'],         
  ],
  use: {
    headless: false,               
    viewport: null, 
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure',    
    trace: 'on-first-retry',
    launchOptions: {
      args: ['--start-maximized'],
      slowMo: 2000,
    },
  },
});