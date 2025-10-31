const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('button[type="submit"]');
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.emailError = this.emailInput.locator('~[error-for], ~ [role="alert"]');
    this.passwordError = this.passwordInput.locator('~ [error-for], ~ [role="alert"]'); 
  }

  async goto() {
    await this.page.goto('/login');
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
    await this.emailInput.blur();
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async assertPageLoaded() {
    await expect(this.page).toHaveURL(/.*login/);
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
    await expect(this.signInButton).toBeEnabled();
    await expect(this.forgotPasswordLink).toBeVisible();
  }

  async assertEmailFilled(email) {
    await expect(this.emailInput).toHaveValue(email);
  }

  async assertPasswordFilled(password) {
    await expect(this.passwordInput).toHaveValue(password);
  }

  async assertEmailErrorVisible() {
    await expect(this.emailError).toBeVisible({ timeout: 3000 });
  }

  async assertPasswordErrorVisible() {
    await expect(this.passwordError).toBeVisible({ timeout: 3000 });
  }

  async assertForgotPasswordNavigated() {
    await expect(this.page).toHaveURL(/.*request-password-reset/);
  }
}

module.exports = { LoginPage };
