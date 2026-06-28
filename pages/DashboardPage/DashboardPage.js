const BasePage = require('../BasePage/BasePage');
const DashboardPageLocators = require('./DashboardPage.locators');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.locators = new DashboardPageLocators(page);
  }

  async screenshot(filename) {
    return this.base.screenshot(filename);
  }

  async waitForDashboard() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    await this.locators.heading.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }

  async verifyOnDashboard() {
    return /leads-test/i.test(this.page.url());
  }

  async logout() {
    await this.locators.profileTrigger.click();
    await this.page.waitForTimeout(600);
    await this.locators.signOutMenuItem.click();
  }
}

module.exports = DashboardPage;
