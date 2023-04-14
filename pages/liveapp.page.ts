import { Page } from '@playwright/test';

export default class LiveAppPage {
  page : Page
  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  getUserEmailInput = () =>  this.page.locator('#email');

  getUserPwdInput = () =>  this.page.locator('#password');

  getSignInBtn = () =>  this.page.locator('input[value="Sign In"]');

  getWarningIcon = () =>  this.page.locator('td .fa.fa-warning');
  
  getLiveAppLink = () => this.page.locator('.accessMenu_directLink');

  getLiveAppInventoryLink = () => this.page.locator('li [href="#inventory2"]');

  // Methods
  async loginToLiveApp(username: string, password: string) {
    await this.getUserEmailInput().fill(username);
    await this.getUserPwdInput().fill(password);
    await this.getSignInBtn().click({ force: true });
  }

  async getWarningIconStyleAtr() {
   return await this.getWarningIcon().first().getAttribute('style');
  }

  async navigateToInventory() {
    await this.getLiveAppInventoryLink().first().click();
  }
}
