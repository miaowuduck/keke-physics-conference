import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './styles.css'
import { NewsArticle } from './pages/NewsArticle'
import { registrationNews } from './news'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <NewsArticle article={registrationNews} />
  </StrictMode>,
)
