import { Page } from '@playwright/test'

export class BasePage {
  constructor(protected readonly page: Page) {}

  protected async open(path = '/') {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5173'
    await this.page.goto(`${baseUrl}${path}`)
  }
}
