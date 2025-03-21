import type { App } from 'vue'
import { createApp } from 'vue'
import AppSFC from './App.vue'

import './styles/main.scss'
import './utils/dayjs'

const app = createApp(AppSFC)

Object.values(
  import.meta.glob<{ install: (app: App) => void }>('./modules/*.ts', {
    eager: true,
  }),
).forEach(({
  install,
}) =>
  install(app),
)

app.mount('#app')
