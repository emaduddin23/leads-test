class DashboardPageLocators {
  constructor(page) {
    this.heading         = page.getByRole('heading', { name: 'Dashboard' });
    this.profileTrigger  = page.locator('[data-slot="dropdown-menu-trigger"]');
    this.signOutMenuItem = page.getByRole('menuitem', { name: 'Sign out' });
  }
}

module.exports = DashboardPageLocators;
