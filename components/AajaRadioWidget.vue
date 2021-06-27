<template>
  <section>
    <div class="online">
      <button class="playBtn">
        <svg
          width="13"
          height="20"
          viewBox="0 0 13 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.0313 9.54242C12.4727 9.93966 12.4727 10.6318 12.0313 11.029L3.09757 19.0694C2.45405 19.6485 1.42861 19.1918 1.42861 18.3261L1.42861 2.24536C1.42861 1.37959 2.45405 0.922898 3.09757 1.50207L12.0313 9.54242Z"
            fill="white"
            stroke="#262626"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="now-next">
        <p class="now">Harvey - 14:00 - 16:00</p>
        <span></span>
        <p class="next">Coming up next: Handclap - 16:00 - 18:00</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    // http://sourcefabric.airtime.pro/api/live-info-v2
  },
}
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
}
.online {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
}
.playBtn {
  background: none;
  border: none;
  width: 55px;
  box-sizing: border-box;
  padding: 0 15px;
  svg {
    width: 100%;
  }
  path {
    fill: var(--mainColor);
    stroke: var(--mainColor);
  }
}
.now-next {
  flex-grow: 2;
  display: flex;
  align-items: center;
  p {
    display: inline-block;
    margin-bottom: 0;
    text-transform: uppercase;
  }
  span {
    display: block;
    height: calc(var(--headerHeight) / 2);
    width: 1px;
    border: 1px solid var(--mainColor);
    margin: 0 20px;
  }
  @include breakpoint(tablet-mobile) {
    .next,
    span {
      display: none;
    }
  }
  @include breakpoint(mobile) {
    p {
      font-size: 75%;
    }
  }
}
</style>
