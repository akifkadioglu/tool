// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@formkit/auto-animate",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    classSuffix: "",
    fallback: "dark",
  },
  css: ["assets/app.css", "assets/animation.css"],
});
