import { getVisibleSessions } from './filterSessions.js'
import { resolveAncientFocus } from './resolveAncientFocus.js'

/**
 * 依本月剩餘場次覆寫古文明主題的圖文（其他主題維持 themes.js 靜態設定）
 * @param {import('../data/themes.js').THEMES[number]} theme
 * @param {Array<object>} allSessions
 */
export function resolveThemeForDisplay(theme, allSessions) {
  if (theme.id !== 'ancient-civilization') return theme

  const sessions = getVisibleSessions(allSessions, { themeId: theme.id })
  const focus = resolveAncientFocus(sessions)
  if (!focus) return theme

  return { ...theme, ...focus.overrides }
}
