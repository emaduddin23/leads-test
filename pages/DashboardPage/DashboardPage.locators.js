class DashboardPageLocators {
  constructor(page) {
    this.page = page;
    this.heading              = page.getByRole('heading', { name: 'Dashboard' });
    this.welcomeText          = page.locator('p:has-text("Welcome back")');
    this.profileTrigger       = page.locator('[data-slot="dropdown-menu-trigger"]');
    this.signOutMenuItem      = page.getByRole('menuitem', { name: 'Sign out' });
    this.dashboardLink        = page.getByRole('link', { name: 'Dashboard' });
    this.totalLeads           = page.getByText('Total leads').first();
    this.dateFilter           = page.locator('[data-slot="select-trigger"]');
    this.manageDashboardsBtn  = page.getByRole('button', { name: 'Manage dashboards' });
    this.doneEditingBtn       = page.getByRole('button', { name: 'Done editing' });
    this.body                 = page.locator('body');
  }

  dateOption(name)  { return this.page.getByRole('option', { name }); }
}

module.exports = DashboardPageLocators;
