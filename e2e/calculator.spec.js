import { test, expect } from '@playwright/test'

test('la calculadora suma correctamente 5 + 3', async ({ page }) => {
  // Abrimos la app (Playwright ya sabe la URL base por la configuración del proyecto)
  await page.goto('/')

  // Simulamos los clicks: 5, +, 3, =
  await page.getByRole('button', { name: '5', exact: true }).click()
  await page.getByRole('button', { name: '+', exact: true }).click()
  await page.getByRole('button', { name: '3', exact: true }).click()
  await page.getByRole('button', { name: '=', exact: true }).click()

  // Comprobamos que la pantalla muestra "8"
  await expect(page.locator('.calculator-screen')).toHaveText('8')
})
