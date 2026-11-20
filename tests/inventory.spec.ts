import { test, expect } from '../fixtures';
import { products, sortOptions } from '../test-data/products';

test.describe('RF2 - Catalogo y ordenamiento', () => {
  test.beforeEach(async ({ sesionEstandar }) => {
    void sesionEstandar;
  });

  test('Catalogo muestra seis productos completos', {
    tag: ['@smoke', '@regression'],
  }, async ({ inventoryPage }) => {
    await expect(inventoryPage.inventoryItems).toHaveCount(products.length);
    await expect(inventoryPage.productNames).toHaveText(products.map((product) => product.name));
    await expect(inventoryPage.productPrices).toHaveText(products.map((product) => product.price));
  });

  for (const option of ['az', 'za', 'lohi', 'hilo'] as const) {
    test(`Ordenamiento ${option}`, {
      tag: ['@regression'],
    }, async ({ inventoryPage }) => {
      await inventoryPage.sortBy(option);
      await expect(inventoryPage.productNames).toHaveText(sortOptions[option].names);
      await expect(inventoryPage.productPrices).toHaveText(sortOptions[option].prices);
    });
  }
});
