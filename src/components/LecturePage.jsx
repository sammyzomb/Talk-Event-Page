import { useRef } from 'react'
import { getThemeQa } from '../data/faqs.js'
import { getVisibleSessions, getNextSession } from '../lib/filterSessions.js'
import { resolveThemeForDisplay } from '../lib/resolveThemeForDisplay.js'
import { buildSeoSchema } from '../lib/seoSchema.js'
import { formatDisplayMonthLabel, getDisplayMonthKeys } from '../lib/sessionUtils.js'
import { Hero } from './Hero.jsx'
import { OtherThemes } from './OtherThemes.jsx'
import { RegisterBlock } from './RegisterBlock.jsx'
import { RegistrationNotes } from './RegistrationNotes.jsx'
import { SessionTable } from './SessionTable.jsx'
import { SpeakerLineup } from './SpeakerLineup.jsx'
import { SpeakerPhotos } from './SpeakerPhotos.jsx'
import { ThemeQaSection } from './ThemeQaSection.jsx'
import { ThemeStory } from './ThemeStory.jsx'
import { useScrollReveal } from './shared.jsx'

export function LecturePage({ theme, allSessions, pageUrl }) {
  const rootRef = useRef(null)
  useScrollReveal(rootRef)
  const displayTheme = resolveThemeForDisplay(theme, allSessions)
  const sessions = getVisibleSessions(allSessions, { themeId: theme.id })
  const nextSession = getNextSession(allSessions, theme.id)
  const themeQa = getThemeQa(theme.id)
  const faqs = themeQa
  const monthLabel = formatDisplayMonthLabel(getDisplayMonthKeys())
  const schema = buildSeoSchema({
    pageType: 'theme',
    theme: displayTheme,
    sessions,
    faqs,
    pageUrl,
  })

  return (
    <div
      id="lecture-expo"
      ref={rootRef}
      className="lex-root"
      style={{ '--accent': theme.accent, '--accent-soft': theme.accentSoft }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <SpeakerPhotos sessions={sessions} />
      <Hero theme={displayTheme} />
      <main className="lex-main">
        <div className="lex-container">
          <ThemeStory theme={displayTheme} />
        </div>
        <ThemeQaSection theme={theme} faqs={themeQa} />
        <SessionTable
          sessions={sessions}
          intro="含主講人姓名與完整地址；完整全台場次請點上方場次一覽"
        />
        <SpeakerLineup sessions={sessions} />
        <div className="lex-container">
          <RegistrationNotes />
          <RegisterBlock nextSession={nextSession} />
          <OtherThemes currentThemeId={theme.id} sessions={allSessions} />
        </div>
      </main>
      <footer className="lex-footer">
        <div className="lex-container">
          <p>{monthLabel}{theme.name} · 資料同步自官網講座列表，以最新公告為準</p>
        </div>
      </footer>
    </div>
  )
}
