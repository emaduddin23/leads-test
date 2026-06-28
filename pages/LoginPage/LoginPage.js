const BasePage = require('../BasePage/BasePage');
const LoginPageLocators = require('./LoginPage.locators');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.locators = new LoginPageLocators(page);
  }

  async screenshot(filename) 
  { 
    
    return this.base.screenshot(filename); 

  }

  async login(email, password) {
    await this.base.navigate('/');
    await this.locators.emailInput.fill(email);
    await this.locators.passwordInput.fill(password);
    await this.locators.submitButton.click();
  }
}

module.exports = LoginPage;
