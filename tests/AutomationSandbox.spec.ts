import {test, Browser, Page, expect} from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';

(async () => {
    let browser: Browser;
    let page: Page;

    let textToSend = 'Estoy aprendiendo Playwright 🚀';

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

    })

        test('Lleno un campo de texto en Automation @Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Puedo ingresar texto en el campo "Un Aburrido Texto"', async () => {
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto'}), 'El campo de texto no admite edicion').toBeEditable();
                await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(textToSend);
                await expect(page.getByRole('textbox', { name: 'Un aburrido texto'}), 'El campo de texto no admite edicion').toHaveValue(textToSend);
            })
            
        }) 

        test('Puedo seleccionar y desleccionar un checkbox en el @Sandbox', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Puedo seleccionar el checkbox de Pasta', async () => {
                const sandbox = new SandboxPage(page);
                //await page.getByLabel('Pasta 🍝').check();
                await sandbox.checkPasta();
                await expect(sandbox.pastaCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();
            })

            await test.step('Puedo desseleccionar el checkbox de Pasta', async () => {
                await page.getByLabel('Pasta 🍝').check();
                await page.getByLabel('Pasta 🍝').uncheck();
                await expect(page.getByLabel('Pasta 🍝')).not.toBeChecked();
            })
            
        })

        test('Puedo Seleccionar Radio Buttons', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Puedo seleccionar Radio Buttons para NO ', async () => {
                await page.getByRole('radio', { name: 'No' }).check();
                await expect(page.getByRole('radio', { name: 'No' }), 'El radio button no se selecciono').toBeChecked();
            })
            
            
        })


        test('Los items del dropdown son los esperados', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball']
 
                for (let opcion of deportes) {
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    if (element) {
                        console.log(`La opción '${opcion}' está presente.`);
                    } else {
                        throw new Error(`La opción '${opcion}' no está presente.`);
                    }
                }
 
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

        test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
                //Saca una screen y la adjunta aunque el caso pase.
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })
                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
 
        })

        test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                //Creamos un arreglo con todos los valores de la tabla dinámica
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);
 
                //Hacemos una recarga para que cambien los valores
                await page.reload();
 
                //Creamos un segundo arreglo con los valores luego de la recarga
                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);
 
                //Validamos que todos los valores cambiaron para cada celda.
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
 
            })
 
 
        })

        test('Ejemplo de Sost Assertions', async ({ page }) => {
            await test.step('Dado que navego al sandbox de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
                await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
            })
        })

        test('Validando dentro de un popup', async ({ page }) => {
            await test.step('Dado que navego al sandbox', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Cuando hago click en el botón popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })
 
            await test.step('Puedo validar un elemento dentro del popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
 
            })
 
 
        })
        




        
        
        
        
        
    
    
})();