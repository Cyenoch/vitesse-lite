import type { App } from 'vue'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
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
                contrastColor: '#ffffff'
              }
            },
          },
        },
      }),
      options: {
        darkModeSelector: '.dark',
      },
    },
  })
}
