import { test, expect } from '@playwright/test';

test.describe('Navegacion a Free Range Testers home page', () => {
  test('Los links principales redirigen correctamente', async ({ page }) => {
    await test.step('Estando yo en la pagina web principal de Free Range Tester', async () => {
      await page.goto('https://www.freerangetesters.com');
      await expect(page).toHaveTitle(/Free Range Testers/i);
    });

    await test.step('Cuando hago click en "Cursos"', async () => {
      await page
        .locator('#page_header')
        .getByRole('link', { name: 'Cursos', exact: true })
        .click();
      await page.waitForURL('**/cursos');
    });

    await test.step('Soy redirigido a la seccion de titulo "Cursos"', async () => {
      await expect(page).toHaveTitle(/Cursos/i);
    });
  });
});
