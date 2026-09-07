import { COMPANY, LECTURE } from '../data/company.js'
import { buildRegisterUrl } from '../lib/buildRegisterUrl.js'

export function MobileBar({ nextSession }) {
  const registerUrl = nextSession
    ? buildRegisterUrl(nextSession.lectureFlowId)
    : `${LECTURE.listUrl}#lecture_course`

  return (
    <div className="lex-mobile-bar" aria-label="快速操作">
      <a className="lex-btn lex-btn--primary" href={registerUrl} target="_blank" rel="noopener noreferrer">
        立即報名
      </a>
      <a className="lex-btn lex-btn--ghost" href={COMPANY.line} target="_blank" rel="noopener noreferrer">
        LINE 洽詢
      </a>
    </div>
  )
}
