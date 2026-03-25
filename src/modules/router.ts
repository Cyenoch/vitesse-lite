import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { handleHotUpdate, routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.keepPreviousScrollPosition) {
      return;
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

if (import.meta.hot) {
  handleHotUpdate(router, (newRoutes) => {
    newRoutes.forEach((route) => {
      router.addRoute(route);
    });
  });
}

export function install(app: App) {
  app.use(router);
}
