import { getThemeImage, getThemeImagePosition } from '../data/themes.js'

export function ThemeStory({ theme }) {
  return (
    <section className="lex-story" aria-labelledby="theme-story-title">
      <div className="lex-story-copy" data-reveal>
        <p className="lex-story-eyebrow">{theme.storyEyebrow}</p>
        <h2 id="theme-story-title">{theme.storyTitle}</h2>
        <p className="lex-story-intro">{theme.story}</p>
        <ul className="lex-story-highlights" aria-label={`${theme.shortName}講座特色`}>
          {theme.highlights.map((highlight, index) => (
            <li key={highlight}>
              <span>0{index + 1}</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
      <figure className="lex-story-image" data-reveal>
        <img
          src={getThemeImage(theme, 'story')}
          alt={theme.imageAlt}
          loading="lazy"
          style={{ objectPosition: getThemeImagePosition(theme, 'story') }}
        />
        <figcaption>{theme.heroLead}</figcaption>
      </figure>
    </section>
  )
}
