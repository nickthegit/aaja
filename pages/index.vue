<template>
  <main>
    <article>
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
      <slider-container>
        <div class="swiper-slide">
          <div class="img-wrap"></div>
        </div>
        <div class="swiper-slide">
          <div class="img-wrap"></div>
        </div>
        <template v-slot:sliderButtons>
          <div class="home-slider-btns-wrapper">
            <div class="slider-button slider-button-prev"><slider-arrow /></div>
            <div class="slider-button slider-button-next"><slider-arrow /></div>
          </div>
        </template>
      </slider-container>
    </aaja-container>
    <!-- <a id="patreon" :href="patreon_link" target="_blank" rel="noopener noreferrer">
      <img src="~/assets/img/become-my-patreon.jpg" alt="Become a patreon" />
    </a> -->
  </main>
</template>

<script>
import FullLogo from '~/assets/img/icons/fullLogo.svg?inline'
import sliderArrow from '~/assets/img/icons/sliderArrow.svg?inline'
export default {
  components: { FullLogo, sliderArrow },
  data() {
    return {
      patreon_link: 'https://www.patreon.com/aajadeptford',
    }
  },
  mounted() {},
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
article {
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
}
.swiper-slide {
  width: 100%;
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
}
.home-slider-btns-wrapper {
  position: absolute;
  width: 300px;
  height: 32px;
  z-index: 2;
  background: darkcyan;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .slider-button {
    width: 32px;
    height: 32px;
    background: salmon;
  }
}
</style>
