import { test, expect } from '../fixtures';
import { users } from '../test-data/users';

test.describe('RF5 - Defectos conocidos de problem_user', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(users.problem.username, users.problem.password);
    await inventoryPage.expectToBeOnInventoryPage();
  });

  test('DEF-001 - Las seis imagenes deben ser distintas', {
    tag: '@defecto',
    annotation: { type: 'defecto', description: 'DEF-001: problem_user muestra la misma imagen en todos los productos.' },
  }, async ({ page, inventoryPage }, testInfo) => {
    test.fail(true, 'DEF-001 permanece abierto');
    await testInfo.attach('defecto-001.png', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
    const sources = await inventoryPage.productImages.evaluateAll((images) =>
      images.map((image) => (image as HTMLImageElement).src),
    );
    expect(new Set(sources).size).toBe(6);
  });

  test('DEF-002 - Name Z to A debe invertir el catalogo', {
    tag: '@defecto',
    annotation: { type: 'defecto', description: 'DEF-002: el selector no cambia el orden en problem_user.' },
  }, async ({ page, inventoryPage }, testInfo) => {
    test.fail(true, 'DEF-002 permanece abierto');
    await inventoryPage.sortBy('za');
    await testInfo.attach('defecto-002.png', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
    await expect(inventoryPage.productNames.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });

  test('DEF-003 - Bolt T-Shirt debe agregar al carrito', {
    tag: '@defecto',
    annotation: { type: 'defecto', description: 'DEF-003: el boton Bolt no responde en problem_user.' },
  }, async ({ page, inventoryPage }, testInfo) => {
    test.fail(true, 'DEF-003 permanece abierto');
    await inventoryPage.addProductBySuffix('sauce-labs-bolt-t-shirt');
    await testInfo.attach('defecto-003.png', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('DEF-004 - Datos del formulario deben conservarse', {
    tag: '@defecto',
    annotation: { type: 'defecto', description: 'DEF-004: al completar el formulario, el apellido aparece en el nombre.' },
  }, async ({ page, inventoryPage, cartPage, checkoutPage }, testInfo) => {
    test.fail(true, 'DEF-004 permanece abierto');
    await inventoryPage.addProductBySuffix('sauce-labs-backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('Ana', 'Perez', '01001');
    await testInfo.attach('defecto-004.png', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
    await expect(checkoutPage.firstNameInput).toHaveValue('Ana');
    await expect(checkoutPage.lastNameInput).toHaveValue('Perez');
  });
});
