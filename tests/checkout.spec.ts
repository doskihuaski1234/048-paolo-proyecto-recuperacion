import { test, expect } from '../fixtures';
import { messages } from '../test-data/messages';

test.describe('RF4 - Compra completa', () => {
  test.beforeEach(async ({ sesionEstandar, inventoryPage, cartPage }) => {
    void sesionEstandar;
    await inventoryPage.addProductBySuffix('sauce-labs-backpack');
    await inventoryPage.addProductBySuffix('sauce-labs-bike-light');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  const missingFields = [
    { title: 'nombre vacio', firstName: '', lastName: 'Perez', postalCode: '01001', message: messages.firstNameRequired },
    { title: 'apellido vacio', firstName: 'Ana', lastName: '', postalCode: '01001', message: messages.lastNameRequired },
    { title: 'codigo postal vacio', firstName: 'Ana', lastName: 'Perez', postalCode: '', message: messages.postalCodeRequired },
  ] as const;

  for (const missingField of missingFields) {
    test(`Formulario rechaza ${missingField.title}`, {
      tag: ['@regression'],
    }, async ({ page, checkoutPage }) => {
      await checkoutPage.fillInformation(
        missingField.firstName,
        missingField.lastName,
        missingField.postalCode,
      );
      await checkoutPage.continueButton.click();
      await expect(checkoutPage.errorMessage).toHaveText(missingField.message);
      await expect(page).toHaveURL(/checkout-step-one/);
    });
  }

  test('Resumen calcula subtotal, impuesto y total', {
    tag: ['@smoke', '@regression'],
  }, async ({ page, checkoutPage }) => {
    await checkoutPage.fillInformation('Ana', 'Perez', '01001');
    await checkoutPage.continueButton.click();
    await expect(page).toHaveURL(/checkout-step-two/);

    const subtotal = 39.98;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;
    await expect(checkoutPage.subtotalLabel).toHaveText(`Item total: $${subtotal.toFixed(2)}`);
    await expect(checkoutPage.taxLabel).toHaveText(`Tax: $${tax.toFixed(2)}`);
    await expect(checkoutPage.totalLabel).toHaveText(`Total: $${total.toFixed(2)}`);
  });

  test('Finalizar compra adjunta evidencia y vuelve al catalogo', {
    tag: ['@smoke', '@regression'],
  }, async ({ page, inventoryPage, checkoutPage }, testInfo) => {
    await checkoutPage.fillInformation('Ana', 'Perez', '01001');
    await checkoutPage.continueButton.click();
    await checkoutPage.finishButton.click();
    await expect(checkoutPage.completeHeader).toHaveText(messages.orderTitle);
    await expect(checkoutPage.completeText).toHaveText(messages.orderText);

    await testInfo.attach('compra-finalizada.png', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });

    await checkoutPage.backHomeButton.click();
    await inventoryPage.expectToBeOnInventoryPage();
    await inventoryPage.expectCartBadgeHidden();
  });
});
