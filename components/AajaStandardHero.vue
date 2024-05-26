<template>
  <section class="standard__hero">
    <aaja-container class="standard__hero-container">
      <div class="standard__hero--header">
        <slot name="heading"></slot>
        <div class="subheading">
          <slot></slot>
        </div>
     </div>
     <div v-if="$slots.headerSide" class="standard__hero--side">
      <slot name="headerSide"></slot>
     </div>
    </aaja-container>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.standard__hero {
  width: 100%;
  height: auto;
  min-height: 50vh;
  display: flex;
  align-items: center;
  padding: calc(var(--headerHeight) * 2 + var(--subHeaderHeight)) 0
    var(--headerHeight) 0;
  .subheading {
    width: 100%;
    max-width: 680px;
    margin-top: 20px;
  }
}
</style>
