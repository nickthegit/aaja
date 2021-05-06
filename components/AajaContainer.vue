<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: var(--containerWidth);
  margin: 0 auto;
  padding: var(--globalPadding);
}
</style>
