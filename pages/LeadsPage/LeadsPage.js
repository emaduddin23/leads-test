const BasePage = require('../BasePage/BasePage');
const LeadsPageLocators = require('./LeadsPage.locators');

class LeadsPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.locator = new LeadsPageLocators(page);
  }

  async screenshot(filename) {
    return this.base.screenshot(filename);
  }

  async navigateToLeads() {
    await this.locator.leadsLink.click();
    await this.page.waitForTimeout(2000);
    await this.locator.breadcrumb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }

  async isBreadcrumbVisible() {
    await this.locator.breadcrumb.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
    return await this.locator.breadcrumb.isVisible();
  }

  async openAddLeadDialog() {
    await this.locator.addLeadBtn.click();
    await this.locator.addLeadDialog.waitFor({ state: 'visible', timeout: 5000 });
  }

  async isAddLeadDialogVisible() {
    return await this.locator.addLeadDialog.isVisible();
  }

  async fillFirstName(firstName) {
    await this.locator.firstNameInput.click();
    await this.locator.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.locator.lastNameInput.click();
    await this.locator.lastNameInput.fill(lastName);
  }

  async fillEmail(email) {
    await this.locator.emailInput.click();
    await this.locator.emailInput.fill(email);
  }

  async fillPhone(phone) {
    await this.locator.phoneInput.fill(phone);
  }

  async selectCountry(country) {
    await this.locator.countryCombobox.click();
    await this.locator.countryOption(country).click();
  }

  async selectSource(source) {
    await this.locator.sourceCombobox.click();
    await this.locator.sourceOption(source).waitFor({ state: 'visible', timeout: 5000 });
    await this.locator.sourceOption(source).click();
  }

  async submitAddLead() {
    await this.locator.submitLeadBtn.click();
    await this.locator.addLeadDialog.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(800);
  }
}

module.exports = LeadsPage;
