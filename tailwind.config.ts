import type { Config } from 'tailwindcss/types/config'
import { dynamicIconsPlugin, iconsPlugin } from '@egoist/tailwindcss-icons'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',

  content: [
    './src/**/*.{ts,tsx,vue}',
  ],

  theme: {
    extend: {
      colors: {
      },
    },
  },
  plugins: [animate, iconsPlugin(), dynamicIconsPlugin()],
} satisfies Config
