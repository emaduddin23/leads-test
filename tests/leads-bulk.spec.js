const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage/LoginPage');
const DashboardPage = require('../pages/DashboardPage/DashboardPage');
const LeadsPage = require('../pages/LeadsPage/LeadsPage');
const users = require('../test-data/users.json');
const leads = require('../test-data/leads.json');

const accounts = process.env.TEST_EMAIL
  ? [{ email: process.env.TEST_EMAIL, password: process.env.TEST_PASSWORD }]
  : users;

for (const user of accounts) {
  test(`Add ${leads.length} leads for ${user.email}`, async ({ page }) => {
    test.setTimeout(300000);

    // Log console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.log('[CONSOLE ERROR]', msg.text());
    });

    // Track lead API calls with response body
    page.on('response', async (res) => {
      if (res.url().includes('/api/app/lead') && res.request().method() === 'POST') {
        const body = await res.text().catch(() => '');
        console.log(`[API] POST lead → status: ${res.status()} body: ${body.substring(0, 300)}`);
      }
    });

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const leadsPage = new LeadsPage(page);

    await loginPage.loginViaSSO(user.email, user.password);
    await dashboardPage.waitForDashboard();
    expect(await dashboardPage.verifyDashboardNav()).toBeTruthy();

    await leadsPage.navigateToLeads();
    expect(await leadsPage.isBreadcrumbVisible()).toBeTruthy();

    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      await leadsPage.openAddLeadDialog();
      await leadsPage.fillFirstName(lead.firstName);
      await leadsPage.fillLastName(lead.lastName);
      await leadsPage.fillEmail(lead.email);
      await leadsPage.fillPhone(lead.phone);
      await leadsPage.selectCountry(lead.country);
      await leadsPage.selectSource(lead.source);
      await leadsPage.submitAddLead();

      // Verify success toast
      const toast = page.getByText('Lead created');
      await expect(toast.first()).toBeVisible({ timeout: 5000 });
      console.log(`[OK] Lead ${i + 1}: ${lead.firstName} — toast confirmed`);

      // Verify lead appears in table
      await expect(page.getByText(lead.firstName).first()).toBeVisible({ timeout: 5000 });
      console.log(`[OK] Lead ${i + 1}: ${lead.firstName} — visible in table`);
    }

    expect(leadApiCalls).toBe(leads.length);
    console.log(`[DONE] ${leadApiCalls} API calls made, ${leads.length} leads verified`);
  });
}
