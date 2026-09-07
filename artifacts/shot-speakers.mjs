import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import puppeteer from 'puppeteer'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const systemBrowsers = [
  `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
]

const browser = await puppeteer.launch({
  headless: true,
  executablePath: systemBrowsers.find((path) => path && existsSync(path)),
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(pathToFileURL(join(root, 'dist/russia.html')).href, {
  waitUntil: 'networkidle0',
})

const table = await page.$('.lex-table-wrap')
await table.screenshot({ path: join(root, 'artifacts/table-names-only.png') })

const report = await page.evaluate(() => {
  const speakerCellImgs = document.querySelectorAll('.lex-table td[data-label="主講人"] img')
  const lineup = document.querySelector('.lex-lineup')
  const r = lineup?.getBoundingClientRect()
  const lineupImgs = document.querySelectorAll('.lex-lineup img')
  const names = [...document.querySelectorAll('.lex-table-speakers li')].slice(0, 4).map((el) => el.textContent)
  return {
    tableSpeakerImgs: speakerCellImgs.length,
    lineupExists: Boolean(lineup),
    lineupHidden: lineup?.hasAttribute('hidden') ?? null,
    lineupCards: lineup?.querySelectorAll('.lex-lineup-card').length ?? 0,
    lineupTitle: lineup?.querySelector('h2')?.textContent ?? '',
    box: r ? { w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.y) } : null,
    lineupImgs: lineupImgs.length,
    lineupSrcs: [...lineupImgs].slice(0, 3).map((img) => img.getAttribute('src')),
    sampleNames: names,
  }
})
console.log(JSON.stringify(report, null, 2))

const lineup = await page.$('.lex-lineup')
if (lineup) {
  await lineup.evaluate((el) => el.scrollIntoView())
  await lineup.screenshot({ path: join(root, 'artifacts/lineup-restored.png') })
}
await browser.close()
