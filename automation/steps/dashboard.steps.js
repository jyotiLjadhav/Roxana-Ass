import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { DashboardPage } from '../pages/DashboardPage.js'

Given('I am on the dashboard page', async function () {
  const dashboardPage = new DashboardPage(globalThis.page)
  await dashboardPage.goto()
})

Then('the dashboard heading should be visible', async function () {
  await expect(globalThis.page.getByRole('heading', { name: /loan portfolio dashboard/i })).toBeVisible()
})

Then('the summary cards should be visible', async function () {
  await expect(globalThis.page.getByText('Total Loans')).toBeVisible()
  await expect(globalThis.page.getByText('Total Loan Amount')).toBeVisible()
  await expect(globalThis.page.getByText('Average EMI')).toBeVisible()
  await expect(globalThis.page.getByText('Total Interest')).toBeVisible()
})

Then('the chart should be visible', async function () {
  const dashboardPage = new DashboardPage(globalThis.page)
  await dashboardPage.expectChartVisible()
})
