import { After, Before, setDefaultTimeout } from '@cucumber/cucumber'
import { chromium, type Browser, type Page } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

setDefaultTimeout(30000)

let browser: Browser

Before(async function () {
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  ;(globalThis as { page?: Page }).page = page
})

After(async function () {
  const page = (globalThis as { page?: Page }).page
  if (page) {
    await page.close()
  }
  if (browser) {
    await browser.close()
  }
})
