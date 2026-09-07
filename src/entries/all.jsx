import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LectureHub } from '../components/LectureHub.jsx'
import { HUB } from '../data/themes.js'
import { SESSIONS } from '../data/sessions/synced.js'
import '../styles/lecture.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LectureHub allSessions={SESSIONS} pageUrl={HUB.pageUrl} />
  </StrictMode>,
)
