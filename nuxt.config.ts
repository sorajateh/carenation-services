// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

 app: {
   head: {
     title: 'Carenation Services',
     htmlAttrs: {
       lang: 'th',
     },
     charset: 'utf-8',
     viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
   }
 },

 devServer: {
  host: '0',
 },

 devtools: { enabled: true },

 sourcemap: false,

 css: [
   '@/assets/css/main.css',
 ],

 modules: [
  '@nuxt/ui',
  '@nuxt/image',
  '@nuxtjs/device',
  '@nuxtjs/tailwindcss',
  'nuxt-auth-utils',
  'nuxt-headlessui',
  '@nuxt/content',
 ],

 plugins: [
   '~/plugins/vue-avatar-cropper.client', 
 ],

 tailwindcss: {
   cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
   configPath: 'tailwind.config',
   exposeConfig: {
    level: 2
   },
   config: {},
   viewer: true,
 },

 image: {
  provider: "ipx",
 },

 headlessui: {
  prefix: 'Headless'
 },

 colorMode: {
   preference: 'light'
 },

 runtimeConfig: {
  oauth: {
    google: {
      clientId: '479644053294-vbm7l4lkhm3vtu4s2cckcoel1f58a2s5.apps.googleusercontent.com',
      clientSecret: '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',
      redirectURL: 'https://services.care-nation.com/auth/google'
    },
    facebook: {
      clientId: '469912849287649',
      clientSecret: '55594f4c4780411ef53b4436903f3e08',
      redirectURL: 'https://services.care-nation.com/auth/facebook'
    }
  },
  session: {
    password: 'e1eea8572e0849979a5b0e8e546a2c38',
    maxAge: 60 * 10
  },
  apiSecret: 'YWRtaW46WHo0KTY2RXJYbEJadFQwKVdWcFR6cWZj', // can be overridden by NUXT_API_SECRET environment variable
  public: {
    apiBase: 'https://care-nation.com/wp-json', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
  }
 },

 content: {
  watch: {
      ws: {
          hostname: '0'
      }
  }
 },

 compatibilityDate: '2024-08-17',

})