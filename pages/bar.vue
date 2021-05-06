<template>
  <main>
    <section class="bar__hero">
      <aaja-hero-img />
      <aaja-container>
        <h1>bar</h1>
      </aaja-container>
    </section>
  </main>
</template>

<script>
import AajaContainer from '~/components/AajaContainer.vue'
import AajaHeroImg from '~/components/AajaHeroImg.vue'
export default {
  components: { AajaContainer, AajaHeroImg },
}
</script>

<style lang="scss" scoped></style>
