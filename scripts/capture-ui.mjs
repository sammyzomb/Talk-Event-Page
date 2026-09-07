import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer'

const outputDir = join(process.cwd(), 'artifacts', 'ui')
mkdirSync(outputDir, { recursive: true })

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
})
const pages = [
  ['all', 'all.html'],
  ['russia', 'russia.html'],
  ['latin-america', 'latin-america.html'],
  ['aurora', 'aurora.html'],
  ['ancient-civilization', 'ancient-civilization.html'],
]

for (const [name, route] of pages) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 })
  await page.goto(`http://127.0.0.1:5173/${route}`, { waitUntil: 'networkidle2' })
  await page.evaluate(() => {
    document.querySelectorAll('[data-reveal]').forEach((element) => {
      element.setAttribute('data-revealed', '')
    })
  })
  await page.screenshot({ path: join(outputDir, `${name}-desktop.png`), fullPage: true })
  if (name === 'all') {
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
    await page.reload({ waitUntil: 'networkidle2' })
    await page.evaluate(() => {
      document.querySelectorAll('[data-reveal]').forEach((element) => {
        element.setAttribute('data-revealed', '')
      })
    })
    await page.screenshot({ path: join(outputDir, `${name}-mobile.png`), fullPage: true })
  }
  await page.close()
}

await browser.close()
