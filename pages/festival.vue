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
      <aaja-container class="festival__content">
        <aaja-img v-for="(image, index) in gallery" :key="image._key" :class="`festival__content-img-${index + 1}`"
          altText="Creekside Festival" :desktopBg="image.desktopBlur" :mobileBg="image.mobileBlur"
          :desktopImgs="image.desktop" :mobileImgs="image.mobile" :ratio="index === 0 ? [31, 15] : [4, 3]"
          :ratioMobile="[111, 80]" :percentageOfViewportWidth="index != 0 ? 50 : 100" />
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { cloudinaryHeroParser, cloudinaryImgParser } from '~/utils/images'

import { festivalPageQuery } from '~/utils/queries.js'

import AajaContainer from '~/components/AajaContainer.vue'
import AajaHeroImg from '~/components/AajaHeroImg.vue'
import Logo from '~/assets/img/icons/logo.svg?inline'
import AajaImg from '~/components/AajaImg.vue'
import AajaHeading from '~/components/AajaHeading.vue'

export default {
  components: { AajaContainer, AajaHeroImg, Logo, AajaImg, AajaHeading },
  async asyncData({ $sanity }) {
    const festivalData = await $sanity.fetch(festivalPageQuery)
    console.log(festivalData[0].images)
    return { festivalData: festivalData[0] }
  },
  data() {
    return {
      heroImage: cloudinaryHeroParser(
        'https://cdn.sanity.io/images/ycpbe8x2/production/d5c60da420f671deaaf2ea796374a58bc26d1263-1440x1080.jpg'
      ),
      introText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      img1: cloudinaryImgParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620501076/Aaja/bar_view1.jpg',
        '31:15',
        '111:80'
      ),
      img2: cloudinaryImgParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620501056/Aaja/bar_view2.jpg',
        '4:3',
        '111:80'
      ),
      img3: cloudinaryImgParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620501038/Aaja/on_air.jpg',
        '4:3',
        '111:80'
      ),
    }
  },
  computed: {

    hero() {
      console.log(this.festivalData.images)
    },
    gallery() {
      return this.festivalData.images.map((img) => {
        return { ...this.$urlForSquare(img, false, false), _key: img._key }
      })
    },
  },
  mounted() {
    // console.log(this.gallery)
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
        flex-gap: 20px;
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
    display: grid;
    grid-template: auto auto auto / 50% 50%;
    justify-items: center;
    padding-top: var(--globalPadding);
    padding-bottom: var(--globalPadding);

    &-header {
      padding-top: var(--globalPadding)
    }

    &-intro {
      width: 100%;
      max-width: 800px;
      text-align: center;
      grid-row: 1 / 2;
      grid-column: 1 / 3;
      padding-bottom: var(--globalPadding);
    }

    img {
      width: 100%;
    }

    picture {
      width: 100%;
      position: relative;
      box-sizing: border-box;
    }

    &-img-1 {
      grid-row: 2 / 3;
      grid-column: 1 / 3;
      margin-bottom: calc(var(--globalPadding) / 2);
    }

    &-img-2,
    &-img-3 {
      grid-row: 3 / 4;
      width: calc(100% - 20px);

      @include breakpoint(mobile) {
        width: 100%;
        margin-bottom: calc(var(--globalPadding) / 2);
      }
    }

    &-img-2 {
      grid-column: 1 / 2;
      margin-right: 20px;

      @include breakpoint(mobile) {
        margin-right: 0;
        grid-column: 1 / 3;
      }
    }

    &-img-3 {
      grid-column: 2 / 3;
      margin-left: 20px;

      @include breakpoint(mobile) {
        margin-left: 0;
        grid-column: 1 / 3;
        grid-row: 4 / 5;
      }
    }
  }
}
</style>
