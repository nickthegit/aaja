<template>
  <aaja-container>
    <section class="schedule-title-bar title-bar">
      <h2>
        Schedule<span><Logo /></span>
      </h2>
    </section>
    <AajaSchedule1 />
  </aaja-container>
</template>

<script>
import Logo from '~/assets/img/icons/logo.svg?inline'
import AajaContainer from '~/components/AajaContainer.vue'

export default {
  components: {
    Logo,
    AajaContainer,
  },
}
</script>

<style lang="scss" scoped>
.title-bar {
  margin-bottom: 20px;
  span {
    height: var(--h2Size);
    display: inline-block;
    vertical-align: middle;
    svg {
      height: 100%;
      margin-left: 10px;
      fill: var(--white);
    }
  }
}
.schedule-title-bar {
  span {
    svg {
      fill: var(--black);
    }
  }
}
</style>
