import { SectionHeading } from './shared.jsx'

export function ThemeQaSection({ theme, faqs, id = 'theme-qa' }) {
  if (faqs.length === 0) return null

  return (
    <section id={id} className="lex-theme-qa lex-wide" aria-labelledby={`${id}-title`}>
      <SectionHeading eyebrow="FAQ" title={`${theme.shortName}主題 Q&A`} id={`${id}-title`}>
        報名前可以先了解這些問題
      </SectionHeading>
      <div className="lex-faq-list">
        {faqs.map((faq) => (
          <details key={faq.question} className="lex-theme-faq" data-reveal>
            <summary>
              <span className="lex-theme-faq-question">{faq.question}</span>
              <span className="lex-theme-faq-toggle" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="lex-theme-faq-body">
              {faq.answer.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
