class DashboardPageLocators {
  constructor(page) {
    this.page = page;
  }

  heading()         { return this.page.getByRole('heading', { name: 'Dashboard' }); }
  welcomeText()     { return this.page.locator('p:has-text("Welcome back")'); }
  profileTrigger()  { return this.page.locator('[data-slot="dropdown-menu-trigger"]'); }
  signOutMenuItem() { return this.page.getByRole('menuitem', { name: 'Sign out' }); }
}

module.exports = DashboardPageLocators;
