<template>
  <div>
    <slot></slot>
    <span><Logo /></span>
  </div>
</template>

<script>
import Logo from '~/assets/img/icons/logo.svg?inline'
export default {
  components: { Logo },
  mounted() {
    const el = this.$el
    const svg = el.querySelector('span')
    el.querySelector('div').appendChild(svg)
    // this.$el.innerHTML += svg
  },
}
</script>

<style lang="scss" scoped>
div {
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  span {
    display: inline-block;
    width: 5vw;
    margin-left: 2%;
    align-self: flex-start;
    svg {
      width: 100%;
      fill: var(--headerColor);
    }
    @include breakpoint(mobile) {
      width: 10vw;
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
