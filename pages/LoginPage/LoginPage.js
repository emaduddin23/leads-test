const BasePage = require('../BasePage/BasePage');
const LoginPageLocators = require('./LoginPage.locators');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.locator = new LoginPageLocators(page);
  }

  async screenshot(filename) {
    return this.base.screenshot(filename);
  }

  async login(email, password) {
    await this.base.navigate('/');
    await this.locator.emailInput.fill(email);
    await this.locator.passwordInput.fill(password);
    await this.locator.submitButton.click();
  }
}

module.exports = LoginPage;
