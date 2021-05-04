<template>
  <main>
    <article>
      <nuxt-link to="radio">Radio Station,</nuxt-link><br /><nuxt-link to="bar">
        Bar</nuxt-link
      >
      and
      <nuxt-link to="label">Record Label</nuxt-link>
    </article>
  </main>
</template>

<script>
export default {
  mounted() {},
  head: {
    htmlAttrs: {
      class: 'dark',
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('~/assets/img/homesnake.svg');
  background-size: auto 100%;
  background-position: 85% 15px;
}
article {
  width: 70%;
  // max-width: 800px;
  text-align: center;
  font-family: 'FK Screamer Trial';
  font-size: 10vw;
  text-transform: uppercase;
  -webkit-text-stroke: 1px var(--white);
  color: transparent;
  // background: seagreen;
  @include breakpoint(tablet) {
    width: 80%;
    font-size: 12vw;
  }
  @include breakpoint(mobile) {
    width: 90%;
    font-size: 20vw;
  }
  a {
    color: var(--white);
    text-decoration: none;
    &:hover {
      -webkit-text-stroke: 1px var(--white);
      color: transparent;
    }
  }
}
</style>
