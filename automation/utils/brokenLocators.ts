export const intentionallyBrokenLocators = [
  'page.locator("div.dashboard > div:nth-child(2) button")',
  "page.getByRole('button', { name: 'Calculate EMI', exact: true }).nth(99)",
  'page.locator("#root > div div:nth-child(3) label + input")',
  'page.locator("text=Total Loan Amount >> nth=0")',
  'page.locator("div[data-testid="loan-chart"] > div > canvas")',
]
