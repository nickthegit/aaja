<template>
  <main>
    <section class="festival__hero">
      <section class="festival__hero-img">
        <!-- <img :src="hero" altText="Aaja festival Hero image"> -->
        <aaja-hero-img
          altText="Aaja festival Hero image"
          :landscapeBg="hero.landscapeBlur"
          :portraitBg="hero.portraitBlur"
          :landscapeImgs="hero.landscape"
          :portraitImgs="hero.portrait"
        />
      </section>
      <aaja-container class="festival__hero-header">
        <div class="festival__hero-header-wrapper">
          <aaja-heading-block :isFestival="true">
            <SanityContent :blocks="festivalData.heading" />
          </aaja-heading-block>
          <p v-if="festivalData.headingIntro" class="festival__hero-header-intro">
            {{ festivalData.headingIntro }}
          </p>
        </div>
      </aaja-container>
    </section>
    <template v-if="sortedYears.length">
      <article class="festival__content-wrapper">
        <aaja-container class="festival__content-years-button">
          <button
            v-for="festival in sortedYears"
            :key="festival._key || festival.year"
            :class="{ active: Number(selectedYear) === Number(festival.year) }"
            @click="selectYear(festival.year)"
          >
            <h2>{{ festival.year }}</h2>
          </button>
        </aaja-container>
        <aaja-container class="festival__content-display">
          <template v-for="festival in tabContent">
            <div class="festival__content-header" :key="festival.year">
              <div v-if="festival.headerText">
                <p>{{ festival.headerText }}</p>
              </div>
              <div class="festival__content-images">
                <frame-grid
                  class="grid-container container"
                  v-bind:gap="gap"
                  v-bind:defaultDirection="defaultDirection"
                  v-bind:frame="isMobile ? mobileGrid : desktopGrid"
                  v-bind:rectSize="rectSize"
                  v-bind:useFrameFill="useFrameFill"
                >
                  <div v-for="(image, index) in gallery" :key="image._key" :class="`item`">
                    <template v-if="image._type === 'file'">
                      <video :key="image.url" controls muted>
                        <source :src="image.url" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </template>
                    <template v-else>
                      <img
                        :src="image.desktop[isMobile ? '400' : '800']"
                        @click="showMultiple(gallery, index)"
                      />
                    </template>
                  </div>
                </frame-grid>
                <vue-easy-lightbox
                  :visible="visibleRef"
                  :imgs="imgsRef"
                  :index="indexRef"
                  @hide="onHide"
                />
              </div>
            </div>
          </template>
        </aaja-container>
      </article>
    </template>
  </main>
</template>

<script>
import { ref } from 'vue'
import { FrameGrid } from '@egjs/vue-grid'
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
  components: {
    AajaContainer,
    AajaHeroImg,
    Logo,
    AajaImg,
    AajaHeading,
    FrameGrid,
    VueEasyLightbox,
  },
  head() {
    const title = 'Aaja - Creekside Festival'
    const description =
      this.festivalData?.headingIntro ||
      'Championing neighbourhood crews, DIY radio, local businesses & the unique spaces of Deptford, Creekside Festival is intimate multi-venue electronic music festival.'

    return {
      title,
      meta: createSEOMeta({
        title,
        description,
        image: 'https://aajamusic.com/_nuxt/img/creekside-transparent.55a5c78.png',
        url: 'https://aajamusic.com/festival',
        themeColor: 'black',
      }),
    }
  },
  async asyncData({ $sanity }) {
    const festivalData = await $sanity.fetch(festivalPageQuery)

    return { festivalData: festivalData[0] }
  },
  data() {
    return {
      selectedYear: null,
      isMobile: false,
      gap: 5,
      defaultDirection: 'end',
      rectSize: 0,
      useFrameFill: true,
      autoResize: true,
      useRoundedSize: true,
      desktopGrid: [
        [1, 1, 2, 3],
        [1, 1, 4, 5],
        [6, 7, 8, 8],
        [9, 10, 8, 8],
      ],
      mobileGrid: [
        [1, 1, 2, 2],
        [1, 1, 2, 2],
      ],
    }
  },
  setup() {
    const visibleRef = ref(false)
    const indexRef = ref(0)
    const imgsRef = ref([])

    const showMultiple = (images, index) => {
      // Filter to only include images and correctly calculate the index based on images only
      const onlyImages = images.filter(img => img._type === 'image')
      imgsRef.value = onlyImages.map((image) => image.desktop['1800'])
      
      // We need to adjust the index since we removed the video elements from the array
      const clickedImage = images[index];
      const adjustedIndex = onlyImages.findIndex(img => img._key === clickedImage._key);
      
      indexRef.value = adjustedIndex !== -1 ? adjustedIndex : 0;
      onShow()
    }
    const onHide = () => (visibleRef.value = false)
    const onShow = () => (visibleRef.value = true)

    return {
      visibleRef,
      indexRef,
      imgsRef,
      // showSingle,
      showMultiple,
      onHide,
    }
  },
  computed: {
    hero() {
      const image = this.$urlForSquare(this.festivalData.festivalHero, false, false)
      const parsedImage = cloudinaryHeroParser(image.desktop['1200'])
      return parsedImage
    },
    sortedYears() {
      if (!this.festivalData || !this.festivalData.years) return [];
      return [...this.festivalData.years].sort((a, b) => b.year - a.year);
    },
    gallery() {
      if (!this.festivalData || !this.festivalData.years) return [];
      const currentYearData = this.festivalData.years.find((festival) => Number(festival.year) === Number(this.selectedYear));
      const images = currentYearData?.media || [];
      const formattedMedia = images.map((media) => {
        let parsedMedia = {}
        if (media._type === 'image') {
          parsedMedia = this.$urlForSquare(media, false, true)
        } else if (media._type === 'file') {
          parsedMedia = { url: this.$getFileAsset(media) }
        }
        return { ...parsedMedia, _key: media._key, _type: media._type }
      })
      return formattedMedia
    },
  tabContent() {
    if (!this.festivalData || !this.festivalData.years) return [];
    return this.festivalData.years.filter((festival) => Number(festival.year) === Number(this.selectedYear))
  },
  },
  created() {
    if (this.sortedYears.length > 0) {
      this.selectedYear = this.sortedYears[0].year;
    }
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
  methods: {
    selectYear(year) {
      console.log('SELECTING YEAR FROM CLICK:', year)
      this.selectedYear = year
    }
  },
}
</script>

<style lang="scss" scoped>
.festival__content-display {
  video {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.festival__content-years-button {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  position: relative;
  z-index: 10;
  
  button {
    background-color: transparent;
    color: var(--white);
    border: none;
    font-size: 16px;
    cursor: pointer;

    &.active {
      text-decoration: underline;
      font-weight: bold;
    }

    &:hover:not(.active) {
      color: var(--light-grey);
    }
  }
}

.festival {
  &__hero {
    position: relative;

    &-img {
      width: 100%;
      height: 100vh;
      position: relative;
      z-index: 1;
      opacity: 0.5;
      pointer-events: none;
    }

    &-header {
      position: absolute;
      flex: 1 0 auto;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100vh;
      pointer-events: none;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-top: 80px;
      padding-bottom: 40px;

      @include breakpoint(mobile) {
        padding-top: 160px;
        height: 100vh;
      }

      &-wrapper {
        width: 100%;
        pointer-events: auto;
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
  }

  &__content {
    display: block;

    &-wrapper {
      padding-top: calc(var(--globalPadding) / 2);
      position: relative;
      z-index: 20;

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
