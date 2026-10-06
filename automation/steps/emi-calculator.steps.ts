import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { calculateEmi } from '../utils/emiCalculator.js'
import { EMICalculatorPage } from '../pages/EMICalculatorPage.js'

const page = (globalThis as { page?: any }).page

Given('I am on the EMI calculator page', async function () {
  const calculatorPage = new EMICalculatorPage(page)
  await calculatorPage.goto()
})

When('I enter a loan amount of {float}', async function (amount: number) {
  await page.getByLabel('Loan Amount').fill(String(amount))
})

When('I enter an interest rate of {float}', async function (rate: number) {
  await page.getByLabel('Interest Rate').fill(String(rate))
})

When('I enter a tenure of {int} years', async function (years: number) {
  await page.getByLabel('Tenure (Years)').fill(String(years))
})

When('I click the calculate button', async function () {
  await page.getByRole('button', { name: /calculate emi/i }).click()
})

Then('the displayed EMI should match the independently calculated EMI', async function () {
  const emicalculatorPage = new EMICalculatorPage(page)
  const uiEmi = await emicalculatorPage.getDisplayedEmi()
  const principal = Number((await page.getByLabel('Loan Amount').inputValue()) || '0')
  const rate = Number((await page.getByLabel('Interest Rate').inputValue()) || '0')
  const years = Number((await page.getByLabel('Tenure (Years)').inputValue()) || '0')
  const expected = calculateEmi(principal, rate, years).emi
  expect(Math.abs(uiEmi - expected)).toBeLessThanOrEqual(5)
})

Then('the EMI chart should be visible', async function () {
  await expect(page.locator('[data-testid="loan-chart"] canvas')).toBeVisible()
})

Then('the chart values should be greater than zero', async function () {
  const values = await page.evaluate(() => {
    const chartData = (window as any).__loanChartData
    return chartData?.datasets?.[0]?.data ?? []
  })
  expect(Array.isArray(values)).toBeTruthy()
  expect(values.every((value: number) => Number(value) > 0)).toBeTruthy()
})
