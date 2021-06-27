<template>
  <header>
    <nuxt-link to="/" id="brand">
      <Logo id="headerlogo" />
      <FullLogo id="headerlogofull" />
    </nuxt-link>
    <div id="radio-sound-wrap">
      <div id="radio-widget__wrapper">
        <aaja-radio-widget />
      </div>
      <button id="toggle-sound" @click="toggleSound" :class="muted ? 'muted' : ''">
        <Speaker />
      </button>
    </div>
    <button id="menu" @click="navOpen">
      <span>MENU</span>
      <Hamburger id="hamburger" />
    </button>
  </header>
</template>

<script>
import Logo from '~/assets/img/icons/logo.svg?inline'
import FullLogo from '~/assets/img/icons/fullLogo.svg?inline'
import Speaker from '~/assets/img/icons/speaker.svg?inline'
import Hamburger from '~/assets/img/icons/hamburger.svg?inline'
import AajaRadioWidget from './AajaRadioWidget.vue'
export default {
  components: { Speaker, Logo, FullLogo, Hamburger, AajaRadioWidget },
  data() {
    return {
      muted: false,
    }
  },
  methods: {
    navOpen() {
      this.$store.dispatch('setNavPayload', true)
    },
    toggleSound() {
      const radio = this.$el.querySelector('#radio')
      if (radio) {
        if (radio.muted) {
          radio.muted = false
          this.muted = false
        } else {
          radio.muted = true
          this.muted = true
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: auto;
  background: transparent;
  border-bottom: var(--borderAtts);
  display: grid;
  grid-template: var(--headerHeight) / auto 1fr auto auto;
  align-items: center;
  color: var(--headerColor);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  @include breakpoint(mobile) {
    grid-template: var(--headerHeight) var(--subHeaderHeight) / 1fr auto;
  }
}
svg {
  width: 100%;
  fill: var(--headerColor);
  path {
    fill: var(--headerColor);
    stroke: var(--headerColor);
  }
}
#brand {
  width: 29px;
  height: auto;
  margin: 0 40px;
  display: block;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  #headerlogo {
    display: block;
  }
  #headerlogofull {
    display: none;
  }
  @include breakpoint(mobile) {
    width: 125px;
    margin: 0 20px;
    #headerlogo {
      display: none;
    }
    #headerlogofull {
      display: block;
    }
  }
}
#radio-sound-wrap {
  grid-row: 1 / 2;
  grid-column: 2 / 4;
  display: flex;
  align-items: center;
  height: 100%;
  @include breakpoint(mobile) {
    border-top: var(--borderAtts);
    grid-row: 2 / 3;
    grid-column: 1 / 3;
  }
}
#radio-widget__wrapper {
  flex-grow: 2;
  position: relative;
}
#toggle-sound {
  width: 60px;
  height: calc(var(--headerHeight) / 2);
  padding: 0 15px;
  background: transparent;
  border: none;
  box-sizing: border-box;
  border-left: var(--borderAtts);
  border-right: var(--borderAtts);
  opacity: 1;
  svg {
    .lines {
      opacity: 1;
    }
  }
  &.muted {
    svg {
      .lines {
        opacity: 0.2;
      }
    }
  }
  &:hover {
    opacity: 0.7;
  }
  @include breakpoint(mobile) {
    border-right: none;
  }
}
#menu {
  font-size: 30px;
  font-family: 'FK Screamer Trial';
  height: 30px;
  color: var(--headerColor);
  padding: 0;
  margin: 0 30px;
  background: transparent;
  border: none;
  grid-row: 1 / 2;
  grid-column: 4 / 5;
  &:hover {
    opacity: 0.7;
  }
  #hamburger {
    display: none;
    width: 30px;
    height: auto;
  }
  span {
    display: block;
  }
  @include breakpoint(mobile) {
    margin: 0 20px;
    grid-column: 2 / 3;
    #hamburger {
      display: block;
    }
    span {
      display: none;
    }
  }
}
</style>
