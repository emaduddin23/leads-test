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
├── playwright.config.js
├── package.json
└── .gitignore
```

## Flow Per User

1. Navigate to `leads-test.uapp.uk`
2. Enter email & password, click **Log in**
3. Wait for dashboard to load, take a screenshot
4. Click profile button (top-right), click **Sign out**
5. Take a screenshot after logout

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

- **No inheritance, no `super`** — every page class composes its dependencies via `this.base` and `this.locators`
- **Locators as properties** — selectors are plain properties, not method calls (`this.locators.emailInput.fill(...)`)
- **Semantic selectors** — uses `getByRole`, `getByPlaceholder`, and shadcn `data-slot` attributes instead of brittle CSS chains

## Tech Stack

- [Playwright](https://playwright.dev) — browser automation
- shadcn/ui / Radix UI — target application framework
- Node.js, CommonJS

---

&copy; 2026 **emaduddin23**
