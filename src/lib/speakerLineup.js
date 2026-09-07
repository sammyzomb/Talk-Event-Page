import { THEMES } from '../data/themes.js'

const THEME_LABEL_BY_ID = Object.fromEntries(THEMES.map((theme) => [theme.id, theme.shortName]))

/** 由場次 themes 推導 1–2 個主題 chip（依出現順序，不重複）。 */
export function themeChipsFromSessions(sessions, limit = 2) {
  const chips = []
  const seen = new Set()

  for (const session of sessions) {
    for (const themeId of session.themes ?? []) {
      if (seen.has(themeId)) continue
      const label = THEME_LABEL_BY_ID[themeId]
      if (!label) continue
      seen.add(themeId)
      chips.push({ id: themeId, label })
      if (chips.length >= limit) return chips
    }
  }

  return chips
}

/** 由場次彙整講師陣容；同一位講師的多場次合併，依最早場次排序。 */
export function collectSpeakers(sessions) {
  const byName = new Map()

  for (const session of sessions) {
    for (const profile of session.speakerProfiles ?? []) {
      const entry = byName.get(profile.name) ?? {
        ...profile,
        title: profile.title ?? '',
        imagePosition: profile.imagePosition ?? 'center 22%',
        sessions: [],
      }
      entry.sessions.push(session)
      byName.set(profile.name, entry)
    }
  }

  return [...byName.values()]
    .map((speaker) => ({
      ...speaker,
      themeChips: themeChipsFromSessions(speaker.sessions),
    }))
    .sort((a, b) => a.sessions[0].date.localeCompare(b.sessions[0].date))
}

/** 僅本地內嵌圖需要 CSS class；官網網址改走 <img src>，避免 CMS 清掉 url(https://…)。 */
export function collectSpeakerPhotos(sessions) {
  const bySlug = new Map()

  for (const session of sessions) {
    for (const profile of session.speakerProfiles ?? []) {
      if (!profile.slug || !profile.image) continue
      if (/^https?:\/\//.test(profile.image)) continue
      bySlug.set(profile.slug, profile.image)
    }
  }

  return [...bySlug.entries()].map(([slug, image]) => ({ slug, image }))
}

export function isRemoteSpeakerImage(image) {
  return /^https?:\/\//.test(image || '')
}

export function speakerInitials(name) {
  return name.replace(/（.*?）/g, '').slice(-2)
}

export function shortDate(date) {
  const [, month, day] = date.split('/')
  return `${Number(month)}/${day}`
}
