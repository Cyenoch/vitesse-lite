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
      height: {
        screen: '100dvh',
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) + 2px)',
        sm: 'calc(var(--radius) - 2px)',
      },
      keyframes: {
      },
      animation: {
      },
    },
  },
  plugins: [animate, iconsPlugin(), dynamicIconsPlugin()],
} satisfies Config
