import { type App, createApp } from 'vue'
import AppSFC from './App.vue'

import './styles/main.scss'

const app = createApp(AppSFC)

Object.values(
  import.meta.glob<{ install: (app: App) => void }>('./lib/modules/*.ts', {
    eager: true,
  }),
).forEach(({
  install,
}) =>
  install(app),
)

app.mount('#app')
