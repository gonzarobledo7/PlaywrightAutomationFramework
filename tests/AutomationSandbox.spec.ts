import {test, Browser, Page, expect} from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;

    let textToSend = 'Estoy aprendiendo Playwright';

    test.describe('Acciones en el Automation Sandbox', () => {
        test('Click en Boton ID Dinamico', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Tester', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo hacer click en el boton con ID Dinamico', async () => {
                await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click({force:true});
                await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
            })
        })

        test('Lleno un campo de texto en Automation Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo ingresar texto en el campo "Un Aburrido Texto"', async () => {
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto'}), 'El campo de texto no admite edicion').toBeEditable();
                await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(textToSend);
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto'}), 'El campo de texto no admite edicion').toHaveValue(textToSend);
            })
            
        }) 

        test('Puedo seleccionar y desleccionar un checkbox en el Sandbox', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar el checkbox de Pasta', async () => {
                await page.getByLabel('Pasta 🍝').check();
                await expect(page.getByLabel('Pasta 🍝')).toBeChecked();
            })

            await test.step('Puedo desseleccionar el checkbox de Pasta', async () => {
                await page.getByLabel('Pasta 🍝').check();
                await page.getByLabel('Pasta 🍝').uncheck();
                await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked();
            })
            
        })

        test('Puedo Seleccionar Radio Buttons', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar Radio Buttons para NO ', async () => {
                await page.getByRole('radio', { name: 'No' }).check();
                await page.pause();
            })
            
            
        })


        test('Probando seleccionar un deporte', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Selecciono un deporte del dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Fútbol');
            })
            
        })

        test('Probando seleccionar un dia de la semana', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar un dia de la Semana', async () => {
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Martes' }).click();
            })
            
            
        })
        
        
        
        
        
    })
    
})();