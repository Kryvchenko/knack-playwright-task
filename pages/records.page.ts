import { Page } from '@playwright/test';

export default class RecordsPage {
  page : Page
  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  getRegordsPage = () =>  this.page.locator('[data-cy="nav-records"]');

  getWarehouseInvetory = () =>  this.page.locator('[data-cy="Object Warehouse Inventory"]');

  getAddFiltersBtn = () =>  this.page.locator('[data-cy="add-filters"]');

  getFiltersModalDropDown = () =>  this.page.locator('.field-list-field');

  getSubmitFiltersBtn = () =>  this.page.locator('[data-cy="save-filters"]');

  getRecordRows = () =>  this.page.locator('tr[data-cy="record-row"]');

  getRecordsCheckBox = () =>  this.page.locator('th input[type="checkbox"]');
  
 // Methods

  async navigateToRecordsPageInventory() {
    await this.getRegordsPage().click();
    await this.getWarehouseInvetory().click();
 };

  async getRecordsCount() {
    return await this.getRecordRows().count();
 };

  async filterRecords(filter: string) {
    await this.getAddFiltersBtn().click();
    await this.getFiltersModalDropDown().selectOption(filter);
    await this.getSubmitFiltersBtn().click();
    await this.getRecordsCheckBox().click();
  };
};


