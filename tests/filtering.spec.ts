import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import RecordsPage from '../pages/records.page';
import NavPage from '../pages/nav.page';
import LiveAppPage from '../pages/liveapp.page';
import { LOGIN_DETAILS, TEXT_CONTENT, TITLES, URLS } from '../constants/constants';

test.describe('Inventory page testing', () => {
  test.beforeEach( async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(URLS.builder, LOGIN_DETAILS.email, LOGIN_DETAILS.password)
    const navTitle = await loginPage.getNavTitle();
    expect(navTitle).toBe(TITLES.warehouseManager);
  });

  test('Filtering Inventory', async ({page, context}) => { 
    const recordsPage = new RecordsPage(page);
    const navPage = new NavPage(page);

    const recordsCount = await test.step('Verify the filter records on the Inventory object', async () => {
      await recordsPage.navigateToRecordsPageInventory();
      await recordsPage.filterRecords(TEXT_CONTENT.filterText);
      const numberOfRecords = await recordsPage.getRecordsCount();
      return numberOfRecords;
    });
    await test.step('Verify filtered records on the live app inventory tab', async () => {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), 
            navPage.getLiveAppLink().click()
          ])
        const liveAppPage = new LiveAppPage(newPage);
        
        liveAppPage.loginToLiveApp(LOGIN_DETAILS.liveAppUsername, LOGIN_DETAILS.liveAppPwd);
        await liveAppPage.navigateToInventory();
        await recordsPage.filterRecords(TEXT_CONTENT.filterText);
        const newRecordsCount = await recordsPage.getRecordsCount();
        expect(recordsCount).toEqual(newRecordsCount);
   });
});
});
