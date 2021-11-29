<template>
  <aaja-container>
    <section class="schedule-title-bar title-bar">
      <button :class="scheduleSelected == 1 ? 'active' : ''" @click="scheduleSelected = 1">
        <h2>Channel 1</h2>
      </button>
      <button
        :class="scheduleSelected != 1 ? 'active' : ''"
        @click=";(scheduleSelected = 2), (selected2 = true)"
      >
        <h2>Channel 2</h2>
      </button>
    </section>
    <AajaSchedule1 v-show="scheduleSelected == 1" />
    <AajaSchedule2 v-show="scheduleSelected == 2" :selected="selected2" />
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
  data() {
    return {
      scheduleSelected: 1,
      selected2: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.schedule-title-bar {
  display: flex;
  flex-gap: 60px;
  gap: 60px;
  @media screen and (max-width: 480px) {
    flex-gap: 30px;
    gap: 30px;
  }
  button {
    padding: 0;
    border: none;
    margin-bottom: 30px;
    display: block;
    color: var(--primary);
    &.active {
      -webkit-text-stroke: 1px var(--primary);
      color: transparent;
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 10px;
    }
    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 10px;
    }
  }
  h2 {
    margin-bottom: 0;
    padding-bottom: 10px;
  }
}
</style>
