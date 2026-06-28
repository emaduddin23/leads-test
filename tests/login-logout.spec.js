const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
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

    expect(await dashboardPage.heading().isVisible()).toBeTruthy();
    expect(await dashboardPage.verifyWelcomeEmail(user.email)).toBeTruthy();

    await dashboardPage.screenshot(`${sanitizedEmail}_dashboard.png`);

    await dashboardPage.logout();

    await page.waitForTimeout(2000);
    await loginPage.screenshot(`${sanitizedEmail}_after_logout.png`);
  });
}
