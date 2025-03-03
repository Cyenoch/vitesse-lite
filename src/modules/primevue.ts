import type { App } from 'vue'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'

export function install(app: App) {
  app.use(PrimeVue, {
    theme: {
      preset: definePreset(Aura, {
        components: {},
        semantic: {
          colorScheme: {
            light: {
              primary: {
                color: '#e99a46',
                contrastColor: '#ffffff',
              },
            },
          },
        },
      }),
      options: {
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primevue, tailwind-utilities',
        },
        darkModeSelector: '.dark',
      },
    },
  })
}
