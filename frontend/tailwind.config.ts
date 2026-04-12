import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        lao: ['var(--font-hinsiew)', 'system-ui', 'sans-serif'],
        thai: ['var(--font-noto-thai)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
} satisfies Config
