<template>
  <slider-container class="schedule-slider-container" :sliderOptions="scheduleSliderOptions" :initalSlide="startingIndex"
    v-if="schduleFetched">
    <template v-slot:sliderButtons>
      <div class="slider-btns-wrap">
        <div class="slider-button-prev schedule-prev">
          <slider-arrow />
        </div>
        <div class="slider-button-next schedule-next">
          <slider-arrow />
        </div>
      </div>
    </template>
    <div class="swiper-slide" v-for="slide in schedule" :key="slide._id">
      <div class="schedule-slide-wrap">
        <h3>{{ slide.label }}</h3>
        <div class="schedule-table">
          <div class="schedule-item" v-for="item in slide.schedule" :key="item._id">
            <p>
              {{ item.time.from }} - {{ item.time.to }}<span v-if="item.onAir"><live-now /></span>
            </p>
            <h5>{{ item.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </slider-container>
</template>

<script>
import sliderArrow from '~/assets/img/icons/sliderArrow.svg?inline'
import liveNow from '~/assets/img/live_now.svg?inline'

export default {
  components: {
    sliderArrow,
    liveNow,
  },
  computed: {
    schedule() {
      return this.$store.getters['schedule/schedule']
    },
    startingIndex() {
      return this.schedule?.findIndex((item) => item.label == 'Today')
    },
  },
  data() {
    return {
      scheduleSliderOptions: {
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        grabCursor: true,
        spaceBetween: 0,
        initialSlide: this.startingIndex || 0,
        autoHeight: true, //enable auto height
        breakpoints: {
          // when window width is >= 480px
          481: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 40,
          },
        },
        // Navigation arrows
        navigation: {
          nextEl: '.schedule-next',
          prevEl: '.schedule-prev',
        },
      },
      schduleFetched: false,
    }
  },
  async created() {
    await this.$store.dispatch('schedule/fetchSchedule')
    this.schduleFetched = await true
  },
  mounted() {
    // console.log(this.$store)
  },
}
</script>

<style lang="scss" scoped>
.slider-btns-wrap {
  position: relative;
  padding: 20px 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  div {
    display: block;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &.swiper-button-disabled {
      opacity: 0.3;
    }

    svg {
      width: 100%;
    }
  }

  .slider-button-prev {
    transform: rotate(180deg);
    margin-right: 20px;
  }
}

.schedule-slider-container {
  .slider-btns-wrap {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    padding: 0;
  }
}

.radio__schedule {
  background: var(--white);
  color: var(--black);
  padding: var(--globalPadding) 0;
}

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

.schedule-slide-wrap {
  h3 {
    -webkit-text-stroke: 1px var(--black);
    color: transparent;
    text-transform: uppercase;
    border-bottom: var(--borderAtts);
    box-sizing: border-box;
    border-color: var(--black);
    padding-bottom: 20px;
  }
}

.schedule-item {
  width: 100%;
  margin-top: 20px;
  padding-bottom: 10px;
  display: grid;
  grid-template: auto 1fr / minmax(auto, 0px) 1fr;
  align-items: start;
  column-gap: 15px;
  row-gap: 5px;
  border-bottom: var(--borderAtts);
  box-sizing: border-box;
  border-color: var(--black);

  .schedule-img {
    width: 100%;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }

  p {
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    font-size: 16px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      display: block;
      width: 60px;

      svg {
        width: 100%;
      }
    }
  }

  h5 {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    text-transform: uppercase;
  }
}
</style>
