import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import './styles.css'
import { NewsArticle } from './pages/NewsArticle'
import { logoNews } from './news'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <NewsArticle article={logoNews} />
  </StrictMode>,
)
