import { Page } from '@playwright/test';

export default class LoginPage {
  page : Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  getPageTitle = async () => await this.page.innerText('.appName');
  
  getEmailInput = () => this.page.locator('#email >> nth=1');

  getPasswordInput = () => this.page.locator('#password >> nth=1');

  getSubmitBtn = () => this.page.locator('input[type="submit"] >> nth=1');

  // Methods
  async goTo(url: string) {
    await this.page.goto(url);
  }

  async addEmailToInput(email: string) {
   await this.getEmailInput().type(email);
  }

  async addPwdToInput(password: string) {
    await this.getPasswordInput().fill(password);
  }

  async clickSubmitBtn() {
    await this.getSubmitBtn().click();
  }

}


