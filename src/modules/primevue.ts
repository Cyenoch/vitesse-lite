import type { App } from 'vue'
import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'

export function install(app: App) {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      },
    },
  })
}
