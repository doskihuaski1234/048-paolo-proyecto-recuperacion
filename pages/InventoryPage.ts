import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly title: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly productImages: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );
    this.title = page.locator('[data-test="title"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.productImages = page.locator('.inventory_item_img img');
  }

  async expectToBeOnInventoryPage() {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.title).toHaveText('Products');
  }

  async getProductCount(): Promise<number> {
    await expect(this.inventoryItems.first()).toBeVisible();
    return await this.inventoryItems.count();
  }

  async addProductByName(productName: string) {
    await this.inventoryItems
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async addProductBySuffix(suffix: string) {
    await this.page.locator(`[data-test="add-to-cart-${suffix}"]`).click();
  }

  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  // Reto 3
  async removeProductByName(productName: string) {
    const product = this.page.locator('.inventory_item', {
      hasText: productName
    });

    await product.locator('button', { hasText: 'Remove' }).click();
  }

  async expectCartBadgeHidden() {
    await expect(this.cartBadge).toHaveCount(0);
  }
}