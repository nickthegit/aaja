<template>
  <main>
    <section class="studio__hero">
      <section class="studio__hero-img">
        <!-- <img :src="hero" altText="Aaja studio Hero image"> -->
        <aaja-hero-img altText="Aaja studio Hero image" :landscapeBg="hero.landscapeBlur"
          :portraitBg="hero.portraitBlur" :landscapeImgs="hero.landscape" :portraitImgs="hero.portrait" />
      </section>
      <aaja-container class="studio__hero-header">
        <div class="studio__hero-header-wrapper">
          <aaja-heading-block :isstudio=true>
            <SanityContent :blocks="studioData.heading" />
          </aaja-heading-block>
          <p v-if="studioData.headingIntro" class="studio__hero-header-intro">{{ studioData.headingIntro }}</p>
        </div>
      </aaja-container>
    </section>
    <article class="studio__content-wrapper">
      <aaja-container class="studio__content-header">
        <div>
          <SanityContent :blocks="studioData.subHeading" />
          <br>
          <a-organization-page base-url="https://anny.co/b" organization="aaja" placeholder-title="Aaja"
            hide-resource-header="true" hide-organization-header="true" should-login="false" entity-id="" locale="en"
            default-list="resources" primary-color="#ff2600" secondary-color="#ffffff" input-background="#5b5c5a"
            panel-background="#000000" primary-color-rgb="255, 38, 0" light-border-color="#ffffff"
            table-border-color="#ffffff" text-primary-color="#ffffff" primary-background="#18181f"
            primary-color-hover="#ff401f" text-tertiary-color="#cccccc" panel-background-rgb="0, 0, 0"
            text-secondary-color="#e6e6e6" panel-background-dark="#000000"
            primary-color-overlay="rgba(255, 38, 0, 0.14)" panel-background-light="#141414"
            primary-background-rgb="0, 0, 0" panel-background-overlay="rgba(0, 0, 0, 0.25)"
            panel-background-overlay-dense="rgba(0, 0, 0, 0.85)" />
        </div>
      </aaja-container>

    </article>
  </main>
</template>

<script>
import { ref } from 'vue';
import { cloudinaryHeroParser } from '~/utils/images'
import { createSEOMeta } from '~/utils/seo.js'
import { studioPageQuery } from '~/utils/queries.js'
import AajaContainer from '~/components/AajaContainer.vue'
import AajaHeroImg from '~/components/AajaHeroImg.vue'
import Logo from '~/assets/img/icons/logo.svg?inline'
import AajaImg from '~/components/AajaImg.vue'
import AajaHeading from '~/components/AajaHeading.vue'


export default {
  components: { AajaContainer, AajaHeroImg, Logo, AajaImg, AajaHeading },
  head() {
    const title = 'Aaja Basement - Studios';
    const description = this.studioData?.headingIntro || 'Championing neighbourhood crews, DIY radio, local businesses & the unique spaces of Deptford, Creekside studio is intimate multi-venue electronic music studio.';

    return {
      title,
      meta: createSEOMeta({
        title,
        description,
        image: 'https://aajamusic.com/_nuxt/img/creekside-transparent.55a5c78.png',
        url: 'https://aajamusic.com/studios',
        themeColor: 'black'
      }),
    }
  },
  async asyncData({ $sanity }) {
    const studioData = await $sanity.fetch(studioPageQuery)

    return { studioData: studioData[0] }
  },
  data() {
  },
  setup() {
  },
  computed: {
    hero() {
      const image = this.$urlForSquare(this.studioData.studioHero, false, false);
      const parsedImage = cloudinaryHeroParser(image.desktop['1200']);
      return parsedImage
    },
    gallery() {
      return this.studioData.images?.map((img) => {
        const parsedImage = this.$urlForSquare(img, false, true)
        return { ...parsedImage, _key: img._key }
      })
    },
  },
  created() {
  },
  mounted() {
  },
}
</script>

<style lang="scss">
.button-popup {
  display: none !important;
}

.studio__ {
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

  }
}
</style>
