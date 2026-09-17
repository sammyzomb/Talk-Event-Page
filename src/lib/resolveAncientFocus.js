import {
  ANCIENT_PROFILE_ORDER,
  ANCIENT_PROFILES,
  getAncientProfile,
} from '../data/sessions/ancientProfiles.js'

function normalizeTitle(title) {
  return String(title ?? '').replace(/\s/g, '')
}

function titleIncludesKeyword(title, keyword) {
  if (keyword === '印度' && title.includes('印尼')) return false
  return title.includes(keyword)
}

/** @param {string} title */
export function matchAncientProfileIds(title) {
  const normalized = normalizeTitle(title)
  const matched = new Set()

  for (const profile of ANCIENT_PROFILES) {
    if (profile.id === 'generic' || !profile.keywords.length) continue
    const keywords = [...profile.keywords].sort((a, b) => b.length - a.length)
    if (keywords.some((keyword) => titleIncludesKeyword(normalized, keyword))) {
      matched.add(profile.id)
    }
  }

  return matched.size ? [...matched] : ['generic']
}

function scoreProfiles(sessions) {
  /** @type {Map<string, number>} */
  const scores = new Map()

  for (const session of sessions) {
    for (const profileId of matchAncientProfileIds(session.title)) {
      scores.set(profileId, (scores.get(profileId) ?? 0) + 1)
    }
  }

  return scores
}

function pickPrimaryProfileId(scores, sessions) {
  const ranked = [...scores.entries()].sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1]
    const orderA = ANCIENT_PROFILE_ORDER.indexOf(a[0])
    const orderB = ANCIENT_PROFILE_ORDER.indexOf(b[0])
    return orderA - orderB
  })

  if (ranked.length) return ranked[0][0]

  return sessions.length ? 'generic' : null
}

function buildHeroLead(activeProfileIds) {
  const labels = ANCIENT_PROFILE_ORDER
    .filter((id) => activeProfileIds.includes(id) && id !== 'generic')
    .map((id) => getAncientProfile(id).labelShort)

  if (!labels.length) return getAncientProfile('generic').labelShort
  return labels.join('・')
}

function buildOverrides(primary, activeProfileIds) {
  const heroLead = buildHeroLead(activeProfileIds)

  return {
    heroLead,
    storyEyebrow: primary.storyEyebrow,
    storyTitle: primary.storyTitle,
    story: primary.story,
    highlights: primary.highlights,
    imageAlt: primary.imageAlt,
    heroImage: primary.heroImage,
    showcaseImage: primary.sectionImage,
    sectionImage: primary.sectionImage,
    storyImage: primary.storyImage,
    heroPosition: primary.heroPosition ?? 'center 34%',
    sectionPosition: primary.sectionPosition ?? 'center 48%',
    storyPosition: primary.storyPosition ?? primary.sectionPosition ?? 'center 38%',
  }
}

/**
 * @param {Array<{ title: string }>} sessions 本月仍顯示的古文明場次
 * @returns {{ profileId: string, matchedProfileIds: string[], sessionTitles: string[], overrides: object } | null}
 */
export function resolveAncientFocus(sessions) {
  if (!sessions.length) return null

  const scores = scoreProfiles(sessions)
  const activeProfileIds = ANCIENT_PROFILE_ORDER.filter(
    (id) => id !== 'generic' && scores.has(id),
  )
  const primaryId = pickPrimaryProfileId(scores, sessions) ?? 'generic'
  const primary = getAncientProfile(primaryId)

  const matchedProfileIds = activeProfileIds.length ? activeProfileIds : ['generic']

  if (primaryId === 'generic' && sessions.length) {
    console.warn(
      '[ancient-focus] 古文明場次無法對應子主題，使用通用素材：',
      sessions.map((session) => session.title).join(' | '),
    )
  }

  return {
    profileId: primaryId,
    matchedProfileIds,
    sessionTitles: sessions.map((session) => session.title),
    overrides: buildOverrides(primary, matchedProfileIds),
  }
}
