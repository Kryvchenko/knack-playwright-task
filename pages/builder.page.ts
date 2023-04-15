import { Page } from '@playwright/test';

export default class BuilderPage {
  page : Page
  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  getNavPages = () =>  this.page.locator('[data-cy="nav-pages"]');

  getAdminInventory = () =>  this.page.locator('[data-cy="Admin > Inventory"]');

  getInventory = () =>  this.page.locator('[data-cy="Inventory"]');

  getViewWindow = () =>  this.page.locator('.blur');

  getViewTitle = () =>  this.page.locator('.kn-title');

  getCoulumnTitle = () =>  this.page.locator('.dragdrop-adjacent');

  getActionsDropDown = () =>  this.page.locator('.display-rule-actions > select');

  getColorInput = () =>  this.page.locator('.kn-input.kn-colorInput_input');

  getSaveBtn = () =>  this.page.locator('.save');

  getIcon = () => this.page.locator('.selected-icon');

  // Methods
  async navigateToWarehouseInventoryView() {
     await this.getNavPages().click();
     await this.getAdminInventory().click();
     await this.getInventory().click();
     await this.getViewWindow().click();
  }

  async changeColor(color: string) {
    await this.getActionsDropDown().selectOption('icon');
    await this.getColorInput().fill(color);
    await this.getSaveBtn().click();
  }
}
