import { expect } from '@playwright/test'
import { BasePage } from './BasePage.js'

export class EMICalculatorPage extends BasePage {
  async goto() {
    await this.open('/')
    await this.page.getByRole('button', { name: /emi calculator/i }).click()
  }

  async fillForm(principal, annualRate, years) {
    await this.page.getByLabel('Loan Amount').fill(String(principal))
    await this.page.getByLabel('Interest Rate').fill(String(annualRate))
    await this.page.getByLabel('Tenure (Years)').fill(String(years))
  }

  async calculate() {
    await this.page.getByRole('button', { name: /calculate emi/i }).click()
  }

  async getDisplayedEmi() {
    const valueText = await this.page.getByTestId('emi-result').locator('strong').innerText()
    return Number(valueText.replace(/[^0-9.-]+/g, ''))
  }

  async expectOutputVisible() {
    await expect(this.page.getByTestId('emi-result')).toBeVisible()
    await expect(this.page.getByTestId('total-interest')).toBeVisible()
    await expect(this.page.getByTestId('total-payment')).toBeVisible()
  }
}
