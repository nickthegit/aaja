<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <slot name="sliderButtonsTop"> </slot>
    <div class="swiper-wrapper">
      <!-- Slides -->
      <slot></slot>
    </div>
    <slot name="sliderButtons">
      <!-- <div class="swiper-pagination"></div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <div class="swiper-scrollbar"></div> -->
    </slot>
  </div>
</template>

<script>
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper'
// configure Swiper to use modules
Swiper.use([Navigation, Pagination])

// import Swiper styles
import 'swiper/swiper-bundle.css'
export default {
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
        // slidesPerView: 2,
        // slidesPerGroup: 2,
        // grabCursor: true,
        // spaceBetween: 20,
        // breakpoints: {
        //   // when window width is >= 480px
        //   481: {
        //     slidesPerView: 6,
        //     slidesPerGroup: 6,
        //     spaceBetween: 30,
        //   },
        // },

        // If we need pagination
        // pagination: {
        //   el: '.swiper-pagination',
        // },

        // // Navigation arrows
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },

        // // And if we need scrollbar
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
      }),
    },
  },
  mounted() {
    let vm = this
    this.$nextTick(() => {
      var mySwiper = new Swiper(vm.$el, vm.sliderOptions)
      mySwiper.slideTo(vm.initalSlide, 300)
    })
  },
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  // height: 300px;
}
</style>
