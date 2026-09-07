/**
 * 驗證五份官網貼上版 HTML 是否就緒
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CMS_HUB, CMS_THEME_PAGES } from '../src/data/cmsPages.js'
import { THEMES, getThemeImage } from '../src/data/themes.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const CMS_CHAR_LIMIT = 110_000
const IMAGE_SLOTS = ['hero', 'showcase', 'section', 'story']

function verifyUniqueThemeImages() {
  const seen = new Map()
  let imageOk = true

  for (const theme of THEMES) {
    for (const slot of IMAGE_SLOTS) {
      const url = getThemeImage(theme, slot)
      const key = `${theme.id}:${slot}`
      if (seen.has(url)) {
        console.log(`✗ 圖片重複：${key} 與 ${seen.get(url)} 皆使用 ${url}`)
        imageOk = false
      } else {
        seen.set(url, key)
      }
    }
  }

  const hubOg = CMS_HUB.meta.ogImage
  if (seen.has(hubOg)) {
    console.log(`✗ 總覽 og:image 與 ${seen.get(hubOg)} 重複`)
    imageOk = false
  }

  if (imageOk) {
    console.log(`✓ 主題圖片 ${seen.size} 張皆不重複（含總覽 og 共 ${seen.size + 1} 張）`)
  }

  return imageOk
}

const pages = [
  { name: CMS_HUB.folder, file: CMS_HUB.pasteFile },
  ...Object.values(CMS_THEME_PAGES).map((p) => ({ name: p.folder, file: p.pasteFile })),
]

let ok = true

console.log('官網貼上版檢查\n')
ok = verifyUniqueThemeImages() && ok
console.log('')

for (const { name, file } of pages) {
  const full = join(root, file)
  if (!existsSync(full)) {
    console.log(`✗ ${name}：找不到 ${file}`)
    ok = false
    continue
  }
  const content = readFileSync(full, 'utf8')
  const chars = content.length
  const hasScope = content.includes('id="lecture-expo"')
  const status = chars <= CMS_CHAR_LIMIT ? '✓' : '⚠'
  console.log(`${status} ${name}：${chars.toLocaleString()} 字元${hasScope ? '' : '（缺少 #lecture-expo）'}`)
  if (!hasScope) ok = false
  if (chars > CMS_CHAR_LIMIT) ok = false
  console.log(`  → ${full}`)
}

const preview = join(root, CMS_HUB.previewFile)
if (existsSync(preview)) {
  console.log(`\n本地預覽：以瀏覽器開啟 ${preview}`)
}

process.exit(ok ? 0 : 1)
