import { createSEOMeta } from './utils/seo'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server', // also could ber server
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Aaja Radio',
    meta: [
      ...createSEOMeta({
        title: 'Aaja Radio',
        description: 'Aaja Radio',
        image: '[Insert_NarutoDose_Image_URL]',
        url: process.env.HOST_NAME,
      }),
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/_all.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['plugins/sanity-image-builder.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/style-resources', '@nuxtjs/dotenv', '@nuxtjs/sanity/module'],
  sanity: {
    projectId: process.env.SANITY_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: process.env.SANITY_CDN,
    minimal: true,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/svg',
  ],
  pwa: {
    icon: {
      fileName: 'app-icon.png',
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  sitemap: {
    hostname: process.env.HOST_NAME,
    exclude: [
      '/404',
      '/error',
      // '/admin/**'
    ],
    // routes: async () => {
    // const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    // return data.map((user) => `/users/${user.username}`)
    // }
    // options
  },
  styleResources: {
    scss: [
      './assets/scss/_variables.scss', // use underscore "_" & also file extension ".scss"
      './assets/scss/_mediaquery.scss',
    ],
  },
  generate: {
    fallback: true,
  },
  server: {
    port: 5454, // default: 3000
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['gsap'],
  },
}
