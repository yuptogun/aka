// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/aka.css'],
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/content'],
  content: {
    highlight: {
      theme: 'monokai',
      langs: ['ts', 'php', 'python', 'shell', 'html', 'vue', 'yaml', 'json', 'sql', 'css'],
    },
  },
  nitro: {
    routeRules: {
      "/server/**": {
        proxy: 'http://localhost:3001/api/**',
      },
    },
  },
});
