<template>
    <a
      class="button-popup"
      target="_blank"
      @click="handleClick"
      :class="{ spin: buttonSettings?.spin, shake: buttonSettings?.shake }"
      v-if="!isLoading && buttonSettings?.isEnabled"
    >
        <img v-bind:src="logo?.desktop['400']"  class="button-popup__image"/>
    </a>
</template>

<script>
import '~/assets/scss/_mixins.scss';
import { buttonPopupQuery } from '~/utils/queries';

export default {
  async fetch() {
    this.data = await this.$sanity.fetch(buttonPopupQuery);
    this.settings = this.data?.[0];
    console.log(this.data?.[0])
    this.isLoading = false
  },

  data() {
    return {
      settings: null,
      isLoading: true,
    }
  },
  methods: {
    handleClick() {
    window.open(
      this.settings.buttonLink,
      "AAJA popout",
      `width=${this.settings.popupWidth},height=${this.settings.popupHeight}`
    )
  }
  },
  computed: {
    buttonSettings(){
      return {
        isEnabled: this.settings?.isEnabled,
        spin: this.settings?.shouldSpin,
        shake: this.settings?.shouldShake,
        isLinkPopup: this.settings?.shouldPopup,
        popupHeight: this.settings?.popupHeight,
        popupWidth:this.settings?.popupWidth,
        link: this.settings?.buttonLink
     }
    },
    logo() {
      const image = this.$urlForSquare(this.settings.logo, false, false);
      return {...image}
    }
  }
}
</script>

<style lang="scss" scoped>
.button-popup {
    display: block;
    position: fixed;
    z-index: 2;
    width: auto;
    height: auto;

    bottom: 5%;
    right: 5%;

    &.shake {
      animation: 5s shake 2s linear 3 running;
    }

    &.spin .button-popup__image:hover {
        animation: spin 10s linear infinite running;
    }

    &:hover {
      animation: none;
      transform: scale(1.1);
      cursor: pointer;
    }

    &__image {
      width: 150px;
      @include breakpoint(tablet-mobile) {
        width: 100px;
      }

      height: auto;
      // animation: spin 10s linear infinite paused;
      animation: none;
    }


}
</style>
