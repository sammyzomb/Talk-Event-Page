import { getVisibleSessions } from '../lib/filterSessions.js'
import { SectionHeading } from './shared.jsx'
import { SessionTable } from './SessionTable.jsx'

export function OtherSessions({ allSessions }) {
  const sessions = getVisibleSessions(allSessions, { untagged: true })
  if (sessions.length === 0) return null

  return (
    <section
      id="other-sessions"
      className="lex-other-sessions"
      aria-labelledby="other-sessions-title"
      style={{ '--accent': '#475569', '--accent-soft': '#e2e8f0' }}
    >
      <div className="lex-other-sessions-copy" data-reveal>
        <SectionHeading eyebrow="MORE TALKS" title="其他場次" id="other-sessions-title" />
      </div>
      <SessionTable
        sessions={sessions}
        id="other-sessions-table"
        intro="以下場次同樣開放免費報名，請點選「報名」完成登記"
      />
    </section>
  )
}
