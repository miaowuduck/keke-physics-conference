import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        main: 'index.html',
        schedule: 'schedule.html',
        news: 'news.html',
        newsArticle: 'news-2026-11-25.html',
        newsLogo: 'news-2026-11-26.html',
      },
    },
  },
})
