import { useRef } from 'react'
import { HUB, THEMES } from '../data/themes.js'
import { getVisibleSessions, getNextSession } from '../lib/filterSessions.js'
import { buildSeoSchema } from '../lib/seoSchema.js'
import { formatMonthLabel, getActiveMonth } from '../lib/sessionUtils.js'
import { HubHero } from './HubHero.jsx'
import { OtherSessions } from './OtherSessions.jsx'
import { RegisterBlock } from './RegisterBlock.jsx'
import { RegistrationNotes } from './RegistrationNotes.jsx'
import { SpeakerLineup } from './SpeakerLineup.jsx'
import { SpeakerPhotos } from './SpeakerPhotos.jsx'
import { ThemeSection } from './ThemeSection.jsx'
import { useScrollReveal } from './shared.jsx'

export function LectureHub({ allSessions, pageUrl }) {
  const rootRef = useRef(null)
  useScrollReveal(rootRef)
  const visible = getVisibleSessions(allSessions)
  const nextSession = getNextSession(allSessions)
  const monthLabel = formatMonthLabel(getActiveMonth())
  const schema = buildSeoSchema({
    pageType: 'hub',
    theme: null,
    sessions: visible,
    faqs: [],
    pageUrl,
  })

  return (
    <div id="lecture-expo" ref={rootRef} className="lex-root lex-root--hub">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <SpeakerPhotos sessions={visible} />
      <HubHero allSessions={allSessions} />
      <main className="lex-main">
        {THEMES.map((theme) => (
          <ThemeSection key={theme.id} theme={theme} allSessions={allSessions} />
        ))}
        <OtherSessions allSessions={allSessions} />
        <SpeakerLineup sessions={visible} />
        <div className="lex-container lex-hub-support">
          <RegistrationNotes />
          <RegisterBlock nextSession={nextSession} />
        </div>
      </main>
      <footer className="lex-footer">
        <div className="lex-container">
          <p>{monthLabel}{HUB.title} · 資料同步自官網講座列表，以最新公告為準</p>
        </div>
      </footer>
    </div>
  )
}
