import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LecturePage } from '../components/LecturePage.jsx'
import { getThemeById } from '../data/themes.js'
import { SESSIONS } from '../data/sessions/synced.js'
import '../styles/lecture.css'

const theme = getThemeById('russia')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LecturePage theme={theme} allSessions={SESSIONS} pageUrl={theme.pageUrl} />
  </StrictMode>,
)
