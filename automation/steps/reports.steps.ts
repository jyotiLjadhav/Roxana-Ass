import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ReportsPage } from '../pages/ReportsPage.js'

const page = (globalThis as { page?: any }).page

Given('I am on the reports page', async function () {
  const reportsPage = new ReportsPage(page)
  await reportsPage.goto()
})

When('I apply the status filter Active', async function () {
  await page.getByLabel('Status').selectOption('Active')
})

When('I search for customer name Priya', async function () {
  await page.getByLabel('Search customer or type').fill('Priya')
})

Then('the filtered report should remain visible', async function () {
  await expect(page.getByTestId('report-table')).toBeVisible()
  await expect(page.getByText('Priya Nair')).toBeVisible()
})
