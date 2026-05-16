<template>
  <div class="hero-section-divider">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path d="M1800 120L0 50 0 0 1200 0 1200 120z" class="shape-fill" :style="{fill: fillColor}"></path>
    </svg>
  </div>
</template>

<script>

export default {
  props: {
    fillColor: ''
  },
}
</script>

<style lang="scss" scoped>

</style>
