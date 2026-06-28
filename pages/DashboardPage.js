class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  // Locators
  heading()         { return this.page.getByRole('heading', { name: 'Dashboard' }); }
  welcomeText()     { return this.page.locator('p:has-text("Welcome back")'); }
  profileTrigger()  { return this.page.locator('[data-slot="dropdown-menu-trigger"]'); }
  signOutMenuItem() { return this.page.getByRole('menuitem', { name: 'Sign out' }); }

  // Actions
  async screenshot(filename) {
    await this.page.screenshot({ path: `screenshots/${filename}`, fullPage: true });
  }

  async waitForDashboard() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    await this.heading().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }

  async getWelcomeEmail() {
    const text = await this.welcomeText().innerText();
    const match = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    return match ? match[1].toLowerCase() : '';
  }

  async verifyWelcomeEmail(expectedEmail) {
    const welcomeEmail = await this.getWelcomeEmail();
    return welcomeEmail === expectedEmail.toLowerCase();
  }

  async logout() {
    await this.profileTrigger().click();
    await this.page.waitForTimeout(600);
    await this.signOutMenuItem().click();
  }
}

module.exports = DashboardPage;
