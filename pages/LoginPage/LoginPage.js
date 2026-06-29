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

  async loginViaSSO(email, password) {
    await this.page.goto('http://sso-test.uapp.uk/?redirect=https%3A%2F%2Fleads-test.uapp.uk&logout=true&pathname=%2F&key=29122b20a62844e19ebd91a2c751608f');
    await this.page.waitForLoadState('networkidle');
    await this.locator.emailTextbox.fill(email);
    await this.locator.passTextbox.fill(password);
    await this.locator.loginBtn.click();
  }
}

module.exports = LoginPage;
