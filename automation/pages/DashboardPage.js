import { expect } from '@playwright/test'
import { BasePage } from './BasePage.js'

export class DashboardPage extends BasePage {
  async goto() {
    await this.open('/')
  }

  async expectDashboardVisible() {
    await expect(this.page.getByRole('heading', { name: /loan portfolio dashboard/i })).toBeVisible()
    await expect(this.page.getByText('Total Loans')).toBeVisible()
    await expect(this.page.getByText('Total Loan Amount')).toBeVisible()
    await expect(this.page.getByText('Average EMI')).toBeVisible()
    await expect(this.page.getByText('Total Interest')).toBeVisible()
  }

  async expectChartVisible() {
    const chartCanvas = this.page.locator('[data-testid="loan-chart"] canvas')
    await expect(chartCanvas).toBeVisible()
  }
}
