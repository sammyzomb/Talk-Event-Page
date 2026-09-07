import {
  speakerForSession,
  speakerProfilesForSession,
} from '../data/speakers.js'
import {
  getActiveMonth,
  isCurrentMonth,
  isSessionVisible,
  taipeiNow,
} from './sessionUtils.js'

function withSpeaker(session) {
  return {
    ...session,
    speaker: session.speaker || speakerForSession(session),
    speakerProfiles: session.speakerProfiles || speakerProfilesForSession(session),
  }
}

export function getVisibleSessions(sessions, options = {}) {
  const now = options.now ?? taipeiNow()
  const monthKey = options.monthKey ?? getActiveMonth(now)
  const themeId = options.themeId
  const untagged = options.untagged === true

  return sessions
    .filter((s) => isSessionVisible(s, now))
    .filter((s) => isCurrentMonth(s, monthKey, now))
    .filter((s) => {
      if (themeId) return s.themes.includes(themeId)
      if (untagged) return s.themes.length === 0
      return true
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(withSpeaker)
}

export function getNextSession(sessions, themeId) {
  const visible = getVisibleSessions(sessions, { themeId })
  return visible[0] ?? null
}

export function getRegionsForSessions(sessions) {
  return [...new Set(sessions.map((s) => s.region))].sort()
}
