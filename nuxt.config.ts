// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
[
  "@nuxtjs/i18n",
  {
    locales: [
      { code: "es", language: "es-CO", file: "es.ts", name: "Español" },
      { code: "en", language: "en-US", file: "en.ts", name: "English" },
    ],
    defaultLocale: "es",
    lazy: true,
    langDir: "lang/",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },
],

  ],
  app: {
    baseURL: "/",
    buildAssetsDir: "/assets/",
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: 'es-CO',
      },
      title: 'Homie - Gestión Integral',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Gestión Integral para Administradoras de Propiedad Horizontal' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  css: ["animate.css", "@/assets/scss/main.scss", "primeicons/primeicons.css", "@fortawesome/fontawesome-free/css/all.css"],
  experimental: {
    payloadExtraction: false,
  },

  $production: {
    routeRules: {
      "/**": { isr: true },
    },
  },

  $development: {
    //
  },

  $env: {
    staging: {
      //
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "~/assets/scss/abstracts/_variables" as *;
            @use "~/assets/scss/abstracts/_mixins.scss";
          `,
        },
      },
    },
    vue: {
      customElement: true,
    },
    vueJsx: {
      mergeProps: true,
    },
  },

  vue: {
    propsDestructure: true,
  },

  pinia: {
    storesDirs: ['./stores', './app/stores'],
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api'
    }
  }
})