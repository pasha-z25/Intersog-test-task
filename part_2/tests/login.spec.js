const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('LinkedIn Login Page', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.assertPageLoaded();

    await page.route('**/uas/login-submit', async route => {
      const errorResponse = {
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          loginError: true,
          errorMessage: 'These credentials do not match our records.',
          subErrorCode: 'INVALID_CREDENTIALS'
        })
      };
      await route.fulfill(errorResponse);
    });
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('should fill email and validate input', async () => {
    await loginPage.fillEmail('test@example.com');
    await loginPage.assertEmailFilled('test@example.com');
  });

  test('should fill password and validate input', async () => {
    await loginPage.fillPassword('securePassword123');
    await loginPage.assertPasswordFilled('securePassword123');
  });

  test('should validate invalid email format', async () => {
    await loginPage.fillEmail('invalid-email');
    await loginPage.fillPassword('validpass');
    await loginPage.clickSignIn();

    await expect(loginPage.emailError).toBeVisible();
  });

  test('should validate empty password', async () => {
    await loginPage.fillEmail('test@example.com');
    await loginPage.fillPassword('');
    await loginPage.clickSignIn();

    await expect(loginPage.passwordError).toBeVisible();
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await loginPage.clickForgotPassword();
    await page.waitForTimeout(2000);
    await loginPage.assertForgotPasswordNavigated();
  });
});
