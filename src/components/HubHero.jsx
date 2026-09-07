import { useRef } from 'react'
import { HUB, THEMES } from '../data/themes.js'
import { useHeroCarousel } from './Hero.jsx'
import { SessionGlance } from './SessionGlance.jsx'

export function HubHero() {
  const carouselRef = useRef(null)
  useHeroCarousel(carouselRef)
  return (
    <header className="lex-hero lex-hero--hub">
      <div className="lex-hero-bg lex-hero-carousel" ref={carouselRef} aria-hidden="true">
        {THEMES.map((theme, index) => (
          <img
            key={theme.id}
            data-hero-slide=""
            {...(index === 0 ? { 'data-active': '' } : {})}
            src={theme.heroImage}
            alt=""
            style={{ objectPosition: theme.heroPosition }}
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
