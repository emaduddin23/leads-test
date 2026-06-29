const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage/LoginPage');
const DashboardPage = require('../pages/DashboardPage/DashboardPage');
const LeadsPage = require('../pages/LeadsPage/LeadsPage');
const users = require('../test-data/users.json');

const accounts = process.env.TEST_EMAIL
  ? [{ email: process.env.TEST_EMAIL, password: process.env.TEST_PASSWORD }]
  : users;

for (const user of accounts) {
  test(`Add lead flow for ${user.email}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const leadsPage = new LeadsPage(page);

    // SSO Login
    await loginPage.loginViaSSO(user.email, user.password);
    await dashboardPage.waitForDashboard();

    expect(await dashboardPage.verifyDashboardNav()).toBeTruthy();

    // Navigate to Leads
    await leadsPage.navigateToLeads();

    expect(await leadsPage.isBreadcrumbVisible()).toBeTruthy();

    // Open Add Lead dialog
    await leadsPage.openAddLeadDialog();

    expect(await leadsPage.isAddLeadDialogVisible()).toBeTruthy();

    // Fill in lead details
    await leadsPage.fillFirstName('test');
    await leadsPage.fillLastName('watson');
    await leadsPage.fillEmail('watson@gmail.com');
    await leadsPage.fillPhone('+447856231147');
    await leadsPage.selectCountry('United Kingdom');
    await leadsPage.selectSource('Other');

    // Submit
    await leadsPage.submitAddLead();
  });
}
