import { test, expect } from '../fixtures';
import { users } from '../test-data/users';
import { messages } from '../test-data/messages';

test.describe('RF1 - Inicio y cierre de sesion', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('Inicio de sesion valido', {
    tag: ['@smoke', '@regression'],
  }, async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectToBeOnInventoryPage();
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('Cuenta bloqueada', {
    tag: ['@regression'],
  }, async ({ loginPage, page }) => {
    await loginPage.login(users.locked.username, users.locked.password);
    await loginPage.expectLoginError(messages.locked);
    await expect(page).toHaveURL(/\/$/);
  });

  const invalidCases = [
    { title: 'usuario vacio', username: '', password: users.standard.password, message: messages.usernameRequired },
    { title: 'contrasena vacia', username: users.standard.username, password: '', message: messages.passwordRequired },
    { title: 'credenciales inexistentes', username: 'usuario_inexistente', password: 'clave_inexistente', message: messages.credentialsMismatch },
  ] as const;

  for (const invalidCase of invalidCases) {
    test(`Credenciales invalidas: ${invalidCase.title}`, {
      tag: ['@regression'],
    }, async ({ loginPage }) => {
      await loginPage.login(invalidCase.username, invalidCase.password);
      await loginPage.expectLoginError(invalidCase.message);
    });
  }

  test('Acceso directo al inventario sin sesion', {
    tag: ['@regression'],
  }, async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/\/$/);
    await loginPage.expectLoginError(messages.inventoryWithoutSession);
  });

  test('Cerrar sesion desde el menu', {
    tag: ['@smoke', '@regression'],
  }, async ({ loginPage, inventoryPage, menuPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectToBeOnInventoryPage();
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
    await menuPage.logoutFlow();
    await expect(loginPage.usernameInput).toHaveValue('');
  });
});
