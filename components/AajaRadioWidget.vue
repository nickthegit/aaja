<template>
  <section>
    <div class="online" v-if="liveInfo.onAir">
      <audio id="radio" :src="stationMetadata.stream_data.s1.url"></audio>
      <button class="playBtn" @click="playPause">
        <svg
          v-if="!playing"
          class="playIcon"
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
        <svg v-else class="pauseIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 531 824">
          <path
            d="M119 824H67c-37 0-67-30-67-67V67C0 30 30 0 67 0h52c37 0 68 30 68 67v690c0 37-31 67-68 67zm345 0h-53c-37 0-67-30-67-67V67c0-37 30-67 67-67h53c37 0 67 30 67 67v690c0 37-30 67-67 67z"
            fill-rule="evenodd"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="now-next">
        <p class="now" v-if="liveInfo.current">
          {{ liveInfo.current.name }} - {{ liveInfo.current.starttime }} -
          {{ liveInfo.current.endtime }}
        </p>
        <span v-if="liveInfo.next"></span>
        <p class="next" v-if="liveInfo.next">
          Coming up next: {{ liveInfo.next.name }} - {{ liveInfo.next.starttime }} -
          {{ liveInfo.next.endtime }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { format, formatISO, parseISO } from 'date-fns'
export default {
  async fetch() {
    let createDateInstance = (date) => parseISO(formatISO(new Date([date].toString())))
    this.liveInfo = await fetch(`http://${this.station}.airtime.pro/api/live-info-v2`).then(
      (response) =>
        response
          .json()
          .then((data) => {
            let shows = data.shows
            let current = shows.current
            let next = shows.next[0]
            let onAir
            if (current) {
              current.starttime = format(createDateInstance(current.starts), 'HH:mm')
              current.endtime = format(createDateInstance(current.ends), 'HH:mm')
              if (next) {
                next.starttime = format(createDateInstance(next.starts), 'HH:mm')
                next.endtime = format(createDateInstance(next.ends), 'HH:mm')
              }
              onAir = true
            } else {
              onAir = false
            }
            return { current, next, onAir }
          })
          .catch((e) => error.log('Error with fetching radio widget liveInfo data::', e))
    )
    this.stationMetadata = await fetch(
      `http://${this.station}.airtime.pro/api/station-metadata`
    ).then((response) =>
      response
        .json()
        .catch((e) => error.log('Error with fetching radio widget stationMetadata data::', e))
    )
    console.log(this.stationMetadata)
  },
  data() {
    return {
      playing: false,
      onAir: true,
      now: 'Harvey - 14:00 - 16:00',
      next: 'Handclap - 16:00 - 18:00',
      liveInfo: {},
      stationMetadata: '',
      // station: 'aajamusic'
      station: 'sourcefabric',
    }
  },
  methods: {
    playPause() {
      const radio = this.$el.querySelector('#radio')
      if (radio.paused) {
        radio.play()
        this.playing = true
      } else {
        radio.pause()
        this.playing = false
      }
    },
  },
  mounted() {
    const radio = this.$el.querySelector('#radio')
    if (radio) {
      radio.onpause = (event) => {
        this.playing = false
      }
      radio.onplay = (event) => {
        this.playing = true
      }
    }
    // http://sourcefabric.airtime.pro/api/live-info-v2
    // http://aajamusic.airtime.pro/api/station-metadata
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
    fill: var(--mainColor);
    stroke: var(--mainColor);
  }
  path {
    fill: var(--mainColor);
    stroke: var(--mainColor);
  }
  .pauseIcon {
    width: 12px;
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
    border-left: 1px solid var(--mainColor);
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
