import { expect, type Page } from '@playwright/test'
import { BasePage } from './BasePage.js'

export class ReportsPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  async goto() {
    await this.open('/')
    await this.page.getByRole('button', { name: /reports/i }).click()
  }

  async filterByStatus(status: string) {
    await this.page.getByLabel('Status').selectOption(status)
  }

  async search(query: string) {
    await this.page.getByLabel('Search customer or type').fill(query)
  }

  async expectTableVisible() {
    await expect(this.page.getByTestId('report-table')).toBeVisible()
  }
}
