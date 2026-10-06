import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ReportsPage } from '../pages/ReportsPage.js'

Given('I am on the reports page', async function () {
  const reportsPage = new ReportsPage(globalThis.page)
  await reportsPage.goto()
})

When('I apply the status filter Active', async function () {
  await globalThis.page.getByLabel('Status').selectOption('Active')
})

When('I search for customer name Priya', async function () {
  await globalThis.page.getByLabel('Search customer or type').fill('Priya')
})

Then('the filtered report should remain visible', async function () {
  await expect(globalThis.page.getByTestId('report-table')).toBeVisible()
  await expect(globalThis.page.getByText('Priya Nair')).toBeVisible()
})
