/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue'

import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Layouts from 'vite-plugin-vue-layouts'
import SvgLoader from 'vite-svg-loader'
import TsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      /* options */
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
        'vue',
        '@vueuse/core',
        'pinia',
        'vue-i18n',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
          '@tanstack/vue-query': ['useQuery', 'useQueryClient'],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      globalNamespaces: ['ui'],
    }),

    // https://devtools-next.vuejs.org
    VueDevTools(),

    TsconfigPaths(),

    SvgLoader({
      defaultImport: 'component',
      svgo: true,
      svgoConfig: {
        plugins: [
          'preset-default',
        ],
      },
    }),

    TurboConsole({}),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
