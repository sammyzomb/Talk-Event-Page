import { buildRegisterUrl } from '../lib/buildRegisterUrl.js'
import { formatSessionWhen, sessionEndIso } from '../lib/sessionUtils.js'
import { SectionHeading } from './shared.jsx'

function tableStatusLabel(status) {
  if (status === 'full') return '額滿'
  return '截止'
}

function speakerNames(session) {
  if (session.speakerProfiles?.length) {
    return session.speakerProfiles.map((profile) => profile.name)
  }
  return (session.speaker || '').split('、').filter(Boolean)
}

function TableSpeakers({ session }) {
  const names = speakerNames(session)
  if (names.length === 0) return '—'

  return (
    <ul className="lex-table-speakers">
      {names.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  )
}

function RegionBadge({ region }) {
  return (
    <span className="lex-region-badge" data-region={region}>
      {region}
    </span>
  )
}

function TableLocation({ region, location }) {
  return (
    <div className="lex-table-location">
      <span className="lex-table-region" data-region={region}>
        {region}
      </span>
      <p className="lex-table-address">{location}</p>
    </div>
  )
}

export function SessionTable({
  sessions,
  id = 'sessions',
  intro = '以下為本月全台場次，請點選「報名」完成登記',
}) {
  if (sessions.length === 0) {
    return (
      <section id={id} className="lex-sessions lex-sessions--empty lex-wide" aria-labelledby={`${id}-title`}>
        <SectionHeading eyebrow="SCHEDULE" title="講座詳細資訊" id={`${id}-title`}>
          本月尚無可報名場次，請見其他主題或聯絡我們
        </SectionHeading>
      </section>
    )
  }

  return (
    <section id={id} className="lex-sessions lex-wide" aria-labelledby={`${id}-title`}>
      <SectionHeading eyebrow="DETAILS" title="講座詳細資訊" id={`${id}-title`}>
        {intro}
      </SectionHeading>
      <div className="lex-table-wrap" role="region" aria-label="講座場次表">
        <table className="lex-table">
          <thead>
            <tr>
              <th scope="col">日期時間</th>
              <th scope="col">主題</th>
              <th scope="col">主講人</th>
              <th scope="col">地點</th>
              <th scope="col">報名</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              const canRegister = session.status === 'open'
              const registerUrl = buildRegisterUrl(session.lectureFlowId)
              const when = formatSessionWhen(session.date)
              const endIso = sessionEndIso(session)
              return (
                <tr key={session.id} {...(endIso ? { 'data-lex-end': endIso } : {})}>
                  <td className="lex-table-when" data-label="日期時間">
                    <strong>{when.full}</strong>
                    <span>{session.time}</span>
                  </td>
                  <td className="lex-table-title" data-label="主題">
                    {session.title}
                  </td>
                  <td data-label="主講人">
                    <TableSpeakers session={session} />
                  </td>
                  <td data-label="地點">
                    <TableLocation region={session.region} location={session.location} />
                  </td>
                  <td data-label="報名">
                    {canRegister ? (
                      <a
                        className="lex-table-register"
                        href={registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${session.title} 我要報名`}
                      >
                        報名
                      </a>
                    ) : (
                      <span className="lex-table-register is-disabled">{tableStatusLabel(session.status)}</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="lex-cards" aria-label="講座場次列表">
        {sessions.map((session) => {
          const canRegister = session.status === 'open'
          const registerUrl = buildRegisterUrl(session.lectureFlowId)
          const when = formatSessionWhen(session.date)
          const endIso = sessionEndIso(session)
          return (
            <article
              key={session.id}
              className="lex-card"
              data-reveal
              {...(endIso ? { 'data-lex-end': endIso } : {})}
            >
              <div className="lex-card-top">
                <strong>
                  {when.full}
                  <span className="lex-card-time">{session.time}</span>
                </strong>
                <RegionBadge region={session.region} />
              </div>
              <h3>{session.title}</h3>
              <ul>
                <li>
                  <span>主講</span>
                  <TableSpeakers session={session} />
                </li>
                <li>
                  <span>地點</span>
                  {session.location}
                </li>
              </ul>
              {canRegister ? (
                <a className="lex-btn lex-btn--primary" href={registerUrl} target="_blank" rel="noopener noreferrer">
                  我要報名
                </a>
              ) : (
                <span className="lex-btn lex-btn--disabled">{tableStatusLabel(session.status)}</span>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
