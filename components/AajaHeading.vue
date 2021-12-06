<template>
  <div>
    <h1>
      <slot></slot><span><Logo /></span>
    </h1>
  </div>
</template>

<script>
import Logo from '~/assets/img/icons/logo.svg?inline'
export default {
  components: { Logo },
}
</script>

<style lang="scss" scoped>
div {
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: center;
  h1 {
    width: 100%;
    div {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      p,
      h1 {
        width: 100%;
        font-size: var(--h1Size);
        text-transform: uppercase;
        line-height: calc(var(--h1Size) - 10%);
        font-family: 'FK Screamer Trial';
      }
    }
  }
  span {
    display: inline-block;
    width: 5vw;
    margin-left: 1%;
    svg {
      width: 100%;
      fill: var(--headerColor);
    }
    @include breakpoint(mobile) {
      width: 10vw;
    }
  }
}
</style>
