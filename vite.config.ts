import Legacy from "@vitejs/plugin-legacy";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import TurboConsole from "unplugin-turbo-console/vite";
import { VueRouterAutoImports } from "vue-router/unplugin";
import VueRouter from "vue-router/vite";
import { defineConfig } from "vite-plus";
import VueDevTools from "vite-plugin-vue-devtools";
import SvgLoader from "vite-svg-loader";

export default defineConfig(() => {
  const isTest = process.env.VITEST === "true";

  return {
    resolve: {
      tsconfigPaths: true,
    },
    test: {
      passWithNoTests: true,
    },

    server: {
      proxy: {
        "^/api": {
          target: process.env.API_PROXY_TARGET || "http://localhost:3000",
          changeOrigin: true,
          secure: false,
        },
      },
    },

    plugins: [
      // Share the same browser targets with Browserslist-based tooling.
      Legacy(),

      // https://router.vuejs.org/guide/file-based-routing.html
      VueRouter({
        dts: "src/types/route-map.d.ts",
      }),

      Vue({
        script: {
          propsDestructure: true,
          defineModel: true,
        },
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          "vue",
          "pinia",
          VueRouterAutoImports,
          {
            "vue-router/auto": ["useLink"],
          },
        ],
        dts: "src/types/auto-imports.d.ts",
        dirs: ["./src/composables"],
        vueTemplate: true,
      }),

      ...(isTest ? [] : [VueDevTools()]),

      SvgLoader({
        defaultImport: "component",
        svgo: true,
        svgoConfig: {
          plugins: ["preset-default"],
        },
      }),

      ...(isTest ? [] : [TurboConsole({})]),
    ],
  };
});
