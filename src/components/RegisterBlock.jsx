import { LECTURE } from '../data/company.js'
import { buildRegisterUrl } from '../lib/buildRegisterUrl.js'
import { sessionEndIso } from '../lib/sessionUtils.js'
import { SectionHeading } from './shared.jsx'

export function RegisterBlock({ nextSession, id = 'register' }) {
  const primaryUrl = nextSession
    ? buildRegisterUrl(nextSession.lectureFlowId)
    : `${LECTURE.listUrl}#lecture_course`
  const endIso = nextSession ? sessionEndIso(nextSession) : ''

  return (
    <section id={id} className="lex-register" aria-labelledby={`${id}-title`}>
      <SectionHeading eyebrow="SIGN UP" title="報名區塊" id={`${id}-title`}>
        {nextSession ? (
          <span className="lex-register-next" {...(endIso ? { 'data-lex-end': endIso } : {})}>
            最近一場：{nextSession.date} {nextSession.region} · {nextSession.title}
            {nextSession.speaker ? ` · 主講 ${nextSession.speaker}` : ''}
          </span>
        ) : (
          '請至下方場次表選擇場次，或查看官網全部講座'
        )}
      </SectionHeading>
      <div className="lex-register-actions" data-reveal>
        <a className="lex-btn lex-btn--primary lex-btn--pulse" href={primaryUrl} target="_blank" rel="noopener noreferrer">
          立即報名 <span aria-hidden="true">→</span>
        </a>
        <a className="lex-btn lex-btn--ghost" href={`${LECTURE.listUrl}#lecture_course`} target="_blank" rel="noopener noreferrer">
          查看官網全部場次
        </a>
      </div>
    </section>
  )
}
