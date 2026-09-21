import { THEME_RULES } from '../data/sessions/themeRules.js'

export function classifyThemes(title) {
  const themes = THEME_RULES.filter((rule) =>
    rule.keywords.some((keyword) => title.includes(keyword)),
  ).map((rule) => rule.id)
  return [...new Set(themes)]
}

export function inferRegion(location) {
  const rules = [
    ['台北', '台北'],
    ['臺北', '台北'],
    ['台中', '台中'],
    ['臺中', '台中'],
    ['高雄', '高雄'],
    ['台南', '台南'],
    ['臺南', '台南'],
    ['屏東', '屏東'],
    ['桃園', '桃園'],
    ['新竹', '新竹'],
    ['彰化', '彰化'],
    ['嘉義', '嘉義'],
  ]
  for (const [keyword, region] of rules) {
    if (location.includes(keyword)) return region
  }
  return '其他'
}

export function normalizeStatus(raw) {
  if (!raw) return 'closed'
  if (raw.includes('額滿') || raw.includes('截止')) return 'full'
  if (raw.includes('報名')) return 'open'
  return 'closed'
}

export function taipeiNow() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' }))
}

export function getActiveMonth(now = taipeiNow()) {
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export function formatMonthLabel(monthKey) {
  const [y, m] = monthKey.split('-')
  return `${y}年${Number(m)}月`
}

export function getNextMonthKey(now = taipeiNow()) {
  const d = new Date(now)
  d.setMonth(d.getMonth() + 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

/** 活動頁顯示範圍：當月 + 次月 */
export function getDisplayMonthKeys(now = taipeiNow()) {
  return [getActiveMonth(now), getNextMonthKey(now)]
}

export function isInDisplayMonths(session, monthKeys, now = taipeiNow()) {
  const keys = monthKeys ?? getDisplayMonthKeys(now)
  const normalized = session.date.replace(/\//g, '-').slice(0, 7)
  return keys.includes(normalized)
}

/** 例：2026年9月、10月 */
export function formatDisplayMonthLabel(monthKeys, now = taipeiNow()) {
  const keys = monthKeys ?? getDisplayMonthKeys(now)
  if (keys.length === 0) return ''
  const [year] = keys[0].split('-')
  const parts = keys.map((k) => `${Number(k.split('-')[1])}月`)
  return `${year}年${parts.join('、')}`
}

export const REGISTRATION_CUTOFF_HOUR = 15

export function parseSessionDate(dateStr) {
  if (!dateStr) return null
  const normalized = String(dateStr).replace(/\//g, '-').slice(0, 10)
  const d = new Date(`${normalized}T00:00:00+08:00`)
  return Number.isNaN(d.getTime()) ? null : d
}

function padTime(value) {
  return String(value).padStart(2, '0')
}

/** 場次結束時間（台北）；有 [開始-結束] 用結束，否則當日 23:59:59 */
export function getSessionEndAt(session) {
  if (!session?.date) return null
  const normalized = String(session.date).replace(/\//g, '-').slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) return null
  const time = String(session.time ?? '')
  const range = time.match(/(\d{1,2}):(\d{2})\s*[-–~至到]\s*(\d{1,2}):(\d{2})/)
  if (range) {
    const end = new Date(
      `${normalized}T${padTime(range[3])}:${padTime(range[4])}:00+08:00`,
    )
    return Number.isNaN(end.getTime()) ? null : end
  }
  const endOfDay = new Date(`${normalized}T23:59:59+08:00`)
  return Number.isNaN(endOfDay.getTime()) ? null : endOfDay
}

export function sessionEndIso(session) {
  const end = getSessionEndAt(session)
  return end ? end.toISOString() : ''
}

/** 場次日期一眼掃讀：日／月／星期 */
export function formatSessionWhen(dateStr) {
  const d = parseSessionDate(dateStr)
  if (!d) {
    return {
      day: '—',
      month: 0,
      monthLabel: '',
      weekday: '',
      full: dateStr || '',
      short: dateStr || '',
    }
  }
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const month = d.getMonth() + 1
  const day = d.getDate()
  const weekday = weekdays[d.getDay()]
  return {
    day: String(day).padStart(2, '0'),
    month,
    monthLabel: `${month}月`,
    weekday,
    full: `${month}/${day}(${weekday})`,
    short: `${month}/${day}(${weekday})`,
  }
}

export function getRegistrationCutoff(deadlineStr) {
  if (!deadlineStr) return null
  const normalized = String(deadlineStr).replace(/\//g, '-').slice(0, 10)
  const cutoff = new Date(`${normalized}T${String(REGISTRATION_CUTOFF_HOUR).padStart(2, '0')}:00:00+08:00`)
  return Number.isNaN(cutoff.getTime()) ? null : cutoff
}

export function isRegistrationOpen(session, now = taipeiNow()) {
  const cutoff = getRegistrationCutoff(session.deadline || session.date)
  if (!cutoff) return true
  return now < cutoff
}

export function isEventPast(session, now = taipeiNow()) {
  const end = getSessionEndAt(session)
  if (!end) {
    const eventDate = parseSessionDate(session.date)
    if (!eventDate) return false
    const today = new Date(now.toDateString())
    return eventDate < today
  }
  return now >= end
}

export function isSessionVisible(session, now = taipeiNow()) {
  return isRegistrationOpen(session, now) && !isEventPast(session, now)
}

export function isCurrentMonth(session, monthKey, now = taipeiNow()) {
  const active = monthKey || getActiveMonth(now)
  const normalized = session.date.replace(/\//g, '-').slice(0, 7)
  return normalized === active
}

export function enrichSession(raw) {
  return {
    ...raw,
    themes: classifyThemes(raw.title),
    region: raw.region || inferRegion(raw.location),
    status: normalizeStatus(raw.statusRaw ?? raw.status),
    registerUrl: raw.registerUrl,
  }
}

const SCHEDULE_REGION_ORDER = ['台北', '台中', '高雄', '台南', '屏東', '桃園', '新竹', '彰化', '嘉義', '其他']

function scheduleRegionRank(region) {
  const index = SCHEDULE_REGION_ORDER.indexOf(region)
  return index === -1 ? SCHEDULE_REGION_ORDER.length : index
}

/** 總覽主題卡：依日期、再依城市排序 */
export function sortSessionsForSchedule(sessions) {
  return [...sessions].sort((a, b) => {
    const dateCmp = String(a.date).localeCompare(String(b.date))
    if (dateCmp !== 0) return dateCmp
    return scheduleRegionRank(a.region) - scheduleRegionRank(b.region)
  })
}
