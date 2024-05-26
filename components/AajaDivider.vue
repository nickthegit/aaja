<template>
  <div class="hero-section-divider">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path d="M1800 120L0 50 0 0 1200 0 1200 120z" class="shape-fill" :style="{fill: fillColor}"></path>
    </svg>
  </div>
</template>

<script>
import Logo from '~/assets/img/icons/logo.svg?inline'
import AajaContainer from './AajaContainer.vue'


export default {
  components: {  },
  props: {
    fillColor: ''
  },
  async fetch() {
  },
  data() {
  },
  methods: {
    navClose() {
      this.$store.dispatch('setNavPayload', false)
    },
  },
  created() {
    // this.fetch()
  },
  mounted() {
    // console.log('FOOTER QUERY: ', this.data[0])
  },
}
</script>

<style lang="scss" scoped>

</style>
