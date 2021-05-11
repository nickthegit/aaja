<template>
  <main>
    <section class="radio__hero">
      <aaja-container class="radio__hero-container">
        <div class="radio__heading">
          <aaja-heading>Aaja Radio<br />on air</aaja-heading>
          <p>Listen live or dig into our music archive of radio and mixes</p>
        </div>
        <snake-roundel id="snake_roundel" />
      </aaja-container>
    </section>
    <section class="radio__spotlight">
      <aaja-container class="radio__hero-container"> </aaja-container>
    </section>
  </main>
</template>

<script>
import SnakeRoundel from '~/assets/img/radio-snake.svg?inline'
export default {
  components: {
    SnakeRoundel,
  },
}
</script>

<style lang="scss" scoped>
.radio__hero {
  width: 100%;
  height: 100vh;
  // background: salmon;
}
.radio__hero-container {
  height: 100%;
  display: grid;
  grid-template: auto / 53% 1fr;
  gap: 40px;
  align-items: center;
  justify-items: start;
  padding-top: var(--headerHeight) !important;
  @include breakpoint(mobile) {
    grid-template: auto / 45% 1fr;
  }
  svg {
    width: 100%;
  }
  p {
    width: 100%;
    max-width: 500px;
    font-size: 20px;
    line-height: 24px;
    text-transform: uppercase;
    @include breakpoint(mobile) {
      width: 60%;
    }
  }
}
.radio__heading {
  @include breakpoint(mobile) {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }
}
#snake_roundel {
  @include breakpoint(mobile) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    align-self: end;
    padding-bottom: var(--globalPadding);
    width: 200%;
  }
}
</style>
