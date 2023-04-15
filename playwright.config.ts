import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 5 * 60 * 1000, 
  use: {    
  headless: true,
  },
};

export default config;
