import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Buscar' }).click();
await page.getByRole('combobox', { name: 'Buscar' }).fill('free range testers');
await page.getByRole('combobox', { name: 'Buscar' }).fill('free range testers');
await page.getByRole('dialog').locator('div').filter({ hasText: 'Accede a GoogleControla los' }).nth(1).press('Alt+ControlOrMeta+Tab');
//hay que crear a mano las assertions


});
