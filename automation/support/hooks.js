import { After, Before, setDefaultTimeout } from '@cucumber/cucumber'
import { chromium } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

setDefaultTimeout(30000)

let browser

Before(async function () {
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  globalThis.page = page
})

After(async function () {
  if (globalThis.page) {
    await globalThis.page.close()
  }
  if (browser) {
    await browser.close()
  }
})
