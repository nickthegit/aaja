<template>
  <main>
    <section class="festival__hero">
      <section class="festival__hero-img">
        <!-- <img :src="hero" altText="Aaja festival Hero image"> -->
        <aaja-hero-img altText="Aaja festival Hero image" :landscapeBg="hero.landscapeBlur"
          :portraitBg="hero.portraitBlur" :landscapeImgs="hero.landscape" :portraitImgs="hero.portrait" />
      </section>
      <aaja-container class="festival__hero-header">
        <div class="festival__hero-header-wrapper">
          <aaja-heading-block :isFestival=true>
            <SanityContent :blocks="festivalData.heading" />
          </aaja-heading-block>
          <p v-if="festivalData.headingIntro" class="festival__hero-header-intro">{{ festivalData.headingIntro }}</p>
        </div>
      </aaja-container>
    </section>
    <article class="festival__content-wrapper">
      <aaja-container class="festival__content-button">
        <!-- <button  :class="'disabled'">
        <h2>2024</h2>
      </button> -->
        <button :class="'active'">
          <h2>2023</h2>
        </button>
      </aaja-container>
      <aaja-container class="festival__content-header">
        <div>
          <p>{{ festivalData.subHeading }}</p>
        </div>
      </aaja-container>
      <aaja-container class="festival__content-images">
        <frame-grid class="grid-container container " v-bind:gap="gap" v-bind:defaultDirection="defaultDirection"
          v-bind:frame="isMobile ? mobileGrid : desktopGrid" v-bind:rectSize="rectSize"
          v-bind:useFrameFill="useFrameFill">
          <div v-for="(image, index) in gallery" :key="image._key" :class="`item`">
            <img :src="image.desktop[isMobile ? '400' : '800']" @click="showMultiple(gallery, index)">
          </div>
        </frame-grid>
        <vue-easy-lightbox :visible="visibleRef" :imgs="imgsRef" :index="indexRef" @hide="onHide" />
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { ref } from 'vue';
import { FrameGrid } from "@egjs/vue-grid";
import VueEasyLightbox from 'vue-easy-lightbox/dist/vue-easy-lightbox.esm.min.js'

import { cloudinaryHeroParser } from '~/utils/images'
import { createSEOMeta } from '~/utils/seo.js'
import { festivalPageQuery } from '~/utils/queries.js'
import AajaContainer from '~/components/AajaContainer.vue'
import AajaHeroImg from '~/components/AajaHeroImg.vue'
import Logo from '~/assets/img/icons/logo.svg?inline'
import AajaImg from '~/components/AajaImg.vue'
import AajaHeading from '~/components/AajaHeading.vue'


export default {
  components: { AajaContainer, AajaHeroImg, Logo, AajaImg, AajaHeading, FrameGrid, VueEasyLightbox },
  head() {
    const title = 'Aaja - Creekside Festival';
    const description = this.festivalData?.headingIntro || 'Championing neighbourhood crews, DIY radio, local businesses & the unique spaces of Deptford, Creekside Festival is intimate multi-venue electronic music festival.';

    return {
      title,
      meta: createSEOMeta({
        title,
        description,
        image: 'https://aajamusic.com/_nuxt/img/creekside-transparent.55a5c78.png',
        url: 'https://aajamusic.com/festival',
        themeColor: 'black'
      }),
    }
  },
  async asyncData({ $sanity }) {
    const festivalData = await $sanity.fetch(festivalPageQuery)

    return { festivalData: festivalData[0] }
  },
  data() {
    return {
      isMobile: false,

      // heroImage: cloudinaryHeroParser(
      //   'https://cdn.sanity.io/images/ycpbe8x2/production/d5c60da420f671deaaf2ea796374a58bc26d1263-1440x1080.jpg'
      // ),
      gap: 5,
      defaultDirection: "end",
      rectSize: 0,
      useFrameFill: true,
      autoResize: true,
      useRoundedSize: true,
      desktopGrid: [[1, 1, 2, 3], [1, 1, 4, 5], [6, 7, 8, 8], [9, 10, 8, 8]],
      mobileGrid: [[1, 1, 2, 2], [1, 1, 2, 2]]
    }
  },
  setup() {
    const visibleRef = ref(false)
    const indexRef = ref(0);
    const imgsRef = ref([])

    const showMultiple = (images, index) => {
      imgsRef.value = images.map(image => image.desktop['1800']);
      indexRef.value = index;
      onShow();
    }
    const onHide = () => visibleRef.value = false;
    const onShow = () => visibleRef.value = true;

    return {
      visibleRef,
      indexRef,
      imgsRef,
      // showSingle,
      showMultiple,
      onHide
    }
  },
  computed: {
    hero() {
      const image = this.$urlForSquare(this.festivalData.festivalHero, false, false);
      const parsedImage = cloudinaryHeroParser(image.desktop['1200']);
      return parsedImage
    },
    gallery() {
      return this.festivalData.images?.map((img) => {
        const parsedImage = this.$urlForSquare(img, false, true)
        return { ...parsedImage, _key: img._key }
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
      opacity: 0.5;
    }

    &-header {
      position: absolute;
      flex: 1 0 auto;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100%;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-top: 80px;
      padding-bottom: 40px;

      @include breakpoint(mobile) {
        padding-top: 160px;
      }

      &-wrapper {
        width: 100%;
      }

      &-intro {
        width: 60%;
        margin-top: 20px;

        @include breakpoint(tablet-mobile) {
          width: 100%;
          margin-top: 13px;
        }
      }
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

    &-wrapper {
      padding-top: calc(var(--globalPadding) / 2);

      button {
        background-color: transparent;
        color: var(--white);
        border: none;

        &.active {
          text-decoration: underline;
        }

        &.disabled {
          color: grey;
        }
      }
    }

    /* &-header {

    } */

    &-images {
      padding-top: var(--globalPadding);

      .grid-container .item img {
        height: 100%;
        width: 100%;
      }

      .vel-img-modal.vel-img-modal {
        background: rgba(0, 0, 0, 0.95);
      }
    }
  }
}
</style>
