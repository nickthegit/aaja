<template>
    <a
      class="button-popup"
      href="https://ra.co/events/1725102"
      target="_blank"
    >
        <img src="~/assets/img/button.png" alt="Creekside Festival tickets" class="button-popup__image"/>
    </a>
</template>

<script>
import '~/assets/scss/_mixins.scss';

export default {

  props: {
  //
  },
  data() {
    return {
      // isExternal: true,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.button-popup {
    display: block;
    position: fixed;
    z-index: 2147483647;
    width: auto;
    height: auto;

    bottom: 5%;
    right: 5%;

    animation: 5s shake 2s linear 3 running;
    &:hover {
      animation: none;
      transform: scale(1.1)
    }

    &__image {
      width: 150px;
      @include breakpoint(tablet-mobile) {
        width: 100px;
      }

      height: auto;
      // animation: spin 10s linear infinite paused;
      animation: none;
      &:hover {
        animation: spin 10s linear infinite running;
      }
    }
}
</style>
