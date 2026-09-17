import { useRef } from 'react'
import { HUB, THEMES, getThemeImage, getThemeImagePosition } from '../data/themes.js'
import { resolveThemeForDisplay } from '../lib/resolveThemeForDisplay.js'
import { useHeroCarousel } from './Hero.jsx'
import { SessionGlance } from './SessionGlance.jsx'

export function HubHero({ allSessions }) {
  const carouselRef = useRef(null)
  useHeroCarousel(carouselRef)
  const displayThemes = THEMES.map((theme) => resolveThemeForDisplay(theme, allSessions))

  return (
    <header className="lex-hero lex-hero--hub">
      <div className="lex-hero-bg lex-hero-carousel" ref={carouselRef} aria-hidden="true">
        {displayThemes.map((theme, index) => (
          <img
            key={theme.id}
            data-hero-slide=""
            {...(index === 0 ? { 'data-active': '' } : {})}
            src={getThemeImage(theme, 'hero')}
            alt=""
            style={{ objectPosition: getThemeImagePosition(theme, 'hero') }}
          />
        ))}
      </div>
      <div className="lex-hero-shade" aria-hidden="true" />
      <div className="lex-hero-inner lex-hero-copy">
        <h2 className="lex-hero-title">{HUB.title}</h2>        <p className="lex-hero-lead">
          四大主題全台開講——先看日期與城市，再選你有興趣的主題
        </p>
        <nav className="lex-pills" aria-label="主題捷徑">
          {THEMES.map((theme) => (
            <a key={theme.id} href={theme.pageUrl} style={{ '--accent': theme.accent }}>
              {theme.shortName}專頁
            </a>
          ))}
        </nav>
      </div>
      <SessionGlance inHero />
    </header>
  )
}
