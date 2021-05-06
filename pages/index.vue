<template>
  <main>
    <article>
      <h1>
        <nuxt-link to="radio">Radio Station,</nuxt-link><br /><nuxt-link
          to="bar"
        >
          Bar</nuxt-link
        >
        and
        <nuxt-link to="label">Record Label</nuxt-link>
      </h1>
    </article>
    <FullLogo id="home-logo" />
    <a
      id="patreon"
      :href="patreon_link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="~/assets/img/become-my-patreon.jpg" alt="Become a patreon" />
    </a>
  </main>
</template>

<script>
import FullLogo from '~/assets/img/icons/fullLogo.svg?inline'
export default {
  components: { FullLogo },
  data() {
    return {
      patreon_link: 'https://www.patreon.com/',
    }
  },
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
  text-align: center;
  -webkit-text-stroke: 1px var(--white);
  color: transparent;
  @include breakpoint(tablet) {
    width: 80%;
  }
  @include breakpoint(mobile) {
    width: 90%;
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
#home-logo {
  width: 16%;
  @include breakpoint(tablet) {
    width: 25%;
  }
  @include breakpoint(mobile) {
    width: 33%;
  }
}
#patreon {
  width: 175px;
  position: absolute;
  display: block;
  right: 0;
  bottom: 60px;
  z-index: 10;
}
img {
  width: 100%;
}
</style>
