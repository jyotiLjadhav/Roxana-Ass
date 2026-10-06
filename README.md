# Fullstack + QA Automation Assessment

## Overview
This repository implements Section A of the Streamhub LTD assessment: a professional Loan EMI Dashboard, a Playwright + Cucumber UI automation suite, JSONPlaceholder API tests, and SQLite-based SQL validation scenarios.

## Assessment Choice
Section A only was implemented.

## Technology Stack
- Frontend: React, Vite, JavaScript, CSS, Chart.js
- Automation: Playwright, Cucumber, Page Object Model, Gherkin
- API: Playwright APIRequest against JSONPlaceholder
- SQL: SQLite with deterministic seed data and SQL outputs
- AI: Locator repair documentation and reflection on AI-assisted development

## Application Features
- Dashboard summary cards for total loans, total loan amount, average EMI, and total interest
- EMI calculator with validation for empty, zero, negative, and non-numeric input
- Standard reducing-balance EMI formula implementation
- Professional reports view with search and status filtering
- Chart-backed portfolio data
- Accessible labels, headings, form controls, and semantic layout

## Architecture
The app is intentionally simple and reliable:

- React UI with a single-page dashboard and three views: Dashboard, EMI Calculator, and Reports
- Shared EMI formula logic in the app and an independent test version for assertion validation
- Playwright Cucumber framework with separate feature files, step definitions, and page objects
- JSONPlaceholder API checks for success and edge cases
- SQLite queries executed to validate the round-trip transaction pattern and IPL-style streak logic

## Project Structure

```text
fullstack-qa-automation-assessment/
├── api-tests/
│   └── jsonplaceholder.spec.ts
├── automation/
│   ├── features/
│   ├── pages/
│   ├── steps/
│   ├── support/
│   └── utils/
├── sql/
│   ├── schema.sql
│   ├── ipl_schema.sql
│   ├── scenario1_round_trip.sql
│   ├── scenario2_ipl_streak.sql
│   ├── run_queries.py
│   └── results/
├── src/
├── .env.example
├── .gitignore
├── AI-SELF-HEALING.md
├── cucumber.cjs
├── playwright.config.ts
├── package.json
├── README.md
└── vite.config.js
```

## Prerequisites
- Node.js 20+
- npm
- Python 3 for the SQLite validation script

## Installation
```bash
npm install
```

## Environment Configuration
Create a local `.env` file from the example:

```bash
cp .env.example .env
```

The project expects:

```env
BASE_URL=http://localhost:5173
JSONPLACEHOLDER_BASE_URL=https://jsonplaceholder.typicode.com
```

Do not commit secrets. The `.env` file is ignored by Git.

## Running the Application
```bash
npm run dev
```
The app will run at `http://localhost:5173`.

## Running Playwright Tests
UI tests with Cucumber:

```bash
npm run ui:test
```

API tests:

```bash
npm run api:test
```

Combined suite:

```bash
npm run test
```

## Running SQL Tests
```bash
python sql/run_queries.py
```
This generates the result files under the `sql/results` folder.

## Test Results
Fresh verification output:

- UI automation: 4 scenarios passed, 30 steps passed
- API automation: 3 tests passed
- Build: successful production build
- Lint: passed

Generated evidence is available in:

- `playwright-report/index.html`
- `test-results/`
- `sql/results/`

## Screenshots
The Playwright suite produces failure screenshots and traces in the `test-results` directory. The HTML report is generated in `playwright-report`.

## Locator Strategy
The automation favours resilient selectors:

- `getByRole()`
- `getByLabel()`
- `getByText()`
- `getByPlaceholder()`
- `data-testid`

The project intentionally keeps brittle selectors in the AI self-healing documentation rather than using them in the main working flow.

## AI Self-Healing Approach
The project includes a detailed locator repair guide in `AI-SELF-HEALING.md`.

It explains:
- detection of locator failure
- candidate extraction
- example AI prompt structure
- validation before applying a patch
- safe use of a repaired locator

## Claude Code Reflection
### How it was used
Claude Code was used to help with layout structure, Playwright/Cucumber architecture, debugging the test harness, refining selectors, and writing the SQL validation logic and documentation.

### What worked well
- quick scaffolding of the page architecture
- clarity around Playwright + Cucumber organization
- good suggestions for resilient locators and validation flows
- SQL window-function patterns for the IPL streak logic

### What did not work
- initial assumptions about API status codes must be verified against live behavior
- some brittle selector ideas were corrected after real execution
- TypeScript configuration for the Cucumber flow was replaced with a simpler JS setup to keep the test runner reliable

### Human verification
All code was reviewed, executed, and corrected based on evidence from the actual test output. Nothing was accepted blindly.

## SQL Approach
This project uses SQLite with deterministic seed data.

- Round-trip detection checks whether account A sends a payment to account B and B sends a similar amount back to A within 24 hours and within a 10% difference threshold.
- The IPL scenario checks for 30+ runs in at least three consecutive qualifying matches using window functions and grouped streak logic.

The output files are stored in `sql/results` and were generated by running `python sql/run_queries.py`.

## Known Limitations
- JSONPlaceholder is a mock API and does not enforce strict validation rules like a production backend.
- Some API edge cases accept invalid payloads, so the tests document actual observed behavior instead of assuming a strict validation contract.

## Future Improvements
- Add richer loan analytics such as amortization tables and downloadable CSV reports
- Expand the test suite with invalid-input automation scenarios
- Add DB integration with MySQL for production-like data validation
- Extend AI self-healing with a small proof-of-concept prompt runner

## GitHub Readiness
The repository is structured for GitHub submission with environment configuration, a `.gitignore`, generated reports, and no secrets committed.
