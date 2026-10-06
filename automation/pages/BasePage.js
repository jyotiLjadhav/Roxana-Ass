export class BasePage {
  constructor(page) {
    this.page = page
  }

  async open(path = '/') {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5173'
    await this.page.goto(`${baseUrl}${path}`)
  }
}
