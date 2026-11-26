import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './schedule.html',
    './news.html',
    './news-2026-11-25.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#192042',
        deep: '#212A54',
        deeper: '#10162F',
        line: '#3A4470',
        bone: '#E7E4D2',
        mute: '#9AA3C4',
        gold: '#F0CE7B',
        golddeep: '#D9B45E',
        volt: '#2B82B5',
        voltlight: '#7CC4F0',
        ember: '#EB6100',
      },
      fontFamily: {
        display: ['"Anybody Variable"', 'sans-serif'],
        sans: [
          '"Inter Variable"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'monospace',
        ],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pinpulse: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.18' },
          '50%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        pinpulse: 'pinpulse 2s ease-out infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
