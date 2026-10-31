import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const baseURL = process.env.QA_BASE_URL || 'https://alpha.boothmarketing.co.uk'
const outDir = 'qa-artifacts'
await fs.mkdir(outDir, { recursive: true })

const viewports = [
  { name: 'mobile-320', width: 320, height: 812 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'tablet-768', width: 768, height: 1024 },
]
const routes = [
  '/',
  '/what-we-automate',
  '/prototypes',
  '/how-it-works',
  '/about',
  '/automation-audit',
  '/faq',
]

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function checkMenu(page, width, label) {
  const button = page.getByRole('button', { name: 'Open menu' })
  await button.waitFor({ state: 'visible' })
  await button.click()

  const panel = page.getByRole('dialog', { name: 'Site navigation' })
  await panel.waitFor({ state: 'visible' })
  const state = await panel.evaluate((element) => {
    const style = getComputedStyle(element)
    const box = element.getBoundingClientRect()
    return {
      position: style.position,
      opacity: style.opacity,
      visibility: style.visibility,
      left: box.left,
      right: box.right,
      top: box.top,
      bottom: box.bottom,
      backgroundColor: style.backgroundColor,
      backgroundImage: style.backgroundImage,
    }
  })

  assert(state.position === 'absolute', `${label}: drawer positioning is incorrect`)
  assert(state.opacity === '1' && state.visibility === 'visible', `${label}: drawer is not visible`)
  assert(state.left >= -1 && state.right <= width + 1, `${label}: drawer exceeds viewport width`)
  assert(state.top <= 1 && state.bottom >= 600, `${label}: drawer does not cover the page height`)
  assert(state.backgroundImage !== 'none' || !state.backgroundColor.endsWith(', 0)'), `${label}: drawer background is transparent`)

  for (const name of ['What We Automate', 'Prototypes', 'How It Works', 'About', 'Request an Automation Audit']) {
    await panel.getByRole('link', { name, exact: true }).waitFor({ state: 'visible' })
  }

  await panel.getByRole('link', { name: 'What We Automate', exact: true }).click()
  await page.waitForURL('**/what-we-automate')
  await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' })
  assert(new URL(page.url()).pathname === '/what-we-automate', `${label}: navigation did not open the selected page`)
  await page.screenshot({ path: `${outDir}/${label}-navigation.png`, fullPage: true })
}

async function checkViewport(browser, viewport) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))

  for (const route of routes) {
    const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 })
    assert(response?.ok(), `${viewport.name} ${route}: request failed with ${response?.status()}`)
    await page.getByRole('heading', { level: 1 }).first().waitFor({ state: 'visible' })
    const geometry = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }))
    assert(geometry.document <= viewport.width + 1, `${viewport.name} ${route}: horizontal document overflow`)
    assert(geometry.body <= viewport.width + 1, `${viewport.name} ${route}: horizontal body overflow`)
  }

  await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.getByRole('heading', { name: /Your team is spending hours/ }).waitFor({ state: 'visible' })
  await checkMenu(page, viewport.width, viewport.name)
  assert(errors.length === 0, `${viewport.name}: browser errors: ${errors.join(' | ')}`)
  await context.close()
}

const browser = await chromium.launch({ headless: true })
try {
  for (const viewport of viewports) await checkViewport(browser, viewport)
  console.log('RESPONSIVE_NAV_PASS: mobile and tablet page geometry, drawer visibility, links, and navigation verified')
} finally {
  await browser.close()
}
