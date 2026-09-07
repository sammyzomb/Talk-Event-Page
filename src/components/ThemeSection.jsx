import { LECTURE } from '../data/company.js'
import { getThemeImage, getThemeImagePosition } from '../data/themes.js'
import { getVisibleSessions } from '../lib/filterSessions.js'
import { buildRegisterUrl } from '../lib/buildRegisterUrl.js'
import {
  formatSessionWhen,
  sessionEndIso,
  sortSessionsForSchedule,
} from '../lib/sessionUtils.js'
import { SectionHeading } from './shared.jsx'

function scheduleStatusLabel(status) {
  if (status === 'open') return '報名中'
  if (status === 'full') return '已額滿'
  return '已截止'
}

export function ThemeSection({ theme, allSessions }) {
  const sessions = getVisibleSessions(allSessions, { themeId: theme.id })
  const schedule = sortSessionsForSchedule(sessions)

  return (
    <section
      id={theme.id}
      className="lex-theme-section"
      data-theme={theme.id}
      aria-labelledby={`${theme.id}-title`}
      style={{ '--accent': theme.accent, '--accent-soft': theme.accentSoft }}
    >
      <div className="lex-theme-section-layout lex-wide">
        <a
          className="lex-theme-feature-image"
          href={theme.pageUrl}
          aria-label={`前往${theme.name}`}
          data-reveal
        >
          <img
            src={getThemeImage(theme, 'section')}
            alt={theme.imageAlt}
            loading="lazy"
            style={{ objectPosition: getThemeImagePosition(theme, 'section') }}
          />
          <span>
            <small>{theme.storyEyebrow}</small>
            <strong>進入{theme.shortName}專頁</strong>
            <b aria-hidden="true">↗</b>
          </span>
        </a>
        <div className="lex-theme-section-copy" data-reveal>
          <SectionHeading eyebrow={theme.heroLead} title={theme.name} id={`${theme.id}-title`}>
            {theme.story}
          </SectionHeading>
          {schedule.length > 0 ? (
            <div className="lex-theme-schedule" data-reveal>
              <p className="lex-theme-schedule-head">
                <span>本月場次</span>
                <em>{schedule.length} 場</em>
              </p>
              <ul aria-label={`${theme.shortName}各區講座日期，可點選場次直接報名`}>
                {schedule.map((session) => {
                  const when = formatSessionWhen(session.date)
                  const endIso = sessionEndIso(session)
                  const canRegister = session.status === 'open'
                  const registerUrl = buildRegisterUrl(session.lectureFlowId)
                  const itemProps = endIso ? { 'data-lex-end': endIso } : {}

                  const content = (
                    <>
                      <span
                        className="lex-region-badge lex-region-badge--schedule"
                        data-region={session.region}
                      >
                        {session.region}
                      </span>
                      <span className="lex-theme-schedule-when">
                        <strong>{when.full}</strong>
                        <time dateTime={session.date.replace(/\//g, '-')}>{session.time}</time>
                      </span>
                      {canRegister ? (
                        <span className="lex-theme-schedule-action" aria-hidden="true">
                          報名
                        </span>
                      ) : (
                        <span className="lex-theme-schedule-action lex-theme-schedule-action--disabled">
                          {scheduleStatusLabel(session.status)}
                        </span>
                      )}
                    </>
                  )

                  return (
                    <li key={session.id} {...itemProps}>
                      {canRegister ? (
                        <a
                          className="lex-theme-schedule-link"
                          href={registerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${session.region} ${when.full} ${session.time} 我要報名`}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="lex-theme-schedule-link lex-theme-schedule-link--disabled" aria-label={`${session.region} ${when.full} ${scheduleStatusLabel(session.status)}`}>
                          {content}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
          <div className="lex-theme-section-actions">
            <a
              className="lex-btn lex-btn--primary lex-btn--pulse"
              href={LECTURE.listUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              看場次一覽
            </a>
            <a className="lex-btn lex-btn--ghost lex-theme-entry" href={theme.pageUrl}>
              進入{theme.shortName}專頁
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
