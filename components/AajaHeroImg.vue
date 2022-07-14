<template>
  <div
    class="img_wrap"
    :style="{
      backgroundImage: `url(${isPortrait ? portraitBg : landscapeBg})`,
    }"
  >
    <transition name="img-in">
      <picture v-if="showing">
        <!-- DESKTOP (Landscape) -->
        <source
          :srcset="`
        ${landscapeImgs['400']} 400w,
        ${landscapeImgs['600']} 600w,
        ${landscapeImgs['800']} 800w,
        ${landscapeImgs['1000']} 1000w,
        ${landscapeImgs['1200']} 1200w,
        ${landscapeImgs['1400']} 1400w,
        ${landscapeImgs['1600']} 1600w,
        ${landscapeImgs['1800']} 1800w,
        ${landscapeImgs['2000']} 2000w,
        ${landscapeImgs['2400']} 2400w,
        ${landscapeImgs['2800']} 2800w,
        ${landscapeImgs['3000']} 3000w
      `"
          media="(orientation: landscape)"
        />
        <!-- TABLET & MOBILE (Protrait)-->
        <source
          :srcset="`
        ${portraitImgs['400']} 400w,
        ${portraitImgs['600']} 600w,
        ${portraitImgs['800']} 800w,
        ${portraitImgs['1000']} 1000w,
        ${portraitImgs['1200']} 1200w,
        ${portraitImgs['1400']} 1400w,
        ${portraitImgs['1600']} 1600w,
        ${portraitImgs['1800']} 1800w,
      `"
          media="(orientation: portrait)"
        />
        <img :src="landscapeImgs['1200']" :ref="altText" />
      </picture>
    </transition>
  </div>
</template>

<script>
// import Observer from 'vue-intersection-observer'
export default {
  props: {
    altText: {
      type: String,
      default: 'An Aaja hero image',
    },
    landscapeBg: {
      type: String,
      default: 'https://placehold.co/40x40/green/white?text=40x40+PLACEHOLDER-LANDSCAPE',
    },
    portraitBg: {
      type: String,
      default: 'https://placehold.co/40x40/orange/white?text=40x40+PLACEHOLDER-PORTRAIT',
    },
    landscapeImgs: {
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
    portraitImgs: {
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
      isPortrait: null,
      showing: true,
    }
  },
  methods: {
    // onChange(entry, unobserve) {
    //   let vm = this
    //   // After loading Cancel monitoring, optimise performance
    //   if (entry.isIntersecting) {
    //     unobserve()
    //     vm.showing = true
    //   }
    // },
  },
  created() {
    if (process.client) {
      let vm = this
      const mediaQuery = window.matchMedia('(orientation: portrait)')
      function handleTabletChange(e) {
        vm.isPortrait = e.matches
      }
      mediaQuery.addListener(handleTabletChange)
      handleTabletChange(mediaQuery)
    }
  },
}
</script>

<style lang="scss" scoped>
div,
picture,
img {
  width: 100%;
  height: 100%;
  position: absolute;
}
div {
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
picture {
}
img {
  object-fit: cover;
}
</style>
