# Leads Test — Playwright Automation

Automated login/logout flows for [leads-test.uapp.uk](https://leads-test.uapp.uk) using Playwright with Page Object Model — built to run against multiple email accounts from a single data file.

## Project Structure

```
leads-test/
├── pages/
│   ├── BasePage/
│   │   └── BasePage.js              # Shared utilities (navigate, screenshot)
│   ├── LoginPage/
│   │   ├── LoginPage.locators.js    # Login selectors
│   │   └── LoginPage.js             # Login actions
│   └── DashboardPage/
│       ├── DashboardPage.locators.js # Dashboard selectors
│       └── DashboardPage.js          # Dashboard actions (logout)
├── tests/
│   └── login-logout.spec.js         # Test spec — iterates over users.json
├── test-data/
│   └── users.json                   # Add emails & passwords here
├── screenshots/                     # Auto-generated on each run
├── .github/workflows/
│   └── playwright.yml               # CI/CD workflow
├── mcp.json                         # Playwright MCP config
├── playwright.config.js
├── package.json
└── .gitignore
```

## Flow Per User

1. Navigate to `leads-test.uapp.uk`
2. Enter email & password, click **Log in**
3. Wait for dashboard to load
4. Verify the **"Welcome back, <email>"** greeting matches the login email
5. Take a dashboard screenshot
6. Click profile button (top-right), click **Sign out**
7. Take an after-logout screenshot

## Setup

```powershell
npm install
npx playwright install chromium
```

## Run

| Command         | Description              |
|-----------------|--------------------------|
| `npm test`      | Headless                 |
| `npm run h`     | Headed (browser visible) |
| `npm run d`     | Headed + step debugger   |
| `npm run r`     | Open HTML report         |

## Add More Users

Edit `test-data/users.json`:

```json
[
  { "email": "user1@gmail.com", "password": "Pass123@" },
  { "email": "user2@gmail.com", "password": "Pass456@" }
]
```

Each user gets their own test iteration with separate screenshots.

## Design

- **Page-wise folders** — locators in one file, actions in another
- **No inheritance, no `super`** — each page class composes `BasePage` and its locators
- **Locator properties** — selectors defined as properties so usage is clean (`this.locator.emailInput.fill(...)`)
- **Semantic selectors** — uses `getByRole`, `getByPlaceholder`, and shadcn `data-slot` attributes instead of brittle CSS chains

## CI/CD (GitHub Actions)

[![Playwright Tests](https://github.com/emaduddin23/leads-test/actions/workflows/playwright.yml/badge.svg)](https://github.com/emaduddin23/leads-test/actions)

The workflow at `.github/workflows/playwright.yml` is triggered three ways:

| Trigger | When |
|---------|------|
| **Push** | Every push to `main` |
| **Schedule** | Daily at 6:00 AM UTC |
| **Manual** | Actions tab → Playwright Tests → Run workflow |

What it does:
1. Checks out the code
2. Installs Node.js 18 + dependencies
3. Installs Playwright Chromium with system deps
4. Runs `npm test` using `TEST_EMAIL` / `TEST_PASSWORD` secrets
5. Uploads `screenshots/` and `playwright-report/` as artifacts (always)

### Setup GitHub Secrets

Go to your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Name | Value |
|------|-------|
| `TEST_EMAIL` | `permtest@gmail.com` |
| `TEST_PASSWORD` | `Admin1212@` |

Once set, the CI uses secrets instead of `users.json` — no credentials exposed in the repo.

## Playwright MCP (AI Browser Control)

This project includes `mcp.json` for [Playwright MCP](https://github.com/microsoft/playwright-mcp).

With an MCP client (Cursor, Claude Desktop, etc.), you can control the browser using natural language like:

- "Go to leads-test.uapp.uk"
- "Log in with permtest@gmail.com"
- "Take a screenshot of the dashboard"
- "Click the profile menu and sign out"

## Tech Stack

- [Playwright](https://playwright.dev) — browser automation
- shadcn/ui / Radix UI — target application framework
- [Playwright MCP](https://github.com/microsoft/playwright-mcp) — AI browser control
- Node.js, CommonJS

---

&copy; 2026 **emaduddin23**
