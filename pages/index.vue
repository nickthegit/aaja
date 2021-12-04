<template>
  <main>
    <article class="home-hero">
      <div>
        <h1>
          <nuxt-link to="radio">Radio Station</nuxt-link><br /><nuxt-link to="bar"> Bar</nuxt-link>
          and
          <nuxt-link to="label">Record Label</nuxt-link>
        </h1>
        <FullLogo id="home-logo" />
      </div>
    </article>
    <aaja-container>
      <slider-home-container v-if="sliderReady" class="slider-container">
        <div class="swiper-slide">
          <figure class="img-wrap">
            <picture>
              <!-- DESKTOP (desktop) -->
              <source
                :srcset="`
                https://picsum.photos/400/200?random=1 400w,
                https://picsum.photos/600/300?random=2 600w,
                https://picsum.photos/800/400?random=3 800w,
                https://picsum.photos/1000/500?random=4 1000w,
                https://picsum.photos/1200/600?random=5 1200w,
                https://picsum.photos/1400/700?random=6 1400w,
                https://picsum.photos/1600/800?random=7 1600w,
                https://picsum.photos/1800/900?random=8 1800w,
                https://picsum.photos/2000/1000?random=9 2000w,
                https://picsum.photos/2400/1200?random=10 2400w,
                https://picsum.photos/2800/1400?random=11 2800w,
                https://picsum.photos/3000/1500?random=12 3000w
            `"
                sizes="100vw"
                media="(min-width: 481px)"
              />
              <source
                :srcset="`
                https://picsum.photos/400/400?random=6 400w,
                https://picsum.photos/600/600?random=7 600w,
                https://picsum.photos/800/800?random=8 800w,
                https://picsum.photos/1000/1000?random=9 1000w,
            `"
                sizes="100vw"
                media="(max-width: 480px)"
              />
              <img src="https://picsum.photos/1200/600?random=2" ref="altText" />
            </picture>
          </figure>
          <article class="info-wrap">
            <time>27/08/21</time>
            <h3>The Yesness</h3>
            <section class="copy">
              <p>
                All roads lead to Aaja on Friday 27th August to celbrate the Yesness on there 10th
                year. Join Paul Order, J.Nix and Andy J for that post-work drink, before they knock
                it up a notch later in the evening.
              </p>
              <p>
                <a href="https://ra.co/theyesness" target="_blank" rel="noopener noreferrer"
                  >ra.co/theyesness</a
                >
              </p>
            </section>
          </article>
        </div>
        <div class="swiper-slide">
          <div class="img-wrap"></div>
          <div class="info-wrap">paragraph 2</div>
        </div>
      </slider-home-container>
    </aaja-container>
    <!-- <a id="patreon" :href="patreon_link" target="_blank" rel="noopener noreferrer">
      <img src="~/assets/img/become-my-patreon.jpg" alt="Become a patreon" />
    </a> -->
  </main>
</template>

<script>
import FullLogo from '~/assets/img/icons/fullLogo.svg?inline'

export default {
  components: { FullLogo },
  data() {
    return {
      patreon_link: 'https://www.patreon.com/aajadeptford',
      sliderReady: false,
    }
  },
  mounted() {
    this.sliderReady = true
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
    padding-top: 100px;
    width: 90%;
  }
  a {
    color: var(--white);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    &:hover {
      -webkit-text-stroke: 1px var(--white);
      color: transparent;
    }
  }
  div {
    width: 100%;
  }
}
#home-logo {
  width: 20%;
  margin-top: 10px;
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
      font-family: 'FK Screamer Trial';
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
