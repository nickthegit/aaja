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
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      {
        hid: 'description',
        name: 'description',
        content:
          'Aaja is a full spectrum music bar, record label, live streaming and event space located in an old railway arch in the heart of Deptford, London.',
      },
    ],
    script: [
      { src: 'https://cdn.anny.co/widget/annyComponents.umd.latest.min.js', async: true, defer: true }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', href: 'https://aaja.radiocult.fm/stream', as: 'audio' },
      { rel: 'preload', href: 'https://aaja-2.radiocult.fm/stream', as: 'audio' }
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
  plugins: ['plugins/sanity-image-builder.js', 'plugins/track-events.js'],
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
    '@nuxtjs/redirect-module',

    // Doc: https://axios.nuxtjs.org/usage
    [
      'nuxt-social-meta',
      {
        url: 'https://aajamusic.com/',
        title: 'Aaja Music',
        site_name: 'Aaja Music',
        description:
          'Aaja is a full spectrum music bar, record label, live streaming and event space located in an old railway arch in the heart of Deptford, London. ',
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
    interval: 500,
    exclude: ['/residents/**'],
    // routes() {
    //   return client.fetch(query).then((residents) => {
    //     return residents.map((resident) => {
    //       return '/residents/' + resident.slug
    //     })
    //   })
    // },
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
