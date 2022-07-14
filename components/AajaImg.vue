<template>
  <div
    class="img_wrap"
    :style="{
      backgroundImage: `url(${isMobile ? mobileBg : desktopBg})`,
      paddingBottom: padBottom,
    }"
  >
    <transition name="img-in">
      <picture v-if="showing">
        <!-- DESKTOP (desktop) -->
        <source
          :srcset="`
              ${desktopImgs['400']} 400w,
              ${desktopImgs['600']} 600w,
              ${desktopImgs['800']} 800w,
              ${desktopImgs['1000']} 1000w,
              ${desktopImgs['1200']} 1200w,
              ${desktopImgs['1400']} 1400w,
              ${desktopImgs['1600']} 1600w,
              ${desktopImgs['1800']} 1800w,
              ${desktopImgs['2000']} 2000w,
              ${desktopImgs['2400']} 2400w,
              ${desktopImgs['2800']} 2800w,
              ${desktopImgs['3000']} 3000w
            `"
          :sizes="`${percentageOfViewportWidth}vw`"
          media="(min-width: 481px)"
        />
        <!-- TABLET & MOBILE (Protrait)-->
        <source
          :srcset="`
              ${mobileImgs['400']} 400w,
              ${mobileImgs['600']} 600w,
              ${mobileImgs['800']} 800w,
              ${mobileImgs['1000']} 1000w,
              ${mobileImgs['1200']} 1200w,
              ${mobileImgs['1400']} 1400w,
              ${mobileImgs['1600']} 1600w,
              ${mobileImgs['1800']} 1800w,
            `"
          :sizes="`${percentageOfViewportWidthMobile}vw`"
          media="(max-width: 480px)"
        />
        <img :src="desktopImgs['1200']" :ref="altText" />
      </picture>
    </transition>
  </div>
</template>

<script>
import LogoVue from './Logo.vue'
export default {
  components: {},
  props: {
    altText: {
      type: String,
      default: 'An Aaja image',
    },
    percentageOfViewportWidth: {
      type: Number,
      default: 100,
    },
    percentageOfViewportWidthMobile: {
      type: Number,
      default: 100,
    },
    ratio: {
      type: Array,
      default: [2, 1],
    },
    ratioMobile: {
      type: Array,
    },
    desktopBg: {
      type: String,
      default: 'https://placehold.co/40x40/green/white?text=40x40+PLACEHOLDER-desktop',
    },
    mobileBg: {
      type: String,
      default: 'https://placehold.co/40x40/orange/white?text=40x40+PLACEHOLDER-mobile',
    },
    desktopImgs: {
      type: Object,
      default: () => ({
        400: 'https://placehold.co/400x400?text=400x400+Desktop+served+at+400w',
        600: 'https://placehold.co/600x400?text=600x400+Desktop+served+at+600w',
        800: 'https://placehold.co/800x400?text=800x400+Desktop+served+at+800w',
        1000: 'https://placehold.co/1000x400?text=1000x400+Desktop+served+at+1000w',
        1200: 'https://placehold.co/1200x400?text=1200x400+Desktop+served+at+1200w',
        1400: 'https://placehold.co/1400x400?text=1400x400+Desktop+served+at+1400w',
        1600: 'https://placehold.co/1600x400?text=1600x400+Desktop+served+at+1600w',
        1800: 'https://placehold.co/1800x400?text=1800x400+Desktop+served+at+1800w',
        2000: 'https://placehold.co/2000x400?text=2000x400+Desktop+served+at+2000w',
        2400: 'https://placehold.co/2400x400?text=2400x400+Desktop+served+at+2400w',
        2800: 'https://placehold.co/2800x400?text=2800x400+Desktop+served+at+2800w',
        3000: 'https://placehold.co/3000x400?text=3000x400+Desktop+served+at+3000w ',
      }),
    },
    mobileImgs: {
      type: Object,
      default: () => ({
        400: 'https://placehold.co/400x400?text=400x400+MOBILE+served+at+400w',
        600: 'https://placehold.co/600x600?text=600x600+MOBILE+served+at+600w',
        800: 'https://placehold.co/800x800?text=800x800+MOBILE+served+at+800w',
        1000: 'https://placehold.co/1000x1000?text10=400x1000+MOBILE+served+at+1000w',
        1200: 'https://placehold.co/1200x1200?text=1200x1200+MOBILE+served+at+1200w',
        1400: 'https://placehold.co/1400x1400?text=1400x1400+MOBILE+served+at+1400w',
        1600: 'https://placehold.co/1600x1600?text=1600x1600+MOBILE+served+at+1600w',
        1800: 'https://placehold.co/1800x1800?text=1800x1800+MOBILE+served+at+1800w',
      }),
    },
  },
  data() {
    return {
      isMobile: null,
      showing: true,
    }
  },
  computed: {
    padBottom() {
      let num =
        (this.isMobile
          ? this.ratioMobile
            ? this.ratioMobile[1] / this.ratioMobile[0]
            : this.ratio[1] / this.ratio[0]
          : this.ratio[1] / this.ratio[0]) * 100
      return `${num}%`
    },
  },
  methods: {},
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
  mounted() {},
}
</script>

<style lang="scss" scoped>
.img_wrap {
  width: 100%;
  height: 0;
  position: relative;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
picture,
img {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
img {
  object-fit: cover;
}
</style>
