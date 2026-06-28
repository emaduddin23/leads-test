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
    return text.split(', ')[1].split(' - ')[0].toLowerCase();
  }

  async verifyWelcomeEmail(expectedEmail) {
    const welcomeEmail = await this.getWelcomeEmail();
    return welcomeEmail === expectedEmail.toLowerCase();
  }

  async verifyDashboardNav() {
    await this.locator.dashboardLink.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
    return await this.locator.dashboardLink.isVisible();
  }

  async verifyTotalLeads() {
    await this.locator.totalLeads.waitFor({ state: 'visible', timeout: 5000 });
    return await this.locator.totalLeads.isVisible();
  }

  async openDateFilter() {
    await this.locator.dateFilter.click();
    return await this.locator.dateOption('Today').isVisible();
  }

  async selectDateFilter(option) {
    await this.locator.dateFilter.click();
    await this.locator.dateOption(option).click();
    await this.page.waitForTimeout(500);
  }

  async manageDashboards() {
    await this.locator.manageDashboardsBtn.click();
    return await this.locator.doneEditingBtn.isVisible();
  }

  async doneEditing() {
    await this.locator.doneEditingBtn.click();
  }

  async logout() {
    await this.locator.profileTrigger.click();
    await this.page.waitForTimeout(600);
    await this.locator.signOutMenuItem.click();
  }
}

module.exports = DashboardPage;
