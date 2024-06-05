<template>
  <main>
    <article class="home-hero">
      <div>
        <h1>
          <nuxt-link to="radio">Radio Station</nuxt-link>
          <br /><nuxt-link to="bar"> Bar</nuxt-link>&nbsp;<nuxt-link to="label">Label</nuxt-link>
          <br /><nuxt-link to="studio">Studio</nuxt-link>
          <br />and&nbsp;<nuxt-link to="festival">Festival</nuxt-link>
        </h1>
        <FullLogo id="home-logo" />
      </div>
    </article>
    <aaja-container v-if="homeData.length > 0">
      <slider-home-container v-if="sliderReady" class="slider-container" :length-of-items="homeData.length">
        <div class="swiper-slide" v-for="slide in homeData" :key="slide._key">
          <figure class="img-wrap">
            <picture>
              <!-- DESKTOP (desktop) -->
              <source :srcset="`
                ${$urlFor(slide.feature_image).width(400).height(200).fit('crop')} 400w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(600).height(300).fit('crop')} 600w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(800).height(400).fit('crop')}  800w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(1000).height(500).fit('crop')}  1000w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(1200).height(600).fit('crop')}  1200w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(1400).height(700).fit('crop')}  1400w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(1600).height(800).fit('crop')}  1600w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(1800).height(900).fit('crop')}  1800w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(2000).height(1000).fit('crop')}  2000w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(2400).height(1200).fit('crop')}  2400w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(2800).height(1400).fit('crop')}  2800w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image).width(3000).height(1500).fit('crop')}  3000w
            `" sizes="100vw" media="(min-width: 481px)" />
              <source :srcset="`
                ${$urlFor(slide.feature_image_mobile).width(400).height(400).fit('crop')} 400w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image_mobile).width(600).height(600).fit('crop')} 600w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image_mobile).width(800).height(800).fit('crop')} 800w,
                                                                                                                                                                                                                                                                                          ${$urlFor(slide.feature_image_mobile).width(1000).height(1000).fit('crop')} 1000w,
            `" sizes="100vw" media="(max-width: 480px)" />
              <img src="https://picsum.photos/1200/600?random=2" ref="altText" />
            </picture>
          </figure>
          <article class="info-wrap">
            <time v-if="slide.date">{{ slide.date }}</time>
            <h3>{{ slide.title }}</h3>
            <section class="copy">
              <SanityContent v-if="slide.content" :blocks="slide.content" />
            </section>
          </article>
        </div>
      </slider-home-container>
    </aaja-container>
    <!-- <a id="patreon" :href="patreon_link" target="_blank" rel="noopener noreferrer">
      <img src="~/assets/img/become-my-patreon.jpg" alt="Become a patreon" />
    </a> -->
  </main>
</template>

<script>
import { homePageQuery } from '~/utils/queries.js'
import FullLogo from '~/assets/img/icons/fullLogo.svg?inline'
import '~/assets/scss/_mixins.scss';

export default {
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(homePageQuery)

    return { homeData: data[0].homeNewsBanner }
  },
  components: { FullLogo },
  data() {
    return {
      patreon_link: 'https://www.patreon.com/aajadeptford',
      sliderReady: false,
    }
  },
  mounted() {
    this.sliderReady = true
    console.log('New', this.$store.state)
  },
  head: {
    htmlAttrs: {
      class: 'dark',
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  min-height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  background-image: url('~/assets/img/snakey.svg');
  background-size: 60% auto;
  background-position: 90% 15px;

  @include breakpoint(tablet) {
    background-size: 85% auto;
  }

  @include breakpoint(mobile) {
    background-size: 100% auto;
  }
}

body {
  background: #000;
}

.home-hero {
  width: 70%;
  height: 100vh;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-text-stroke: 1px var(--white);
  color: transparent;

  @include breakpoint(tablet) {
    width: 80%;
  }

  @include breakpoint(mobile) {
    width: 90%;
  }

  .flicker-slow {
    animation: flicker 16s linear alternate infinite;
  }

  .flicker-mid {
    animation: flicker 8s linear alternate infinite;
  }

  .flicker-fast {
    animation: flicker 5s linear alternate infinite;
  }

  a {
    color: var(--white);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;

    &:hover {
      -webkit-text-stroke: 1px var(--white);
      color: transparent !important;

      span {
        animation: none;
      }
    }
  }

  div {
    width: 100%;
  }
}

#home-logo {
  width: 20%;
  margin-top: 25px;

  @include breakpoint(tablet) {
    width: 25%;
  }

  @include breakpoint(mobile) {
    width: 33%;
  }
}

#patreon {
  width: 175px;
  position: absolute;
  display: block;
  right: 0;
  bottom: 60px;
  z-index: 10;
}

img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
}

.slider-container {
  position: relative;
}

.swiper-slide {
  width: 100%;

  &:nth-child(even) {
    .img-wrap {
      background: palevioletred;
    }
  }

  .img-wrap {
    width: 100%;
    height: 0;
    position: relative;
    padding-bottom: 50%;
    background: sandybrown;

    @include breakpoint(mobile) {
      padding-bottom: 100%;
    }
  }

  .info-wrap {
    width: 100%;
    max-width: 540px;
    margin: 80px auto;
    text-align: center;
    padding: 0 20px;

    time {
      font-family: 'FK Screamer';
      font-size: var(--h5Size);
      display: block;
      margin-bottom: 15px;
    }

    h3 {
      margin-bottom: 10px;
    }

    a {
      color: var(--headerColor);
    }
  }
}
</style>
