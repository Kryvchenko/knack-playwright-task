import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import { randomColor } from '../utils/helpers';
import { LOGIN_DETAILS, TEXT_CONTENT, TITLES, URLS } from '../constants/constants';
import BuilderPage from '../pages/builder.page';
import LiveAppPage from '../pages/liveapp.page';
import NavPage from '../pages/nav.page';

test.describe('Builder and the Live App testing', () => {
  test.beforeEach( async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(URLS.builder, LOGIN_DETAILS.email, LOGIN_DETAILS.password)
    const navTitle = await loginPage.getNavTitle();
    expect(navTitle).toBe(TITLES.warehouseManager);
  });

  test('Icon Color for Display Rules', async ({page, context}) => { 
    const navPage = new NavPage(page);
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
      const currentColor = await randomColor();
      await builderPage.changeColor(currentColor);
      const icon = await builderPage.getIcon();
      expect(icon).toBeVisible();
      return currentColor;
    });

    await test.step('Verify that icon color has been changed on the Live App page', async () => {
      const [newPage] = await Promise.all([
        context.waitForEvent('page'), 
        navPage.getLiveAppLink().click()
      ])
      const liveAppPage = new LiveAppPage(newPage);
      liveAppPage.loginToLiveApp(LOGIN_DETAILS.liveAppUsername, LOGIN_DETAILS.liveAppPwd);
      const style = await liveAppPage.getWarningIconStyleAtr();
      expect(style).toContain(color);
    });
   });
});
