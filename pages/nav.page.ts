import { Page } from '@playwright/test';

export default class NavPage {
  page : Page
  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  getLiveAppLink = () => this.page.locator('.accessMenu_directLink');
  
}


