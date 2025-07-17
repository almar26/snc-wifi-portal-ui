import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Network Access Login',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [], // Add any global stylesheets or favicons here
    }
  },
  css: ['@/assets/css/main.css'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // config.plugins.push(vuetify({ autoImport: true }))
        config.plugins?.push(
          vuetify({
            styles: {
              configFile: 'assets/settings.scss', // Optional: for custom SASS variables
            },
          })
        )
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
