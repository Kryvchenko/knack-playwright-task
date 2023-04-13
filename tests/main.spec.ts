import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import { randomColor } from '../utils/helpers';

test.describe('Builder and the Live App testing', () => {
  test.beforeEach( async ({ page }) => {
    const login = new LoginPage(page);
  
    await login.goTo('https://builder.knack.com/kryo/warehouse-manager/log=in');
    await login.addEmailToInput('amzkryvchenko@gmail.com');
    await login.addPwdToInput('P@$Fs7whDS#f55V');
    await login.clickSubmitBtn();
  
    const name = await login.getPageTitle();
    expect(name).toBe('Warehouse Manager');
  });

  test('Icon Color for Display Rules', async ({page, context}) => { 
    await page.locator('[data-cy="nav-pages"]').click();
    await page.locator('[data-cy="Admin > Inventory"]').click();
    await page.locator('[data-cy="Inventory"]').click();
    await page.locator('.blur').click();
    for (const element of await page.locator('.dragdrop-adjacent').all()) {
        if(await element.textContent() === 'On-Hand') {
          element.click();
        }
    }
    const color = randomColor();
    await page.locator('.kn-input.kn-colorInput_input').fill(color);
    await page.locator('.save').click();
    
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), 
      page.locator('.accessMenu_directLink').click()
    ])
    console.log(await newPage.title());
    await newPage.locator('#email').fill('admin@test.com');
    await newPage.locator('#password').fill('test');
    await newPage.locator('input[value="Sign In"]').click();
    const style = await newPage.locator('td .fa.fa-warning').first().getAttribute('style');
    expect(style).toContain(color);
    console.log(style);
   })
})
