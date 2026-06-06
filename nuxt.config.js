import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: process.env.SANITY_ID || 'ycpbe8x2',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
})

export default {
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static', // also could ber server
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Aaja Music',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      {
        hid: 'description',
        name: 'description',
        content: 'Aaja is a multi-purpose community radio station, event space and bar. Situated along Deptford High street, the local cultural hub hosts an eclectic mix of radio hosts, DJs and events. Open since 2018, Aaja has provided a space that has nurtured and aided the growth of creative minds and groups within South-East London and beyond.',
      },
    ],
    script: [
      // { src: 'https://cdn.anny.co/widget/annyComponents.umd.latest.min.js', async: true, defer: true }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', href: 'https://aaja.radiocult.fm/stream', as: 'audio' },
      { rel: 'preload', href: 'https://aaja-2.radiocult.fm/stream', as: 'audio' },
      { rel: 'preconnect', href: 'https://cdn.sanity.io' },
      // { rel: 'preconnect', href: 'https://cdn.anny.co' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    ],
  },
  // router: {
  //   mode: 'hash',
  // },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/_all.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    'plugins/sanity-image-builder.js',
    'plugins/sanity-files-builder.js',
    'plugins/viewport.client.js',
    'plugins/swiper.client.js',
    'plugins/vue-easy-lightbox.client.js',
  ],
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
    useCdn: process.env.SANITY_CDN === 'true',
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    '@nuxtjs/redirect-module',

    // Doc: https://axios.nuxtjs.org/usage
    [
      'nuxt-social-meta',
      {
        url: 'https://aajamusic.com/',
        title: 'Aaja Music',
        site_name: 'Aaja Music',
        description: 'Aaja is a multi-purpose community radio station, event space and bar. Situated along Deptford High street, the local cultural hub hosts an eclectic mix of radio hosts, DJs and events. Open since 2018, Aaja has provided a space that has nurtured and aided the growth of creative minds and groups within South-East London and beyond.',
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
  redirect: [{ from: '^/chat', to: 'https://app.radiocult.fm/embed/chat/aaja?theme=midnight&primaryColor=%2384D8F9&corners=rounded' }],
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
    interval: 100,
    routes() {
      return client
        .fetch(`*[_type == "resident" && defined(slug.current)]{ "slug": slug.current }`)
        .then((residents) => residents.map((r) => `/residents/${r.slug}`))
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['gsap'],
    extend(config, { isDev, isClient, isServer }) {
      // ..

      config.node = {
        net: 'empty',
        http2: 'empty',
        dns: 'empty',
        fs: 'empty',
        tls: 'empty',
      }

      // Sets webpack's mode to development if `isDev` is true.
    },
  },
}
