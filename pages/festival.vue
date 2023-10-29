<template>
  <main>
    <section class="festival__hero">
      <section class="festival__hero-img">
        <aaja-hero-img altText="Aaja festival Hero image" :landscapeBg="heroImage.landscapeBlur"
          :portraitBg="heroImage.portraitBlur" :landscapeImgs="heroImage.landscape" :portraitImgs="heroImage.portrait" />
      </section>
      <aaja-container class="festival__hero-header">
        <aaja-heading-block>
          <SanityContent :blocks="festivalData.heading" />
        </aaja-heading-block>
      </aaja-container>
    </section>
    <article>
      <aaja-container class="festival__content-header">
        <div>
          <p>{{ festivalData.subHeading }}</p>
        </div>
      </aaja-container>
      <aaja-container class="festival__content-images">
        <frame-grid
          class="grid-container container "
          v-bind:gap="gap"
          v-bind:defaultDirection="defaultDirection"
          v-bind:frame="isMobile ? mobileGrid : desktopGrid"
          v-bind:rectSize="rectSize"
          v-bind:useFrameFill="useFrameFill"
        >
        <div v-for="(image, index) in gallery" :key="image._key" :class="`item`">
          <img class="test" :src="image.desktop['1200']">
        </div>
       </frame-grid>
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { FrameGrid } from "@egjs/vue-grid";

import { cloudinaryHeroParser } from '~/utils/images'
import { festivalPageQuery } from '~/utils/queries.js'
import AajaContainer from '~/components/AajaContainer.vue'
import AajaHeroImg from '~/components/AajaHeroImg.vue'
import Logo from '~/assets/img/icons/logo.svg?inline'
import AajaImg from '~/components/AajaImg.vue'
import AajaHeading from '~/components/AajaHeading.vue'


export default {
  components: { AajaContainer, AajaHeroImg, Logo, AajaImg, AajaHeading,FrameGrid },
  async asyncData({ $sanity }) {
    const festivalData = await $sanity.fetch(festivalPageQuery)
    return { festivalData: festivalData[0] }
  },
  data() {
    return {
      isMobile: false,

      heroImage: cloudinaryHeroParser(
        'https://cdn.sanity.io/images/ycpbe8x2/production/d5c60da420f671deaaf2ea796374a58bc26d1263-1440x1080.jpg'
      ),
      introText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      gap: 5,
      defaultDirection: "end",
      rectSize: 0,
      useFrameFill: true,
      autoResize: true,
      useRoundedSize	: true,
      desktopGrid:  [[1, 1, 2, 3], [1, 1, 4, 5], [6, 7, 8, 8], [9, 10, 8, 8]],
      mobileGrid: [[1,1,2,2], [1,1,2,2]]
    }
  },
  computed: {

    hero() {
      console.log(this.festivalData.images)
    },
    gallery() {
      return this.festivalData.images.map((img) => {
        return { ...this.$urlForSquare(img, false, true), _key: img._key }
      })
    },
  },
  created() {
    if (process.client) {
      let vm = this
      const mediaQuery = window.matchMedia('(max-width: 480px)')
      function handleTabletChange(e) {
        vm.isMobile = e.matches
      }
      mediaQuery.addListener(handleTabletChange)
      handleTabletChange(mediaQuery)
    }
  },
  mounted() {
    if (process.client) {
      let vm = this
      const mediaQuery = window.matchMedia('(max-width: 480px)')
      function handleTabletChange(e) {
        vm.isMobile = e.matches
      }
      mediaQuery.addListener(handleTabletChange)
      handleTabletChange(mediaQuery)
    }
  },
}
</script>

<style lang="scss" scoped>
.festival__ {
  &hero {
    &-img {
      width: 100%;
      height: 100vh;
      position: relative;
      z-index: 1;
      opacity: 0.2;
    }

    &-header {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 80px;
      padding-bottom: 40px;
    }

    &-opening {
      p {
        text-transform: uppercase;
        margin-bottom: 20px;
      }

      strong {
        font-weight: 600;
        font-size: 20px;

        @include breakpoint(mobile) {
          font-size: 16px;
        }
      }

      .button-wrap {
        display: flex;
        gap: 20px;
        margin-top: 30px;
      }

      a {
        width: 140px;
        height: 40px;
        display: flex;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        background: var(--white);
        color: var(--dark);
        text-decoration: none;
        cursor: pointer;

        &:hover {
          opacity: 0.75;
          text-decoration: underline;
        }
      }
    }
  }

  &content {
    display: block;

    &-header {
      padding-top: var(--globalPadding);
    }

    &-images {
      padding-top: var(--globalPadding);
    }

    &-intro {
      width: 100%;
      max-width: 800px;
      text-align: center;
      grid-row: 1 / 2;
      grid-column: 1 / 3;
      padding-bottom: var(--globalPadding);
    }

  }
}

.grid-container .item img {
  height:100%;
  width: 100%;
 }
</style>
