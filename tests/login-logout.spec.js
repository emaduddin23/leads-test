const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage/LoginPage');
const DashboardPage = require('../pages/DashboardPage/DashboardPage');
const users = require('../test-data/users.json');

const accounts = process.env.TEST_EMAIL
  ? [{ email: process.env.TEST_EMAIL, password: process.env.TEST_PASSWORD }]
  : users;

for (const user of accounts) {
  test(`Login, dashboard, logout flow for ${user.email}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const sanitizedEmail = user.email.replace(/[@.]/g, '_');

    await loginPage.login(user.email, user.password);
    await dashboardPage.waitForDashboard();

    // Verify dashboard loaded
    expect(await dashboardPage.isDashboardVisible()).toBeTruthy();
    expect(await dashboardPage.verifyDashboardNav()).toBeTruthy();
    expect(await dashboardPage.verifyWelcomeEmail(user.email)).toBeTruthy();

    // Verify Total leads widget
    expect(await dashboardPage.verifyTotalLeads()).toBeTruthy();

    // Date filter: switch to Last Month then back to This Month
    await dashboardPage.selectDateFilter('Last Month');
    await dashboardPage.selectDateFilter('This Month');

    // Manage dashboards
    expect(await dashboardPage.manageDashboards()).toBeTruthy();
    await dashboardPage.doneEditing();

    // Screenshot then logout
    await dashboardPage.screenshot(`${sanitizedEmail}_dashboard.png`);

    await dashboardPage.logout();

    await page.waitForTimeout(2000);
    await loginPage.screenshot(`${sanitizedEmail}_after_logout.png`);
  });
}
