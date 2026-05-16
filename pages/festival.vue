<template>
  <main>
    <section class="festival__hero">
      <section class="festival__hero-img">
        <aaja-hero-img
          v-if="hero"
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

    <template v-if="sortedYears && sortedYears.length">
      <article class="festival__content-wrapper">
        <aaja-container class="festival__content-years-button">
          <button
            v-for="yearObj in sortedYears"
            :key="yearObj._key || yearObj.year"
            class="festival-tab"
            :class="{ active: String(selectedYear) === String(yearObj.year) }"
            @click="selectYear(yearObj.year)"
          >
            <h2>{{ yearObj.year }}</h2>
          </button>
        </aaja-container>

        <aaja-container class="festival__content-display">
          <div v-if="activeFestival" class="festival__content-header" :key="activeFestival.year">
            <div v-if="activeFestival.headerText" class="festival__content-header-text">
              <p>{{ activeFestival.headerText }}</p>
            </div>
            
            <div class="festival__content-images">
              <transition name="fade" mode="out-in">
                <div :key="selectedYear" class="festival__content-images-inner">
                  <frame-grid
                    class="grid-container container"
                    :gap="gap"
                    :defaultDirection="defaultDirection"
                    :frame="isMobile ? mobileGrid : desktopGrid"
                    :rectSize="rectSize"
                    :useFrameFill="useFrameFill"
                  >
                    <div v-for="(item, index) in gallery" :key="item._key" class="item">
                      <template v-if="item._type === 'file'">
                        <video :key="item.url" controls muted preload="metadata" playsinline>
                          <source :src="item.url" type="video/mp4" />
                        </video>
                      </template>
                      <template v-else-if="item.desktop">
                        <img
                          :src="item.desktop[isMobile ? '400' : '800']"
                          @click="showMultiple(gallery, index)"
                        />
                      </template>
                    </div>
                  </frame-grid>
                </div>
              </transition>

              <vue-easy-lightbox
                :visible="visibleRef"
                :imgs="imgsRef"
                :index="indexRef"
                @hide="onHide"
              />
            </div>
          </div>
        </aaja-container>
      </article>
    </template>
  </main>
</template>

<script>
import { FrameGrid } from '@egjs/vue-grid'
import VueEasyLightbox from 'vue-easy-lightbox/dist/vue-easy-lightbox.esm.min.js'
import { cloudinaryHeroParser } from '~/utils/images'
import { createSEOMeta } from '~/utils/seo.js'
import { festivalPageQuery } from '~/utils/queries.js'
import AajaContainer from '~/components/AajaContainer.vue'
import AajaHeroImg from '~/components/AajaHeroImg.vue'
import AajaImg from '~/components/AajaImg.vue'
import AajaHeading from '~/components/AajaHeading.vue'

export default {
  components: {
    AajaContainer,
    AajaHeroImg,
    AajaImg,
    AajaHeading,
    FrameGrid,
    VueEasyLightbox,
  },
  head() {
    const title = 'Aaja - Creekside Festival'
    return {
      title,
      meta: createSEOMeta({
        title,
        description: this.festivalData?.headingIntro || 'Creekside Festival',
        image: 'https://aajamusic.com/_nuxt/img/creekside-transparent.55a5c78.png',
        url: 'https://aajamusic.com/festival',
        themeColor: 'black',
      }),
    }
  },
  async asyncData({ $sanity }) {
    const festivalData = await $sanity.fetch(festivalPageQuery)
    const data = festivalData[0] || {}
    const sorted = data.years ? [...data.years].sort((a, b) => b.year - a.year) : []
    return { 
      festivalData: data,
      selectedYear: sorted.length > 0 ? sorted[0].year : null
    }
  },
  data() {
    return {
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
      visibleRef: false,
      indexRef: 0,
      imgsRef: []
    }
  },
  computed: {
    hero() {
      if (!this.festivalData?.festivalHero) return null
      const image = this.$urlForSquare(this.festivalData.festivalHero, false, false)
      return cloudinaryHeroParser(image.desktop['1200'])
    },
    sortedYears() {
      if (!this.festivalData?.years) return []
      return [...this.festivalData.years].sort((a, b) => b.year - a.year)
    },
    activeFestival() {
      if (!this.sortedYears.length) return null
      return this.sortedYears.find(f => String(f.year) === String(this.selectedYear))
    },
    gallery() {
      let images = this.activeFestival?.media || []
      
      // Merge legacy root images if year is 2023
      if (Number(this.selectedYear) === 2023 && this.festivalData?.images) {
        images = [...images, ...this.festivalData.images]
      }

      return images.map((media) => {
        let parsedMedia = { _key: media._key, _type: media._type }
        if (media._type === 'image') {
          // Only process if asset reference exists to prevent crash
          if (media.asset) {
            parsedMedia = { ...parsedMedia, ...this.$urlForSquare(media, false, true) }
          } else {
            return null
          }
        } else if (media._type === 'file') {
          parsedMedia = { ...parsedMedia, url: this.$getFileAsset(media) }
        }
        return parsedMedia
      }).filter(item => item !== null)
    },
  },
  mounted() {
    if (process.client) {
      const handleTabletChange = (e) => { this.isMobile = e.matches }
      const mediaQuery = window.matchMedia('(max-width: 480px)')
      mediaQuery.addListener(handleTabletChange)
      handleTabletChange(mediaQuery)
    }
  },
  methods: {
    selectYear(year) {
      this.selectedYear = year
    },
    showMultiple(images, index) {
      const onlyImages = images.filter((img) => img._type === 'image' && img.desktop)
      this.imgsRef = onlyImages.map((image) => image.desktop['1800'])
      const clickedImage = images[index]
      const adjustedIndex = onlyImages.findIndex((img) => img._key === clickedImage._key)
      this.indexRef = adjustedIndex !== -1 ? adjustedIndex : 0
      this.onShow()
    },
    onHide() { this.visibleRef = false },
    onShow() { this.visibleRef = true }
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
  z-index: 100;

  button {
    background-color: transparent;
    color: var(--white);
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 10px;
    min-width: 44px;
    min-height: 44px;
    touch-action: manipulation;

    &.active {
      text-decoration: underline;
      font-weight: bold;
    }

    &:hover:not(.active) {
      color: var(--light-grey);
    }
    
    h2 {
      pointer-events: none;
    }
  }
}

.festival {
  &__hero {
    position: relative;
    z-index: 1;

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
      z-index: 50;

      button {
        &.active {
          text-decoration: underline;
        }
      }
    }

    &-header-text {
      margin-bottom: 30px;
    }

    &-images {
      &-images {
        padding-top: var(--globalPadding);
        min-height: 400px; /* Reduce vertical jump */

        .grid-container .item {
          background-color: rgba(255, 255, 255, 0.05);
          overflow: hidden;
          width: 33.33%; /* Fallback for desktop */

          @include breakpoint(mobile) {
            width: 50%; /* Fallback for mobile 2-col */
          }

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            display: block;
          }

          video {
            object-fit: cover;
            width: 100%;
            height: 100%;
            display: block;
          }
        }

        ::v-deep .vel-img-modal.vel-img-modal {
      ...
      }

      .fade-enter-active, .fade-leave-active {
      transition: opacity 0.5s ease;
      }
      .fade-enter, .fade-leave-to {
      opacity: 0;
      }
      </style>
}
</style>
