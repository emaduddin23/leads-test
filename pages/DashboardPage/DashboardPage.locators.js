class DashboardPageLocators {
  constructor(page) {
    this.heading         = page.getByRole('heading', { name: 'Dashboard' });
    this.welcomeText     = page.locator('p:has-text("Welcome back")');
    this.profileTrigger  = page.locator('[data-slot="dropdown-menu-trigger"]');
    this.signOutMenuItem = page.getByRole('menuitem', { name: 'Sign out' });
  }
}

module.exports = DashboardPageLocators;
