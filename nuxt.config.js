// import { createSEOMeta } from './utils/seo'
const query = `*[_type == "resident"] | order(name asc) {
  "slug": slug.current,
}`
const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: process.env.SANITY_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2021-08-18',
  useCdn: process.env.SANITY_CDN,
})

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
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    '@nuxtjs/sanity/module',
    '@nuxtjs/axios',
    '@nuxtjs/svg',
    '@nuxtjs/sitemap',
  ],
  sanity: {
    projectId: process.env.SANITY_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: process.env.SANITY_CDN,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    // Doc: https://axios.nuxtjs.org/usage
    [
      'nuxt-social-meta',
      {
        url: 'https://aajamusic.com/',
        title: 'Aaja Music',
        site_name: 'Aaja Music',
        description:
          'Aaja is a full spectrum music bar, record label, live streaming and event space located in an old railway arch in the heart of Deptford, London.',
        img: 'https://aajamusic.com/Aaja-hero.jpg',
        img_size: { width: '1200', height: '671' },
        locale: 'en_GB',
        twitter: '@aajamusic',
        twitter_card: 'summary_large_image',
        theme_color: '#theme-color',
      },
    ],
  ],
  pwa: {
    icon: {
      fileName: 'app-icon.png',
    },
  },
  sentry: {
    dsn: 'https://4a98917a38354151a9a5a6bd8f5045f7@o1007382.ingest.sentry.io/5970188', // Enter your project's DSN here
    // Additional Module Options go here
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
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
    interval: 2000,
    routes() {
      return client.fetch(query).then((residents) => {
        return residents.map((resident) => {
          return '/residents/' + resident.slug
        })
      })
    },
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
