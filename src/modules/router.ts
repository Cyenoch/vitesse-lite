import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

function generateLayoutsRoutes(originRoutes: RouteRecordRaw[]) {
  return setupLayouts(originRoutes)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: generateLayoutsRoutes(routes),
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.keepPreviousScrollPosition) {
      return
    }
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { top: 0 }
    }
  },
})

if (import.meta.hot) {
  handleHotUpdate(router, (newRoutes) => {
    const withLayoutsRoutes = generateLayoutsRoutes(newRoutes)
    withLayoutsRoutes.forEach((route) => {
      router.addRoute(route)
    })
  })
}

export function install(app: App) {
  app.use(router)
}
