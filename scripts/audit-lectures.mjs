import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { classifyThemes } from '../src/lib/sessionUtils.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const text = readFileSync(join(root, 'src/data/sessions/synced.js'), 'utf8')
const sessions = JSON.parse(text.match(/export const SESSIONS = (\[[\s\S]*\])/)[1])
const speakersText = readFileSync(join(root, 'src/data/speakers.js'), 'utf8')

const flow = {}
for (const m of speakersText.matchAll(/(\d+):\s*'([^']+)'/g)) {
  flow[Number(m[1])] = m[2]
}

const profileBlock = speakersText.match(/export const SPEAKER_PROFILES = \{([\s\S]*?)\n\}/)[1]
const profileNames = new Set()
for (const m of profileBlock.matchAll(/^\s+(?:'([^']+)'|([^\s:]+)):/gm)) {
  profileNames.add(m[1] || m[2])
}

const issues = []

console.log('=== 場次完整對照（官網已同步 12 場）===\n')
for (const s of sessions) {
  const sp = flow[s.lectureFlowId]
  const themes = s.themes || []
  const reclass = classifyThemes(s.title)
  const themeStr = themes.join(',') || '(無主題標籤)'
  console.log(
    `${s.date} ${s.region} #${s.lectureFlowId}\n` +
      `  主題：${themeStr}\n` +
      `  主講：${sp || '缺'}\n` +
      `  標題：${s.title}\n`,
  )

  if (!sp) issues.push(`#${s.lectureFlowId} 缺主講對照`)
  else {
    const miss = sp.split('、').filter((n) => !profileNames.has(n))
    if (miss.length) issues.push(`#${s.lectureFlowId} 缺 profile：${miss.join('、')}`)
  }
  if (JSON.stringify(themes) !== JSON.stringify(reclass)) {
    issues.push(`#${s.lectureFlowId} themes 與 classifyThemes 不一致`)
  }
  if (!themes.length && /南亞|紐西|印度|不丹|寮國|塔斯馬/.test(s.title)) {
    issues.push(`#${s.lectureFlowId} 「${s.title.slice(0, 20)}…」不屬四主題頁（僅總覽）`)
  }
  if (/南亞/.test(s.title) && !themes.includes('ancient-civilization')) {
    issues.push(
      `#${s.lectureFlowId} 標題含「南亞」但未標古文明（目前：${themeStr}）`,
    )
  }
}

const used = new Set(sessions.map((s) => s.lectureFlowId))
const orphan = Object.keys(flow)
  .map(Number)
  .filter((id) => !used.has(id))

console.log('=== 對照表有、官網目前無此場 ===')
if (!orphan.length) console.log('(無)')
else orphan.forEach((id) => console.log(`#${id} → ${flow[id]}`))

console.log('\n=== 各主題頁場次 ===')
const byTheme = {
  russia: [],
  'latin-america': [],
  aurora: [],
  'ancient-civilization': [],
  none: [],
}
for (const s of sessions) {
  if (!s.themes?.length) byTheme.none.push(s)
  for (const t of s.themes || []) byTheme[t].push(s)
}
for (const [k, list] of Object.entries(byTheme)) {
  console.log(`\n${k}: ${list.length} 場`)
  for (const s of list) {
    console.log(`  - ${s.date} ${s.region} → ${flow[s.lectureFlowId] || '?'}｜${s.title}`)
  }
}

console.log('\n=== 結論 ===')
if (!issues.length) {
  console.log('結構／主講／照片對照皆正確。')
} else {
  issues.forEach((i) => console.log('⚠ ' + i))
}
