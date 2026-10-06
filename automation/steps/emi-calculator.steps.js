import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { calculateEmi } from '../utils/emiCalculator.js'
import { EMICalculatorPage } from '../pages/EMICalculatorPage.js'

Given('I am on the EMI calculator page', async function () {
  const calculatorPage = new EMICalculatorPage(globalThis.page)
  await calculatorPage.goto()
})

When('I enter a loan amount of {float}', async function (amount) {
  await globalThis.page.getByLabel('Loan Amount').fill(String(amount))
})

When('I enter an interest rate of {float}', async function (rate) {
  await globalThis.page.getByLabel('Interest Rate').fill(String(rate))
})

When('I enter a tenure of {int} years', async function (years) {
  await globalThis.page.getByLabel('Tenure (Years)').fill(String(years))
})

When('I click the calculate button', async function () {
  await globalThis.page.getByRole('button', { name: /calculate emi/i }).click()
})

Then('the displayed EMI should match the independently calculated EMI', async function () {
  const calculatorPage = new EMICalculatorPage(globalThis.page)
  const uiEmi = await calculatorPage.getDisplayedEmi()
  const principal = Number((await globalThis.page.getByLabel('Loan Amount').inputValue()) || '0')
  const rate = Number((await globalThis.page.getByLabel('Interest Rate').inputValue()) || '0')
  const years = Number((await globalThis.page.getByLabel('Tenure (Years)').inputValue()) || '0')
  const expected = calculateEmi(principal, rate, years).emi
  expect(Math.abs(uiEmi - expected)).toBeLessThanOrEqual(5)
})

Then('the EMI chart should be visible', async function () {
  await expect(globalThis.page.locator('[data-testid="loan-chart"] canvas')).toBeVisible()
})

Then('the chart values should be greater than zero', async function () {
  const values = await globalThis.page.evaluate(() => {
    const chartData = window.__loanChartData
    return chartData?.datasets?.[0]?.data ?? []
  })
  expect(Array.isArray(values)).toBeTruthy()
  expect(values.every((value) => Number(value) > 0)).toBeTruthy()
})
