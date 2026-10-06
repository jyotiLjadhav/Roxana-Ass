import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { DashboardPage } from '../pages/DashboardPage.js'

const page = (globalThis as { page?: any }).page

type StepContext = { page: any }

Given('I am on the dashboard page', async function (this: StepContext) {
  const dashboardPage = new DashboardPage(page)
  await dashboardPage.goto()
})

Then('the dashboard heading should be visible', async function () {
  await expect(page.getByRole('heading', { name: /loan portfolio dashboard/i })).toBeVisible()
})

Then('the summary cards should be visible', async function () {
  await expect(page.getByText('Total Loans')).toBeVisible()
  await expect(page.getByText('Total Loan Amount')).toBeVisible()
  await expect(page.getByText('Average EMI')).toBeVisible()
  await expect(page.getByText('Total Interest')).toBeVisible()
})

Then('the chart should be visible', async function () {
  const dashboardPage = new DashboardPage(page)
  await dashboardPage.expectChartVisible()
})
