import { test, expect } from '../fixtures';

test.describe('RF3 - Carrito de compras', () => {
  test.beforeEach(async ({ sesionEstandar, inventoryPage }) => {
    void sesionEstandar;
    await inventoryPage.addProductBySuffix('sauce-labs-backpack');
    await inventoryPage.addProductBySuffix('sauce-labs-bike-light');
  });

  test('Dos productos muestran Remove y insignia 2', {
    tag: ['@smoke', '@regression'],
  }, async ({ page, inventoryPage }) => {
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toHaveText('Remove');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('Carrito lista los dos productos con cantidad y precio', {
    tag: ['@regression'],
  }, async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.itemNames).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await expect(cartPage.itemQuantities).toHaveText(['1', '1']);
    await expect(cartPage.itemPrices).toHaveText(['$29.99', '$9.99']);
  });

  test('Quitar la luz deja un producto y insignia 1', {
    tag: ['@regression'],
  }, async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.goToCart();
    await cartPage.removeItemBySuffix('sauce-labs-bike-light');
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Continue Shopping conserva dos productos', {
    tag: ['@regression'],
  }, async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });
});
