import { collectSpeakers, shortDate } from '../lib/speakerLineup.js'
import { formatDisplayMonthLabel, getDisplayMonthKeys, sessionEndIso } from '../lib/sessionUtils.js'
import { SpeakerAvatar } from './SpeakerAvatar.jsx'
import { SectionHeading } from './shared.jsx'

export function SpeakerLineup({ sessions, id = 'speakers' }) {
  const speakers = collectSpeakers(sessions)
  if (speakers.length === 0) return null

  const monthLabel = formatDisplayMonthLabel(getDisplayMonthKeys())

  return (
    <section id={id} className="lex-lineup lex-wide" aria-labelledby={`${id}-title`}>
      <SectionHeading eyebrow="SPEAKERS" title={`${monthLabel}主講陣容`} id={`${id}-title`}>
        資深領隊親自開講，帶回第一手的旅行現場。場次與報名請見上方講座詳細資訊。
      </SectionHeading>
      <ul className="lex-lineup-grid">
        {speakers.map((speaker) => (
          <li className="lex-lineup-card" key={speaker.name} data-reveal>
            <span className="lex-lineup-portrait" aria-hidden="true">
              <SpeakerAvatar profile={speaker} variant="lineup" />
            </span>
            <div className="lex-lineup-body">
              <strong className="lex-lineup-name">{speaker.name}</strong>
              {speaker.title ? <span className="lex-lineup-title">{speaker.title}</span> : null}
              {speaker.themeChips.length > 0 ? (
                <ul className="lex-lineup-tags">
                  {speaker.themeChips.map((chip) => (
                    <li key={chip.id} data-theme={chip.id}>
                      {chip.label}
                    </li>
                  ))}
                </ul>
              ) : null}
              {speaker.sessions.length > 1 ? (
                <em className="lex-lineup-count">近期 {speaker.sessions.length} 場</em>
              ) : null}
              <ul className="lex-lineup-sessions">
                {speaker.sessions.map((session) => {
                  const endIso = sessionEndIso(session)
                  return (
                    <li key={session.id} {...(endIso ? { 'data-lex-end': endIso } : {})}>
                      {shortDate(session.date)} {session.region}
                    </li>
                  )
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
