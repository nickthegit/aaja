<template>
  <a class="button-popup button-popup__right" target="_blank" @click="handleClick"
    :class="{ spin: buttonSettings?.spin, shake: buttonSettings?.shake, blend: buttonSettings?.shouldBlendWithBackground }"
    v-if="!isLoading && buttonSettings?.isEnabled">
    <img v-bind:src="logo?.desktop['400']" class="button-popup__image" />
  </a>
</template>

<script>
import '~/assets/scss/_mixins.scss';
import { buttonPopupQueryRight } from '~/utils/queries';

export default {
  async fetch() {
    this.data = await this.$sanity.fetch(buttonPopupQueryRight);
    this.settings = this.data?.[0];
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
      this.$trackEvent('btn_popup_right');
      window.open(
        this.settings.buttonLink,
        "AAJA popout",
        this.settings?.shouldPopup ? `width=${this.settings.popupWidth},height=${this.settings.popupHeight}` : null
      )
    }
  },
  computed: {
    buttonSettings() {
      return {
        isEnabled: this.settings?.isEnabled,
        spin: this.settings?.shouldSpin,
        shake: this.settings?.shouldShake,
        isLinkPopup: this.settings?.shouldPopup,
        popupHeight: this.settings?.popupHeight,
        popupWidth: this.settings?.popupWidth,
        link: this.settings?.buttonLink,
        shouldPopup: this.settings?.shouldPopup,
        shouldBlendWithBackground: this.settings?.shouldBlendWithBackground
      }
    },
    logo() {
      const image = this.$urlForSquare(this.settings.logo, false, false);
      return { ...image }
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

  &__right{
    bottom: 5%;
    right: 5%;
  }
  &__left {
    bottom: 5%;
    left: 5%;
  }

  &.shake {
    animation: 5s shake 2s linear 3 running;
  }

  &.spin .button-popup__image:hover {
    animation: spin 10s linear infinite running;
  }

  &.blend {
    mix-blend-mode: difference;
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
