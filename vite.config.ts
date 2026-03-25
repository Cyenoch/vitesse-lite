import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import TurboConsole from "unplugin-turbo-console/vite";
import Components from "unplugin-vue-components/vite";
import VueMacros from "unplugin-vue-macros/vite";
import { VueRouterAutoImports } from "vue-router/unplugin";
import VueRouter from "vue-router/vite";
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";
import Layouts from "vite-plugin-vue-layouts";
import SvgLoader from "vite-svg-loader";
import TsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    target: "es2015",
  },

  plugins: [
    // https://router.vuejs.org/guide/file-based-routing.html
    VueRouter({
      dts: "src/route-map.d.ts",
    }),

    VueMacros({
      defineOptions: false,
      defineModels: false,
      // not compatible with Shadcn Vue
      betterDefine: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "@vueuse/core",
        "pinia",
        "vue-i18n",
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          "vue-router/auto": ["useLink"],
          "@tanstack/vue-query": ["useQuery", "useQueryClient"],
          "@/utils/dayjs": [["default", "dayjs"]],
        },
      ],
      dts: true,
      dirs: ["./src/composables"],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
    }),

    // https://devtools-next.vuejs.org
    VueDevTools(),

    TsconfigPaths(),

    SvgLoader({
      defaultImport: "component",
      svgo: true,
      svgoConfig: {
        plugins: ["preset-default"],
      },
    }),

    TurboConsole({}),
  ],
});
