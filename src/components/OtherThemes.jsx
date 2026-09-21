import { CMS_HUB } from '../data/cmsPages.js'
import { HUB, THEMES, getThemeImage, getThemeImagePosition } from '../data/themes.js'
import { formatDisplayMonthLabel, getDisplayMonthKeys, sessionEndIso } from '../lib/sessionUtils.js'
import { getNextSession } from '../lib/filterSessions.js'
import { resolveThemeForDisplay } from '../lib/resolveThemeForDisplay.js'
import { SectionHeading } from './shared.jsx'

export function OtherThemes({ currentThemeId, sessions }) {
  const monthLabel = formatDisplayMonthLabel(getDisplayMonthKeys())
  const others = THEMES.filter((t) => t.id !== currentThemeId)

  return (
    <section className="lex-others" aria-labelledby="others-title">
      <SectionHeading eyebrow="MORE" title="其他活動" id="others-title">
        探索其他主題講座
      </SectionHeading>
      <div className="lex-others-grid">
        {others.map((theme) => {
          const displayTheme = resolveThemeForDisplay(theme, sessions)
          const preview = getNextSession(sessions, theme.id)
          const previewEnd = preview ? sessionEndIso(preview) : ''
          return (
            <a
              key={theme.id}
              className="lex-other-card"
              href={displayTheme.pageUrl}
              data-reveal
              style={{ '--accent': displayTheme.accent, '--accent-soft': displayTheme.accentSoft }}
            >
              <span className="lex-other-card-image">
                <img
                  src={getThemeImage(displayTheme, 'showcase')}
                  alt=""
                  loading="lazy"
                  style={{ objectPosition: getThemeImagePosition(displayTheme, 'showcase') }}
                />
              </span>
              <span className="lex-other-card-copy">
                <small>{monthLabel}</small>
                <strong className="lex-other-card-title">{theme.name}</strong>
                <span
                  className="lex-other-card-meta"
                  {...(previewEnd ? { 'data-lex-end': previewEnd } : {})}
                >
                  {preview ? `${preview.date} ${preview.region}` : '本月場次請見專頁'}
                </span>
                <span className="lex-other-card-cta">前往專頁 →</span>
              </span>
            </a>
          )
        })}
        <a
          className="lex-other-card"
          href={HUB.pageUrl}
          data-reveal
          style={{ '--accent': '#0eaec4', '--accent-soft': '#e0f7fa' }}
        >
          <span className="lex-other-card-image">
            <img src={CMS_HUB.meta.ogImage} alt="" loading="lazy" />
          </span>
          <span className="lex-other-card-copy">
            <small>{monthLabel}</small>
            <strong className="lex-other-card-title">{HUB.title}</strong>
            <span className="lex-other-card-meta">一次瀏覽四大主題與其他場次</span>
            <span className="lex-other-card-cta">查看總覽 →</span>
          </span>
        </a>
      </div>
    </section>
  )
}
