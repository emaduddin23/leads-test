const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage/LoginPage');
const DashboardPage = require('../pages/DashboardPage/DashboardPage');
const users = require('../test-data/users.json');

for (const user of users) {
  test(`Login, dashboard, logout flow for ${user.email}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const sanitizedEmail = user.email.replace(/[@.]/g, '_');

    await loginPage.login(user.email, user.password);
    await dashboardPage.waitForDashboard();
    expect(await dashboardPage.verifyOnDashboard()).toBeTruthy();

    await dashboardPage.screenshot(`${sanitizedEmail}_dashboard.png`);

    await dashboardPage.logout();

    await page.waitForTimeout(2000);
    await loginPage.screenshot(`${sanitizedEmail}_after_logout.png`);
  });
}
