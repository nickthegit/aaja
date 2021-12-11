<template>
  <section>
    <div class="on_air">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 954 414"
        style="enable-background: new 0 0 954 414"
        xml:space="preserve"
      >
        <path
          d="M4.1 254.3c0 109.4 41.4 159.6 103.5 159.6S211 363.7 211 254.3v-94.6C211 50.4 172.6.1 107.6.1 45.5.1 4.1 50.4 4.1 159.7v94.6zM89.8 71.1c0-11.8 5.9-17.7 14.8-17.7s14.8 5.9 14.8 17.7v269c0 11.8-3 17.7-14.8 17.7-8.9 0-14.8-5.9-14.8-17.7v-269zM222.9 6v402h70.9l-5.9-204h5.9l38.4 204h73.9V6h-70.9l5.9 204h-5.9L296.8 6h-73.9zm283.7 0-35.5 396.1v5.9h65l5.9-97.5h29.6l5.9 97.5h76.9v-5.9L618.9 6H506.6zM548 248.4l8.9-141.9h5.9l8.9 141.9H548zM669.2 6v402H749V6h-79.8zm97.5 0v402h76.9V245.5c14.8 0 20.7 11.8 20.7 32.5l3 68c0 26.6 3 47.3 8.9 62.1H950v-5.9c-5.9-11.8-8.9-26.6-8.9-62.1v-38.4c0-44.3-8.9-65-38.4-82.8V213c29.6-17.7 47.3-47.3 47.3-94.6v-8.9C950 44.5 908.6 6 843.6 6h-76.9zm76.9 50.3h5.9c11.8 0 20.7 8.9 20.7 35.5v65c0 26.6-8.9 38.4-20.7 38.4h-5.9V56.3z"
        />
      </svg>
    </div>
    <span class="separator end"></span>
    <div class="channel channel-1">
      <audio id="radio" :src="s1Stream" preload="auto"></audio>
      <h2>CH 1</h2>
      <button class="playBtn" @click="playPause(1)">
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
      <div class="now-wrapper">
        <p
          class="now"
          v-if="radioInfo.current"
          v-html="
            radioInfo.current.name +
            ' - ' +
            formatTime(radioInfo.current.starts) +
            ' - ' +
            formatTime(radioInfo.current.ends)
          "
        ></p>
        <p v-else-if="radioInfo.next">
          Coming up: {{ radioInfo.next.name }} - {{ formatTime(radioInfo.next.starts) }}
        </p>
        <p v-else>-</p>
      </div>
    </div>
    <span class="separator"></span>
    <div class="channel channel-2">
      <audio id="radio2" :src="s2Stream" preload="auto"></audio>
      <h2>CH 2</h2>
      <button class="playBtn" @click="playPause(2)">
        <svg
          v-if="!playing2"
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
      <div class="now-wrapper">
        <p
          class="now"
          v-if="radioInfo2.current"
          v-html="
            radioInfo2.current.name +
            ' - ' +
            formatTime(radioInfo2.current.starts) +
            ' - ' +
            formatTime(radioInfo2.current.ends)
          "
        ></p>
        <p v-else-if="radioInfo2.next">
          Coming up: {{ radioInfo2.next.name }} - {{ formatTime(radioInfo2.next.starts) }}
        </p>
        <p v-else>-</p>
      </div>
    </div>
    <span class="separator end"></span>
  </section>
</template>

<script>
import { format, toDate, parseISO } from 'date-fns'
export default {
  data() {
    return {
      playing: false,
      playing2: false,
    }
  },
  computed: {
    radioInfo() {
      return this.$store.getters.radioInfo
    },
    radioInfo2() {
      return this.$store.getters.radioInfo2
    },
    s1Stream() {
      return this.$store.getters.s1Stream
    },
    s2Stream() {
      return this.$store.getters.s2Stream
    },
  },
  methods: {
    playPause(val) {
      const radio = this.$el.querySelector('#radio')
      const radio2 = this.$el.querySelector('#radio2')
      if (val === 1) {
        if (radio) {
          if (radio2) {
            radio2.pause()
          }
          if (radio.paused) {
            radio.play()
            this.playing = true
          } else {
            radio.pause()
            this.playing = false
          }
        }
      }
      if (val === 2) {
        if (radio2) {
          if (radio) {
            radio.pause()
          }
          if (radio2.paused) {
            radio2.play()
            this.playing2 = true
          } else {
            radio2.pause()
            this.playing2 = false
          }
        }
      }
    },
    listenerPlayPause() {
      const radio = this.$el.querySelector('#radio')
      const radio2 = this.$el.querySelector('#radio2')
      if (radio) {
        radio.onpause = (event) => {
          this.playing = false
        }
        radio.onplay = (event) => {
          this.playing = true
        }
      }
      if (radio2) {
        radio2.onpause = (event) => {
          this.playing2 = false
        }
        radio2.onplay = (event) => {
          this.playing2 = true
        }
      }
    },
    formatTime(val) {
      if (!val) {
        return
      }
      let formattedDate = format(toDate(parseISO(val)), 'HH:mm')
      return formattedDate
    },
  },
  mounted() {
    setInterval(() => {
      this.$store.dispatch('fetchRadio')
      this.$store.dispatch('fetchRadio2')
    }, 60 * 1000)
    this.$nextTick(() => {
      this.listenerPlayPause()
      this.$store.dispatch('fetchRadio')
      this.$store.dispatch('fetchRadio2')
    })
    // console.log(this.$store.state.stationMeta)
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
.on_air {
  width: auto;
  height: calc(var(--headerHeight) / 3);
  // height: 20px;
  display: block;
  svg {
    height: 100%;
    position: relative;
    path {
      fill: var(--mainColor);
    }
  }
  @include breakpoint(mobile) {
    height: 15px;
  }
}
.separator {
  display: block;
  height: calc(var(--headerHeight) / 2);
  width: 1px;
  border-left: 1px solid var(--mainColor);
  margin: 0 20px;
}
.channel {
  flex-grow: 2;
  display: flex;
  align-items: center;
  h2 {
    font-size: 2.6vmin;
    margin-bottom: -0.3vmin;
    white-space: nowrap;
  }
}
.playBtn {
  background: none;
  border: none;
  height: calc(var(--headerHeight) / 3);
  box-sizing: border-box;
  margin: 0 10px;
  svg {
    height: 100%;
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

.now-wrapper {
  display: flex;
  align-items: center;
  p {
    display: inline-block;
    margin-bottom: 0;
    text-transform: uppercase;
    font-size: 2.2vmin;
  }
}

@media only screen and (max-width: 1000px) {
  .separator.end,
  .on_air {
    display: none;
  }
  section {
    padding: 0;
  }
  .channel {
    padding: 0 40px;
  }
  .now-wrapper {
    p {
      font-size: 1.8vmin;
    }
  }
}

@include breakpoint(tablet-mobile) {
  .separator {
    display: none;
  }
  section {
    flex-wrap: wrap;
  }
  .channel {
    width: 100%;
    h2 {
      font-size: 24px;
    }
  }
  .channel-2 {
    border-top: var(--borderAtts);
  }
  .now-wrapper {
    p {
      font-size: 18px;
    }
  }
}
@include breakpoint(mobile) {
  .channel {
    padding: 5px 20px;
    h2 {
      font-size: 18px;
      margin-bottom: -3px;
    }
  }
  .now-wrapper {
    p {
      font-size: 14px;
    }
  }
}
//
//
//

// @include breakpoint(tablet-mobile)
</style>
