import { useEffect, useRef } from 'react'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useScrollReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return undefined

    root.setAttribute('data-anim', '')
    const targets = root.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.setAttribute('data-revealed', '')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [rootRef])
}

export function SectionHeading({ eyebrow, title, children, id }) {
  return (
    <header className="lex-section-head" data-reveal>
      <span>{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  )
}
