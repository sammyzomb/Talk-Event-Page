/**
 * 匯出官網輪播 HERO 靜態圖（1920×720 PNG）
 * 用法：node scripts/export-carousel-hero.mjs
 */
import { launch } from 'puppeteer'
import { access, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { homedir } from 'node:os'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = join(root, '官網貼上版', '輪播HERO', '1920x720-本月全台主題講座.html')
const outDir = join(root, '官網貼上版', '輪播HERO')
const outPng = join(outDir, '1920x720-本月全台主題講座.png')

function resolveChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH
  return [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    join(homedir(), 'AppData', 'Local', 'Google', 'Chrome', 'Application', 'chrome.exe'),
  ][0]
}

await access(htmlPath)
await mkdir(outDir, { recursive: true })

const executablePath = resolveChromePath()
const browser = await launch({
  headless: true,
  executablePath,
  defaultViewport: { width: 1920, height: 720, deviceScaleFactor: 1 },
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  const page = await browser.newPage()
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle2', timeout: 60000 })
  await page.waitForSelector('.hero h1', { timeout: 15000 })
  await new Promise((r) => setTimeout(r, 1800))
  await page.screenshot({
    path: outPng,
    type: 'png',
    clip: { x: 0, y: 0, width: 1920, height: 720 },
  })
  console.log(`✓ 已匯出 ${outPng}`)
} finally {
  await browser.close()
}
