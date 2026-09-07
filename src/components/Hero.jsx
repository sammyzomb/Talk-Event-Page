import { useEffect, useRef } from 'react'
import { getThemeImage, getThemeImagePositions } from '../data/themes.js'
import { SessionGlance } from './SessionGlance.jsx'
import { prefersReducedMotion } from './shared.jsx'
const CAROUSEL_MS = 2000
const THEME_SLIDE_SLOTS = ['hero', 'showcase', 'section']

export function useHeroCarousel(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return undefined

    const slides = root.querySelectorAll('[data-hero-slide]')
    if (slides.length <= 1) return undefined

    let index = 0
    const timer = window.setInterval(() => {
      slides[index].removeAttribute('data-active')
      index = (index + 1) % slides.length
      slides[index].setAttribute('data-active', '')
    }, CAROUSEL_MS)

    return () => window.clearInterval(timer)
  }, [rootRef])
}

function themeCarouselSlides(theme) {
  const seen = new Set()
  const slides = []
  for (const slot of THEME_SLIDE_SLOTS) {
    const src = getThemeImage(theme, slot)
    if (!src || seen.has(src)) continue
    seen.add(src)
    const positions = getThemeImagePositions(theme, slot)
    slides.push({
      src,
      slot,
      positionDesktop: positions.desktop,
      positionMobile: positions.mobile,
      key: `${theme.id}-${slot}`,
    })
  }
  return slides
}

export function Hero({ theme }) {
  const carouselRef = useRef(null)
  useHeroCarousel(carouselRef)
  const slides = themeCarouselSlides(theme)
  return (
    <header
      className="lex-hero lex-hero--theme"
      data-theme={theme.id}
      style={{ '--accent': theme.accent, '--accent-soft': theme.accentSoft }}
    >
      <div className="lex-hero-bg lex-hero-carousel" ref={carouselRef} aria-hidden="true">
        {slides.map((slide, index) => (
          <img
            key={slide.key}
            data-hero-slide=""
            data-hero-slot={slide.slot}
            {...(index === 0 ? { 'data-active': '' } : {})}
            src={slide.src}
            alt=""
            style={{
              '--hero-pos-mobile': slide.positionMobile,
              '--hero-pos-desktop': slide.positionDesktop,
            }}
          />
        ))}
      </div>
      <div className="lex-hero-shade" aria-hidden="true" />
      <div className="lex-hero-inner lex-hero-copy">
        <h2 className="lex-hero-title">{theme.name}</h2>
        <p className="lex-hero-lead">{theme.tagline}</p>
      </div>
      <SessionGlance inHero />
    </header>
  )
}
