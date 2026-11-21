import { chromium, expect, firefox, webkit } from '@playwright/test';
import { resolve } from 'node:path';

const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';
const evidenceDirectory = resolve('capturas');

async function captureBrowser(browserName, browserType) {
  const browser = await browserType.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: { width: 1365, height: 900 },
    });

    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    if (browserName === 'chromium') {
      await page.screenshot({
        path: resolve(evidenceDirectory, '01-login-sauce-demo.png'),
        fullPage: true,
      });
    }

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL(/inventory\.html$/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await page.screenshot({
      path: resolve(evidenceDirectory, `inventario-${browserName}-sauce-demo.png`),
      fullPage: true,
    });

    if (browserName !== 'chromium') {
      return;
    }

    await page.locator('.shopping_cart_link').click();
    await page.waitForURL(/cart\.html$/);
    await page.screenshot({
      path: resolve(evidenceDirectory, '03-carrito-vacio-sauce-demo.png'),
      fullPage: true,
    });

    await page.locator('[data-test="continue-shopping"]').click();
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('.bm-menu').waitFor({ state: 'visible' });
    await page.screenshot({
      path: resolve(evidenceDirectory, '04-menu-sauce-demo.png'),
      fullPage: true,
    });

    await page.locator('#react-burger-cross-btn').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('Ana');
    await page.locator('[data-test="lastName"]').fill('Perez');
    await page.locator('[data-test="postalCode"]').fill('01001');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('.complete-header')).toHaveText(
      'Thank you for your order!',
    );
    await page.screenshot({
      path: resolve(evidenceDirectory, '05-compra-finalizada-sauce-demo.png'),
      fullPage: true,
    });
  } finally {
    await browser.close();
  }
}

for (const [browserName, browserType] of [
  ['chromium', chromium],
  ['firefox', firefox],
  ['webkit', webkit],
]) {
  await captureBrowser(browserName, browserType);
  console.log(`Sauce Demo evidence captured: ${browserName}`);
}
