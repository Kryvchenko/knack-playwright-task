import { Page } from '@playwright/test';

export default class LoginPage {
  page : Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  getNavTitle = async () => await this.page.innerText('.appName');
  
  getEmailInput = () => this.page.locator('#email >> nth=1');

  getPasswordInput = () => this.page.locator('#password >> nth=1');

  getSubmitBtn = () => this.page.locator('input[type="submit"] >> nth=1');
  
  async login(url: string, email: string, password: string) {
    await this.page.goto(url);
    await this.getEmailInput().type(email);
    await this.getPasswordInput().fill(password);
    await this.getSubmitBtn().click();
  }

}


