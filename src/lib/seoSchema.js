import { COMPANY } from '../data/company.js'
import { HUB } from '../data/themes.js'
import { buildRegisterUrl } from './buildRegisterUrl.js'
import { formatMonthLabel, getActiveMonth } from './sessionUtils.js'

function parseEventDateTime(dateStr, timeStr, kind) {
  const date = dateStr.replace(/\//g, '-')
  const part = timeStr.split('-')[kind === 'start' ? 0 : 1]?.trim() ?? '14:00'
  const [h, m] = part.split(':')
  return `${date}T${h.padStart(2, '0')}:${(m ?? '00').padStart(2, '0')}:00+08:00`
}

export function buildSeoSchema({ pageType, theme, sessions, faqs, pageUrl }) {
  const monthKey = getActiveMonth()
  const monthLabel = formatMonthLabel(monthKey)
  const pageName =
    pageType === 'hub' ? `${monthLabel}${HUB.title}` : `${monthLabel}${theme.name}`
  const description = pageType === 'hub' ? HUB.seoDescription : theme.seoDescription

  const graph = [
    {
      '@type': 'WebPage',
      name: pageName,
      description,
      inLanguage: 'zh-Hant-TW',
      url: pageUrl,
    },
    {
      '@type': 'Organization',
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      url: COMPANY.website,
    },
    ...(faqs.length
      ? [
          {
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          },
        ]
      : []),
    ...sessions.map((session) => ({
      '@type': 'Event',
      name: session.title,
      startDate: parseEventDateTime(session.date, session.time, 'start'),
      endDate: parseEventDateTime(session.date, session.time, 'end'),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: session.location,
        address: session.location,
      },
      organizer: {
        '@type': 'Organization',
        name: COMPANY.name,
        url: COMPANY.website,
      },
      offers: {
        '@type': 'Offer',
        url: buildRegisterUrl(session.lectureFlowId),
        price: '0',
        priceCurrency: 'TWD',
      },
    })),
  ]

  return { '@context': 'https://schema.org', '@graph': graph }
}
