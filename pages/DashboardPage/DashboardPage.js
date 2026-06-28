const BasePage = require('../BasePage/BasePage');
const DashboardPageLocators = require('./DashboardPage.locators');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.locator = new DashboardPageLocators(page);
  }

  async screenshot(filename) {
    return this.base.screenshot(filename);
  }

  async waitForDashboard() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    await this.locator.heading.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }

  async isDashboardVisible() {
    return await this.locator.heading.isVisible();
  }

  async getWelcomeEmail() {
    const text = await this.locator.welcomeText.innerText();
    const match = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    return match ? match[1].toLowerCase() : '';
  }

  async verifyWelcomeEmail(expectedEmail) {
    const welcomeEmail = await this.getWelcomeEmail();
    return welcomeEmail === expectedEmail.toLowerCase();
  }

  async logout() {
    await this.locator.profileTrigger.click();
    await this.page.waitForTimeout(600);
    await this.locator.signOutMenuItem.click();
  }
}

module.exports = DashboardPage;
