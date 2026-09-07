import { LECTURE } from '../data/company.js'

export function SessionGlance({
  id = 'glance',
  inHero = false,
}) {
  return (
    <section
      id={id}
      className={`lex-glance${inHero ? ' lex-glance--hero' : ' lex-wide'}`}
    >
      <a
        className="lex-glance-link"
        href={LECTURE.listUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        全部場次表 →
      </a>
    </section>
  )
}
