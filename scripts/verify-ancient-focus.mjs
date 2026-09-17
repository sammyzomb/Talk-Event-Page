/**
 * 檢查古文明子主題解析結果（build 前可先跑）
 */
import { ANCIENT_PROFILES, ANCIENT_THEME_IMAGES } from '../src/data/sessions/ancientProfiles.js'
import { SESSIONS } from '../src/data/sessions/synced.js'
import { getVisibleSessions } from '../src/lib/filterSessions.js'
import { matchAncientProfileIds, resolveAncientFocus } from '../src/lib/resolveAncientFocus.js'

const sessions = getVisibleSessions(SESSIONS, { themeId: 'ancient-civilization' })
const focus = resolveAncientFocus(sessions)

const report = {
  visibleSessionCount: sessions.length,
  sessions: sessions.map((session) => ({
    title: session.title,
    date: session.date,
    region: session.region,
    matchedProfiles: matchAncientProfileIds(session.title),
  })),
  focus: focus
    ? {
        profileId: focus.profileId,
        matchedProfileIds: focus.matchedProfileIds,
        heroLead: focus.overrides.heroLead,
        imageAlt: focus.overrides.imageAlt,
        sectionImage: focus.overrides.sectionImage,
      }
    : null,
}

console.log(JSON.stringify(report, null, 2))

let failed = false

if (sessions.length && focus?.profileId === 'generic') {
  console.warn('\n⚠ 有古文明場次但無法對應子主題，請檢查 ancientProfiles.js 關鍵字。')
  failed = true
}

async function checkImageUrl(url, label) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'manual' })
    if (response.status === 301 || response.status === 302) {
      console.warn(`\n⚠ ${label} URL 會被重導（可能破圖）：\n   ${url}`)
      return false
    }
    const ok = response.status >= 200 && response.status < 300
    if (!ok) {
      console.warn(`\n⚠ ${label} 無法載入（HTTP ${response.status}）：\n   ${url}`)
      return false
    }
    return true
  } catch (error) {
    console.warn(`\n⚠ ${label} HEAD 檢查失敗：${url}\n   ${error.message}`)
    return false
  }
}

const themeImageLabels = {
  southIndia: '南印度',
  centralAsia: '中亞',
  egypt: '埃及',
  bhutan: '不丹',
}

for (const [key, url] of Object.entries(ANCIENT_THEME_IMAGES)) {
  const ok = await checkImageUrl(url, themeImageLabels[key] ?? key)
  if (!ok) failed = true
}

if (focus?.overrides.sectionImage && !Object.values(ANCIENT_THEME_IMAGES).includes(focus.overrides.sectionImage)) {
  const ok = await checkImageUrl(focus.overrides.sectionImage, '本月主圖')
  if (!ok) failed = true
}

const profileImages = new Set(
  ANCIENT_PROFILES.flatMap((profile) => [profile.heroImage, profile.sectionImage, profile.storyImage]),
)
for (const url of profileImages) {
  if (Object.values(ANCIENT_THEME_IMAGES).includes(url)) continue
  if (!url.includes('/data/images/')) continue
  const ok = await checkImageUrl(url, 'profile 備用圖')
  if (!ok) failed = true
}

if (failed) {
  console.warn('\n請上傳三組圖至 官網貼上版/待上傳官網/古文明-story/（見上傳說明.txt）')
  process.exitCode = 1
}
