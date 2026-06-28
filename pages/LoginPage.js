class LoginPage {
  constructor(page) {
    this.page = page;
  }

  // Locators
  emailInput()    { return this.page.getByPlaceholder('name@email.com'); }
  passwordInput() { return this.page.getByPlaceholder('Password'); }
  submitButton()  { return this.page.getByRole('button', { name: 'Log in' }); }

  // Actions
  async screenshot(filename) {
    await this.page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
  }

  async login(email, password) {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.submitButton().click();
  }
}

module.exports = LoginPage;
