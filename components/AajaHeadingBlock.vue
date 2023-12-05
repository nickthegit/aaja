<template>
  <div>
    <slot></slot>
    <span v-if="isFestival" class="festival-logo">
       <img class="festival-logo__image" src="~/assets/img/creekside-transparent.png"/>
    </span>
    <span v-else> <Logo /> </span>
  </div>
</template>

<script>
import Logo from '~/assets/img/icons/logo.svg?inline';

export default {
  props: {
    isFestival: Boolean,
  },
  components: { Logo },
  mounted() {
    const el = this.$el
    const svg = el.querySelector('span')
    el.querySelector('div').appendChild(svg)
  },
}
</script>

<style lang="scss" scoped>
.festival-logo {
  margin-top: 25px;
  &__image {
      width:calc(var(--h1Size) - 20px);
      margin: auto;
      filter: grayscale(1);
  }
}

div {
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  span {
    display: inline-block;
    width: 5vw;
    margin-top: auto;
    margin-left: 2%;
    align-self: flex-start;

    svg {
      width: 100%;
      fill: var(--headerColor);
    }

    @include breakpoint(mobile) {
      width: 10vw;
    }
    .festival-logo__image{
      filter:brightness(0) grayscale(1) invert(1)
    }
  }

  p,
  h1 {
    width: 100%;
    font-size: var(--h1Size);
    text-transform: uppercase;
    line-height: calc(var(--h1Size) - 10%);
    font-family: 'FK Screamer';
    margin-bottom: 0;

    &:nth-last-child(2) {
      width: auto;
    }
  }
}
</style>
