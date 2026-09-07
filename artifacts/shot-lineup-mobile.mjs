import { launch } from 'puppeteer'
import { mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { homedir } from 'node:os'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const html = join(root, '官網貼上版', '總覽', '完整頁面.html')
const outDir = join(root, 'artifacts')
const out = join(outDir, 'lineup-mobile.png')
await mkdir(outDir, { recursive: true })

const chrome = process.env.PUPPETEER_EXECUTABLE_PATH
  || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const browser = await launch({
  headless: true,
  executablePath: chrome,
  defaultViewport: { width: 390, height: 844, deviceScaleFactor: 2 },
  args: ['--no-sandbox'],
})

try {
  const page = await browser.newPage()
  await page.goto(pathToFileURL(html).href, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.waitForSelector('#speakers', { timeout: 15000 })
  await page.$eval('#speakers', (el) => el.scrollIntoView({ block: 'start' }))
  await new Promise((r) => setTimeout(r, 800))
  const box = await page.$eval('#speakers', (el) => {
    const r = el.getBoundingClientRect()
    const style = getComputedStyle(el)
    const grid = el.querySelector('.lex-lineup-grid')
    const gs = grid ? getComputedStyle(grid) : null
    return {
      width: Math.round(r.width),
      left: Math.round(r.left),
      right: Math.round(r.right),
      viewport: window.innerWidth,
      elWidth: style.width,
      gridCols: gs?.gridTemplateColumns ?? null,
    }
  })
  console.log(JSON.stringify(box, null, 2))
  await page.screenshot({ path: out, type: 'png' })
  console.log('saved', out)
} finally {
  await browser.close()
}
