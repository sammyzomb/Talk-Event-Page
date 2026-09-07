import { SESSIONS } from '../src/data/sessions/synced.js'
import { SPEAKERS_BY_FLOW_ID, speakerProfilesForSession } from '../src/data/speakers.js'
import { getVisibleSessions } from '../src/lib/filterSessions.js'
import { readFileSync } from 'node:fs'

const now = new Date('2026-09-07T08:52:00+08:00')
const themes = ['aurora', 'russia', 'latin-america', 'ancient-civilization']

console.log('== 全部場次（含過期）')
for (const s of SESSIONS) {
  const names = SPEAKERS_BY_FLOW_ID[s.lectureFlowId] ?? '(無主講)'
  console.log(`${s.date} ${s.region} #${s.lectureFlowId} [${s.themes.join(',')||'其他'}] ${s.title} → ${names}`)
}

console.log('\n== 各主題頁可見場次／主講（以 9/7 過濾）')
for (const themeId of themes) {
  const visible = getVisibleSessions(SESSIONS, { themeId, now })
  console.log('\n--', themeId, 'sessions', visible.length)
  for (const s of visible) {
    console.log(`  ${s.date} ${s.region} ${s.title} → ${s.speaker}`)
  }
  const names = [...new Set(visible.flatMap((s) => speakerProfilesForSession(s).map((p) => p.name)))]
  console.log('  lineup:', names.join('、') || '(空)')
}

const hub = getVisibleSessions(SESSIONS, { now })
console.log('\n== 總覽可見', hub.length, '/', SESSIONS.length)
const missing = SESSIONS.filter((s) => !hub.some((v) => v.lectureFlowId === s.lectureFlowId))
if (missing.length) {
  console.log('被過濾掉:')
  for (const s of missing) console.log(`  ${s.date} ${s.region} ${s.title}`)
}

const paste = {
  極光: '官網貼上版/極光/貼上用-HTML區塊.html',
  俄羅斯: '官網貼上版/俄羅斯/貼上用-HTML區塊.html',
  拉丁美洲: '官網貼上版/拉丁美洲/貼上用-HTML區塊.html',
  古文明: '官網貼上版/古文明/貼上用-HTML區塊.html',
  總覽: '官網貼上版/總覽/貼上用-HTML區塊.html',
}
console.log('\n== 貼上版主講姓名')
for (const [name, path] of Object.entries(paste)) {
  const html = readFileSync(path, 'utf8')
  const cards = [...html.matchAll(/class="lex-lineup-name">([^<]+)</g)].map((m) => m[1])
  console.log(name, cards.join('、') || '(無陣容區)')
}
