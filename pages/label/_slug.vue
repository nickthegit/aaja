<template>
  <main>
    <aaja-slug-hero breadcrumbDestination="label" :heroImage="epData.img">
      <template v-slot:subheading>{{ epData.name }}</template>
      <template v-slot:heading>{{ epData.title }}</template>
    </aaja-slug-hero>
    <article>
      <aaja-container class="record-item__content">
        <section class="record-item__copy">
          <SanityContent :blocks="epData.text" />
        </section>
        <aside v-if="epData.link">
          <span v-html="epData.embed.html"></span>
          <a :href="epData.link" target="_blank" rel="noopener noreferrer"
            >Buy now</a
          >
        </aside>
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { cloudinaryImgParser } from '~/utils/images'
import AajaSlugHero from '~/components/AajaSlugHero.vue'
export default {
  components: { AajaSlugHero },
  async asyncData({ $urlForSquare, $sanity, params, $axios }) {
    const data = await $sanity.fetch(
      `*[_type == "ep" && slug.current == "${params.slug}"][0]`
    )

    let url, embed
    if (data.link) {
      url = await data.link

      let parseUrl = await url
        .replace('http', '')
        .replace('s://', '')
        .replace('://mixcloud', 'api.mixcloud')
        .replace('://', '')
        .replace('www', 'api')
        .trim()

      url =
        (await parseUrl.charAt(parseUrl.length - 1)) === '/'
          ? parseUrl
          : parseUrl + '/'

      url = (await 'https://') + url

      url = await `${url.replace('www', 'api').trim()}embed-json?color=02ff1a`

      await $axios.$get(url).then((res) => {
        embed = res
        console.log(res)
      })
    }
    // let url = await 'https://www.mixcloud.com/AAJAdeptford/earnshaw-mellow-music-episode-004/',

    let img = await $urlForSquare(data.feature_image, false, true)

    return { epData: { ...data, img, embed } }
  },
  data() {
    return {
      record:
        'https://www.mixcloud.com/AAJAdeptford/earnshaw-mellow-music-episode-004/',
    }
  },
  computed: {},
  mounted() {
    console.log('EP_DATA', this.epData)
  },
  head: {
    htmlAttrs: {
      class: 'light',
    },
  },
}
</script>

<style lang="scss" scoped>
.record-item__content {
  display: grid;
  grid-template: auto / 1fr 33%;
  gap: 40px;
  @include breakpoint(mobile) {
    grid-template: auto / 100%;
  }
}
.record-item__copy {
  width: 100%;
  max-width: 680px;
  padding: var(--globalPadding) 0;
  @include breakpoint(mobile) {
    grid-row: 2 / 3;
  }
}
aside {
  span {
    display: block;
    width: 100%;
    position: sticky;
    background: var(--primary);
    top: 20px;
    width: 100%;
  }
  iframe {
  }
  a {
    display: inline-block;
    padding: 9px 30px;
    position: sticky;
    top: 170px;
    color: var(--white);
    background: var(--mainColor);
    text-decoration: none;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 1px;
    margin-top: 30px;

    text-align: center;
    &:hover {
      opacity: 0.7;
    }
    @include breakpoint(mobile) {
      width: 100%;
      padding: 16px 30px;
    }
  }
  @include breakpoint(mobile) {
    grid-row: 1 / 2;
  }
}
</style>
