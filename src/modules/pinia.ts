import type { App } from "vue";
import { PiniaColada } from "@pinia/colada";
import { createPinia } from "pinia";

const pinia = createPinia();

export function install(app: App) {
  app.use(pinia);
  app.use(PiniaColada);
}
