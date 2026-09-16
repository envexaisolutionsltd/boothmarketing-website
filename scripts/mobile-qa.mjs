import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const baseURL = process.env.QA_BASE_URL || 'https://www.boothmarketing.co.uk'
const outDir = 'qa-artifacts'
await fs.mkdir(outDir, { recursive: true })

const mobileViewports = [
  { name: '320', width: 320, height: 812 },
  { name: '375', width: 375, height: 812 },
  { name: '390', width: 390, height: 844 },
  { name: '430', width: 430, height: 932 },
]
const wideViewports = [
  { name: '768-tablet', width: 768, height: 1024 },
  { name: '1024-tablet', width: 1024, height: 768 },
  { name: '1179-laptop', width: 1179, height: 820 },
  { name: '1180-desktop', width: 1180, height: 820 },
  { name: '1280-desktop', width: 1280, height: 800 },
  { name: '1440-desktop', width: 1440, height: 900 },
  { name: '1920-desktop', width: 1920, height: 1080 },
]
const publicRoutes = [
  '/',
  '/websites',
  '/work',
  '/how-it-works',
  '/about',
  '/website-audit',
  '/work/northstead-commercial-risk',
  '/work/purple-door-leeds',
  '/work/graft-haus-gym',
]

const instagramUA = 'Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro Build/TQ3A.230805.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.0.0 Mobile Safari/537.36 Instagram 320.0'
const currentHero = 'Your business has moved forward.'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function waitForProduction(page) {
  for (let attempt = 0; attempt < 18; attempt += 1) {
    try {
      await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 45000 })
      if (await page.locator('h1').filter({ hasText: currentHero }).count()) return
    } catch {}
    await page.waitForTimeout(10000)
  }
  throw new Error('Production did not expose the current B2B homepage within the QA wait window')
}

async function checkPageGeometry(page, width, label) {
  const metrics = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth }))
  assert(metrics.scrollWidth <= width + 1, `${label}: document horizontal overflow ${metrics.scrollWidth}px at ${width}px viewport`)
  assert(metrics.bodyScrollWidth <= width + 1, `${label}: body horizontal overflow ${metrics.bodyScrollWidth}px at ${width}px viewport`)
  const h1 = page.locator('h1').first()
  await h1.waitFor({ state: 'visible' })
  const h1Box = await h1.boundingBox()
  assert(h1Box && h1Box.x >= -1 && h1Box.x + h1Box.width <= width + 1, `${label}: H1 exceeds viewport`)
  const offenders = await page.evaluate((viewportWidth) => [...document.querySelectorAll('main button, main input, main select, main textarea, main article')].filter((el) => {
    const style = getComputedStyle(el)
    if (style.display === 'none' || style.visibility === 'hidden') return false
    const rect = el.getBoundingClientRect()
    return rect.width > 0 && (rect.left < -1 || rect.right > viewportWidth + 1)
  }).slice(0, 5).map((el) => ({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 80) })), width)
  assert(offenders.length === 0, `${label}: elements exceed viewport: ${JSON.stringify(offenders)}`)
}

async function checkOutcomeRows(page, width, label) {
  if (width >= 640) return
  const heading = page.getByRole('heading', { name: 'Not win design awards. Make a strong business easier to choose.' })
  await heading.waitFor({ state: 'visible' })
  const rows = heading.locator('xpath=following::div[contains(@class,"overflow-hidden")][1]/div')
  assert(await rows.count() === 5, `${label}: expected five homepage outcome rows`)
  for (let i = 0; i < 5; i += 1) {
    const row = rows.nth(i)
    const title = row.locator('p').nth(0)
    const copy = row.locator('p').nth(1)
    const titleBox = await title.boundingBox()
    const copyBox = await copy.boundingBox()
    assert(titleBox && copyBox, `${label}: outcome row ${i + 1} text is missing`)
    assert(titleBox.width >= 180 && copyBox.width >= 180, `${label}: outcome row ${i + 1} text column is too narrow`)
    assert(Math.abs(titleBox.x - copyBox.x) <= 2, `${label}: outcome row ${i + 1} title and copy do not share the content column`)
    assert(copyBox.y >= titleBox.y + titleBox.height - 1, `${label}: outcome row ${i + 1} copy does not stack below title`)
    assert(copyBox.x + copyBox.width <= width + 1, `${label}: outcome row ${i + 1} copy exceeds viewport`)
  }
}

async function checkRose(page, width, label) {
  const rose = page.getByAltText('Red rose')
  assert(await rose.count() === 1, `${label}: expected one homepage rose image`)
  if (width < 1180) assert(!(await rose.isVisible()), `${label}: rose must be hidden below 1180px`)
  else {
    await rose.waitFor({ state: 'visible' })
    const box = await rose.boundingBox()
    assert(box && box.width > 300 && box.height > 250, `${label}: desktop rose is too small or missing`)
    assert(box.x >= -1 && box.x + box.width <= width + 1, `${label}: desktop rose exceeds viewport`)
  }
}

async function checkMenu(page, width, label) {
  const menuButton = page.getByRole('button', { name: 'Open menu' })
  if (!(await menuButton.isVisible())) return
  const buttonBox = await menuButton.boundingBox()
  assert(buttonBox && buttonBox.x >= 0 && buttonBox.x + buttonBox.width <= width + 1, `${label}: hamburger exceeds viewport`)
  await menuButton.click()
  const panel = page.getByRole('dialog', { name: 'Site navigation' })
  await panel.waitFor({ state: 'visible' })
  const panelState = await panel.evaluate((el) => { const style = getComputedStyle(el); const rect = el.getBoundingClientRect(); return { backgroundColor: style.backgroundColor, opacity: style.opacity, visibility: style.visibility, left: rect.left, right: rect.right } })
  assert(panelState.backgroundColor === 'rgb(11, 13, 14)', `${label}: drawer is not opaque`)
  assert(panelState.opacity === '1' && panelState.visibility !== 'hidden', `${label}: drawer is not fully visible`)
  assert(panelState.left >= -1 && panelState.right <= width + 1, `${label}: drawer exceeds viewport`)
  for (const text of ['Websites', 'Work', 'How It Works', 'About', 'Website Audit']) await panel.getByRole('link', { name: text, exact: true }).waitFor({ state: 'visible' })
  await panel.getByRole('button', { name: 'Close menu' }).click()
  await panel.waitFor({ state: 'hidden' })
}

async function checkHomepage(browser, viewport, userAgent, suffix = '') {
  const label = `${viewport.name}${suffix}`
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, userAgent })
  const page = await context.newPage()
  const pageErrors = []
  page.on('pageerror', (error) => pageErrors.push(`pageerror: ${error.message}`))
  page.on('console', (message) => { if (message.type() === 'error' && !message.text().includes('Content Security Policy')) pageErrors.push(`console: ${message.text()}`) })
  await waitForProduction(page)
  await page.waitForTimeout(750)
  await checkPageGeometry(page, viewport.width, `${label} homepage`)
  await page.getByRole('heading', { name: /Your business has moved forward/ }).waitFor({ state: 'visible' })
  await page.getByText('A common B2B journey', { exact: true }).waitFor({ state: 'visible' })
  await checkOutcomeRows(page, viewport.width, label)
  const primaryCta = page.getByRole('link', { name: 'Request Website Audit', exact: true }).first()
  const ctaBox = await primaryCta.boundingBox()
  assert(ctaBox && ctaBox.x >= -1 && ctaBox.x + ctaBox.width <= viewport.width + 1, `${label}: primary CTA exceeds viewport`)
  await checkRose(page, viewport.width, label)
  await checkMenu(page, viewport.width, label)
  await page.screenshot({ path: `${outDir}/${label}-home.png`, fullPage: true })
  assert(pageErrors.length === 0, `${label}: browser errors: ${pageErrors.join(' | ')}`)
  await context.close()
}

async function checkPublicRoute(browser, viewport, route) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForTimeout(500)
  await checkPageGeometry(page, viewport.width, `${viewport.name} ${route}`)
  assert(errors.length === 0, `${viewport.name} ${route}: browser errors: ${errors.join(' | ')}`)
  await context.close()
}

async function checkAudit(browser, viewport) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } })
  const page = await context.newPage()
  await page.goto(`${baseURL}/website-audit`, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.getByRole('heading', { name: 'Has your website fallen behind the business?' }).waitFor({ state: 'visible' })
  for (const text of ['Keep it', 'Improve it', 'Rebuild it']) await page.getByText(text, { exact: true }).waitFor({ state: 'visible' })
  await context.close()
}

const browser = await chromium.launch({ headless: true })
try {
  for (const viewport of mobileViewports) await checkHomepage(browser, viewport, undefined)
  await checkHomepage(browser, mobileViewports[2], instagramUA, '-instagram')
  for (const viewport of wideViewports) await checkHomepage(browser, viewport, undefined)
  for (const viewport of mobileViewports) for (const route of publicRoutes.filter((r) => r !== '/')) await checkPublicRoute(browser, viewport, route)
  for (const viewport of wideViewports.slice(0, 2)) for (const route of publicRoutes.filter((r) => r !== '/')) await checkPublicRoute(browser, viewport, route)
  await checkAudit(browser, mobileViewports[0])
  await checkAudit(browser, mobileViewports[2])
  console.log('RESPONSIVE_QA_PASS: public pages, homepage outcome rows, navigation, audit form and desktop-only rose rule passed')
} finally {
  await browser.close()
}
