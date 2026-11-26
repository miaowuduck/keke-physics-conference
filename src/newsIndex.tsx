import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './styles.css'
import { News } from './pages/News'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <News />
  </StrictMode>,
)
