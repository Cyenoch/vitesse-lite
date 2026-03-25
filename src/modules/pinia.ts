import type { App } from "vue";
import { PiniaColada } from "@pinia/colada";
import { createPinia } from "pinia";
import { useThemeStoreForApp } from "@/composables/stores/use-theme-store";

const pinia = createPinia();

export function install(app: App) {
  app.use(pinia);
  app.use(PiniaColada);
  useThemeStoreForApp(pinia).initialize();
}
