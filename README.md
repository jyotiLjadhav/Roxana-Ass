# Fullstack + QA Automation Assessment

## 🚀 Project Overview

This project is a complete implementation of **Section A – Web Application + UI Automation** for the Fullstack + QA Automation Assessment.

The solution includes:

- 📊 Interactive Loan Dashboard
- 🧮 EMI calculation and validation
- 📈 Dynamic chart visualization
- 🔍 Input-driven report/detail view
- 🧪 Playwright + Cucumber UI automation
- 🔗 JSONPlaceholder API automation
- 🗄️ SQL analytical scenarios
- 🤖 AI-assisted self-healing locator approach
- 📋 Playwright HTML test reporting
- 📸 Test execution evidence and screenshots

The project is designed with a focus on **maintainability, reusable automation, dynamic locators, independent validation, and clean project architecture**.

---

# 🎯 Assessment Objective

The goal of this project is to demonstrate the ability to:

1. Build a functional web application.
2. Automate user workflows using Playwright.
3. Validate calculated results independently.
4. Test charts and dynamic UI elements.
5. Perform API boundary and negative testing.
6. Solve analytical SQL scenarios.
7. Apply AI-assisted techniques for resilient test automation.
8. Document the implementation and execution process clearly.

---

# 🏗️ Application Overview

The application is a **Loan Dashboard** containing:

### Dashboard

Displays summarized loan information such as:

- Loan amount
- Interest rate
- Loan tenure
- Monthly EMI
- Total interest
- Total repayment

### EMI Calculator

Users can enter:

- Principal amount
- Interest rate
- Loan tenure

The application dynamically calculates the expected EMI and related values.

### Reports

The report section allows users to interact with the calculated data using input/filter controls.

### Charts

The application provides a visual representation of the underlying loan data.

The chart is validated through automation to ensure that:

- It is visible.
- It renders correctly.
- It contains meaningful/non-zero data.

---

# 🧮 EMI Calculation

The application uses the standard EMI formula:

```text
EMI = P × r × (1 + r)^n
      ---------------------
       (1 + r)^n - 1
```

Where:

```text
P = Principal loan amount
r = Monthly interest rate
n = Number of monthly installments
```

The automation independently calculates the expected value and compares it with the value displayed by the application.

A zero-interest scenario is also handled separately.

---

# 🧪 Automation Framework

The automation framework uses:

- **Playwright**
- **Cucumber**
- **TypeScript**
- **Page Object Model**
- **Environment-based configuration**

The framework follows a structured architecture instead of using a single plain test script.

### Automation flow

```text
Feature
   ↓
Step Definitions
   ↓
Page Objects
   ↓
Playwright
   ↓
Web Application
```

---

# 📁 Project Structure

```text
fullstack-qa-automation-assessment/
│
├── api-tests/
│   └── jsonplaceholder.spec.ts
│
├── automation/
│   ├── features/
│   ├── pages/
│   ├── steps/
│   ├── support/
│   └── utils/
│
├── sql/
│   ├── schema.sql
│   ├── ipl_schema.sql
│   ├── scenario1_round_trip.sql
│   ├── scenario2_ipl_streak.sql
│   ├── run_queries.py
│   └── results/
│
├── src/
│
├── public/
│
├── .env.example
├── .gitignore
├── AI-SELF-HEALING.md
├── cucumber.cjs
├── playwright.config.ts
├── package.json
├── vite.config.js
├── tsconfig.json
└── README.md
```

---

# ⚙️ Prerequisites

Install the following before running the project:

- Node.js 20+
- npm
- Python 3

Verify:

```powershell
node --version
npm --version
python --version
```

---

# 🚀 Quick Start

## 1. Clone the repository

```powershell
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

```powershell
cd fullstack-qa-automation-assessment
```

## 2. Install dependencies

```powershell
npm install
```

## 3. Install Playwright browser

```powershell
npx playwright install chromium
```

## 4. Configure environment

Create `.env` from `.env.example`:

```powershell
copy .env.example .env
```

Example:

```env
BASE_URL=http://localhost:5173
JSONPLACEHOLDER_BASE_URL=https://jsonplaceholder.typicode.com
```

---

# ▶️ Run the Application

Start the Vite development server:

```powershell
npm run dev -- --host 0.0.0.0
```

Open the URL displayed by Vite.

Usually:

```text
http://localhost:5173
```

If port `5173` is already occupied, Vite may automatically use another available port such as:

```text
http://localhost:5174
```

Always use the URL shown in the terminal.

---

# 🧪 Run UI Automation

Open a second terminal and run:

```powershell
npm run ui:test
```

The UI automation validates:

- Dashboard loading
- Navigation
- User input
- EMI calculation
- Independent expected-value validation
- Report functionality
- Chart visibility
- Non-zero chart data

---

# 🔗 Run API Tests

Run:

```powershell
npm run api:test
```

The API tests use:

```text
https://jsonplaceholder.typicode.com/posts
```

The following boundary cases are covered:

### 1. Excessively long title

Validates how the API behaves when an unusually large title is submitted.

### 2. Unsupported special characters

Validates handling of unusual/special-character input.

### 3. Missing required field

Tests a payload where `userId` is omitted.

> JSONPlaceholder is a mock API and may accept payloads that a production API would reject. Therefore, the tests document and validate the **actual observed API behavior** rather than assuming a `400` response.

The primary safety check is that invalid input does not result in an unexpected server-side `5xx` failure.

---

# 🧪 Run Complete Test Suite

Run both UI and API tests:

```powershell
npm run test
```

---

# 📊 View Playwright Report

After test execution:

```powershell
npm run report
```

This opens the Playwright HTML report containing:

- Test status
- Execution details
- Screenshots
- Traces/evidence where configured
- Failure information

---

# 🗄️ SQL Validation

The project contains two analytical SQL scenarios.

## Scenario 1 – Round-Trip Transfers

The query identifies transactions where:

```text
A → B
B → A
```

and verifies that:

- The transactions occur within 24 hours.
- The reversed amounts are within 10% of each other.

The implementation uses a self-join approach.

Run:

```powershell
python sql/run_queries.py
```

Results are generated under:

```text
sql/results/
```

---

## Scenario 2 – IPL Scoring Streak

The query identifies players who scored:

```text
30+ runs
```

in at least:

```text
3 consecutive matches
```

The result contains:

- Player name
- Streak start date

The implementation uses SQL window-function techniques to identify consecutive match sequences.

---

# 🤖 AI Self-Healing Automation

The project includes:

```text
AI-SELF-HEALING.md
```

This document demonstrates an approach for repairing stale or broken locators using AI assistance.

The workflow is:

```text
Broken Locator
      ↓
Failure Detection
      ↓
DOM / Accessibility Context
      ↓
AI Analysis
      ↓
Candidate Locator
      ↓
Validation
      ↓
Safe Locator Update
```

The project intentionally includes several incorrect/brittle locators for demonstration purposes.

The AI-assisted approach focuses on semantic locators such as:

```text
getByRole()
getByLabel()
getByText()
getByTestId()
```

rather than relying on fragile positional selectors.

---

# 📍 Locator Strategy

The automation prioritizes resilient locators.

### Preferred

```typescript
page.getByRole()
page.getByLabel()
page.getByText()
page.getByTestId()
```

### Avoided

```text
nth()
deep CSS selectors
absolute XPath
DOM-position-dependent selectors
```

The objective is to make tests more resistant to UI layout changes.

---

# 📋 Assessment Coverage

| Requirement | Implementation |
|---|---|
| A1 Web Application | ✅ |
| Dashboard | ✅ |
| Input-driven report | ✅ |
| Dynamic chart | ✅ |
| A2 Playwright Automation | ✅ |
| Page Object Model | ✅ |
| Cucumber feature files | ✅ |
| Dynamic locators | ✅ |
| Independent calculation validation | ✅ |
| Chart validation | ✅ |
| A3 API Automation | ✅ |
| Negative/boundary API tests | ✅ |
| A4 SQL Scenario 1 | ✅ |
| A4 SQL Scenario 2 | ✅ |
| AI Self-Healing | ✅ |
| Test reporting | ✅ |
| README documentation | ✅ |

---

# 📊 Test Results

Test results should be updated after the latest execution.

Example:

```text
UI Automation
✓ 4 scenarios passed
✓ 30 steps passed

API Automation
✓ 3 tests passed

SQL Validation
✓ Round-trip query executed
✓ IPL streak query executed

Application
✓ Successfully launched in browser
```

Playwright evidence is available through:

```text
playwright-report/
```

> The numbers above should reflect the latest actual test execution before submission.

---

# 🔄 Reopen and Run Again

After closing VS Code, terminals, or the application:

### Terminal 1

```powershell
cd "C:\Users\bizwi\Roxana\fullstack-qa-automation-assessment"
```

```powershell
npm install
```

```powershell
npm run dev -- --host 0.0.0.0
```

### Terminal 2

```powershell
cd "C:\Users\bizwi\Roxana\fullstack-qa-automation-assessment"
```

Run everything:

```powershell
npm run test
```

Or run separately:

```powershell
npm run ui:test
```

```powershell
npm run api:test
```

Open the report:

```powershell
npm run report
```

---

# 📸 Submission Evidence

The submission includes test evidence through:

- Playwright HTML report
- Terminal execution output
- Screenshots
- SQL result files
- Application execution

Relevant files:

```text
playwright-report/
sql/results/
AI-SELF-HEALING.md
README.md
```

---

# 🧠 Claude Code / AI Usage Reflection

AI tools were used throughout the development and automation process rather than only for initial project scaffolding.

AI assistance was used for:

- Project structure design
- Playwright/Cucumber framework implementation
- Page Object development
- Locator strategy
- Test scenario creation
- API boundary-case analysis
- SQL query development
- Debugging
- Documentation
- AI self-healing locator analysis

The generated suggestions were reviewed, executed, and validated against the application before being included in the final implementation.

### What worked well

- Faster framework setup
- Improved locator suggestions
- Faster debugging
- Better test coverage ideas
- Assistance with SQL/window-function logic
- Improved documentation

### What required manual validation

- Application-specific selectors
- Expected calculation values
- API behavior
- Test execution results
- Environment configuration
- Final locator reliability

AI was treated as an **engineering assistant**, while actual execution and validation remained part of the development process.

---

# 🔐 Security & Configuration

Sensitive configuration should not be committed.

The following should remain local:

```text
.env
```

Only the example configuration should be committed:

```text
.env.example
```

No API keys, passwords, or other secrets should be stored in the repository.

---

# ⚠️ Limitations

- JSONPlaceholder is a mock API and does not behave exactly like a production validation API.
- The SQL scenarios use controlled assessment data.
- AI self-healing is demonstrated as a practical proof of concept rather than a fully autonomous production repair system.
- Test result counts may change when scenarios are added or modified.

---

# 🔮 Future Improvements

Potential future enhancements include:

- CI/CD integration using GitHub Actions
- Cross-browser execution
- Parallel test execution
- Dockerized test environment
- Database integration testing
- Allure reporting
- Automated AI locator repair pipeline
- Visual regression testing
- Accessibility testing

---

# 👩‍💻 Author

**Jyoti Jadhav**

BE Computer Science & Engineering

GitHub: `github.com/jyotiLjadhav`

LinkedIn: `linkedin.com/in/jyotiljadhav`

---

# ✅ Final Submission Checklist

Before submitting the repository:

- [ ] Application starts successfully
- [ ] UI tests pass
- [ ] API tests pass
- [ ] SQL queries execute successfully
- [ ] Playwright report generated
- [ ] Screenshots/evidence available
- [ ] `.env` is not committed
- [ ] `.env.example` is included
- [ ] AI-SELF-HEALING.md included
- [ ] README updated
- [ ] GitHub repository is accessible
- [ ] Latest test results are documented
- [ ] No unnecessary files/secrets committed

---

## 🎤 Interview Demonstration

During the demonstration, the project can be presented in this order:

**1. Start the application**

```powershell
npm run dev -- --host 0.0.0.0
```

**2. Show the dashboard**

Explain the summary metrics and chart.

**3. Demonstrate the EMI calculator**

Enter loan details and show the calculated result.

**4. Run UI automation**

```powershell
npm run ui:test
```

**5. Run API automation**

```powershell
npm run api:test
```

**6. Show the Playwright report**

```powershell
npm run report
```

**7. Explain SQL scenarios**

Show the two SQL queries and generated results.

**8. Explain AI self-healing**

Open:

```text
AI-SELF-HEALING.md
```

and explain the detection → AI analysis → candidate locator → validation workflow.

---

## 🏁 Conclusion

This project demonstrates an end-to-end approach to **full-stack development and QA automation**, combining a functional web application with structured Playwright automation, API validation, SQL analysis, resilient locator strategies, AI-assisted testing, and professional documentation.