import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './styles.css'
import { Schedule } from './pages/Schedule'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Schedule />
  </StrictMode>,
)
