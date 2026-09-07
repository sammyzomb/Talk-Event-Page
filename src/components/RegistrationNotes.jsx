import { SectionHeading } from './shared.jsx'

const NOTES = [
  '本活動全程禁止拍照、錄影及錄音，敬請配合。',
  '請準時出席，名額有限，報名後若無法參加請提前告知。',
  '講座內容、場次與名額依實際狀況調整，以官網最新公告為準。',
  '報名資料僅用於講座登記與聯絡，不另作他用。',
]

export function RegistrationNotes({ id = 'notes' }) {
  return (
    <section id={id} className="lex-notes" aria-labelledby={`${id}-title`}>
      <SectionHeading eyebrow="NOTICE" title="報名須知" id={`${id}-title`} />
      <ul data-reveal>
        {NOTES.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  )
}
