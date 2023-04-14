import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import { randomColor } from '../utils/helpers';
import { LOGIN_DETAILS, TEXT_CONTENT, TITLES, URLS } from '../constants/constants';
import BuilderPage from '../pages/builder.page';
import LiveAppPage from '../pages/liveapp.page';

test.describe('Builder and the Live App testing', () => {
  test.beforeEach( async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(URLS.builder, LOGIN_DETAILS.email, LOGIN_DETAILS.password)
    const navTitle = await loginPage.getNavTitle();
    expect(navTitle).toBe(TITLES.warehouseManager);
  });

  test('Icon Color for Display Rules', async ({page, context}) => { 
    const builderPage = new BuilderPage(page);
    await test.step('Verify navigation to Warehouse Inventory View', async () => {
      await builderPage.navigateToWarehouseInventoryView();
      const viewTitle = await builderPage.getViewTitle().innerText();
      expect(viewTitle).toBe(TITLES.warehouseInventory);
    });

    const color = await test.step('Verify change Display Rule Icon color to this random color', async () => {
       for (const element of await builderPage.getCoulumnTitle().all()) {
         if(await element.textContent() === TEXT_CONTENT.tableTitle) {
          element.click();
         }
      };
      const color = randomColor();
      builderPage.changeColor(color);
      const icon = await builderPage.getIcon();
      expect(icon).toBeVisible({timeout: 10000});
      return color;
    });

    await test.step('Verify that icon color has been changed on the Live App page', async () => {
      // const liveAppPage = new LiveAppPage(page);
      const [newPage] = await Promise.all([
        context.waitForEvent('page'), 
        builderPage.getLiveAppLink().click()
      ])
      // liveAppPage.loginToLiveApp('admin@test.com', 'test');
      await newPage.locator('#email').fill('admin@test.com');
      await newPage.locator('#password').fill('test');
      await newPage.locator('input[value="Sign In"]').click();
      const style = await newPage.locator('td .fa.fa-warning').first().getAttribute('style');
      expect(style).toContain(color);
    });
  
   })
})
