<template>
  <!-- Slider main container -->
  <div class="swiper-container swiper-container-home">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <slot></slot>
    </div>
    <div class="control-wrapper" :style="`top: ${fromTopLength}px`">
      <div class="swiper-button-prev">
        <sliderArrow />
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next">
        <sliderArrow />
      </div>
    </div>
  </div>
</template>

<script>
import sliderArrow from '~/assets/img/icons/sliderArrow.svg?inline'
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper'
// configure Swiper to use modules
Swiper.use([Navigation, Pagination])

// import Swiper styles
import 'swiper/swiper-bundle.css'
export default {
  components: { sliderArrow },
  props: {
    initalSlide: {
      type: [Number, String],
      default: 0,
    },
    sliderOptions: {
      type: Object,
      default: () => ({
        // Optional parameters
        // direction: 'hor',
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        grabCursor: true,
        spaceBetween: 0,
        initialSlide: 0,
        // breakpoints: {
        //   // when window width is >= 480px
        //   481: {
        //     slidesPerView: 6,
        //     slidesPerGroup: 6,
        //     spaceBetween: 30,
        //   },
        // },

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // // And if we need scrollbar
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      }),
    },
  },
  data() {
    return {
      ready: false,
      mobile: false,
      fromTopLength: 0,
    }
  },
  computed: {},
  mounted() {
    let vm = this
    this.matchMedia()
    this.$nextTick(() => {
      var mySwiper = new Swiper(vm.$el, vm.sliderOptions)
      this.ready = true
    })
  },
  methods: {
    matchMedia() {
      let vm = this
      const el = this.$el
      const mediaQuery = window.matchMedia('(max-width: 480px)')
      function handleTabletChange(e) {
        // Check if the media query is true
        if (e.matches) {
          vm.mobile = true
          vm.fromTopLength = el.offsetWidth + 1
        } else {
          vm.mobile = false
          vm.fromTopLength = el.offsetWidth / 2 + 1
        }
      }
      mediaQuery.addListener(handleTabletChange)
      handleTabletChange(mediaQuery)
    },
  },
}
</script>

<style lang="scss">
.swiper-container-home {
  width: 100%;
  // height: 300px;

  .control-wrapper {
    position: absolute;
    height: 70px;
    width: 100%;
    max-width: 320px;
    z-index: 11;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .swiper-pagination {
    bottom: unset;
    transform: translate3d(0, 0px, 0px);
    position: relative;
    span {
      width: 16px;
      height: 16px;
      margin: 0 10px;
      border: 1px solid var(--white);
      opacity: 1;
      background: transparent;
      &.swiper-pagination-bullet-active {
        background: var(--white);
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    position: relative;
    top: unset;
    right: unset;
    left: unset;
    margin: unset;
    width: 32px;
    height: 32px;
    svg {
      width: 100%;
      circle {
        stroke: var(--white);
      }
      path {
        fill: var(--white);
        stroke: var(--white);
      }
    }
    &::after {
      content: '';
    }
  }
  .swiper-button-prev {
    transform: rotate(180deg);
  }
}
</style>
