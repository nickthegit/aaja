<template>
  <section>
    <div class="online" v-if="radioInfo.onAir">
      <audio id="radio" :src="s1Stream"></audio>
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
      <div class="on_air">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          viewBox="0 0 47.7 15"
          xml:space="preserve"
        >
          <style>
            .st0 {
              fill: #fd5c5c;
            }
          </style>
          <path
            class="st0"
            d="M15 9.1c0 3.7 1.4 5.4 3.5 5.4S22 12.8 22 9.1V5.9C22 2.2 20.7.5 18.5.5 16.4.5 15 2.2 15 5.9v3.2zm2.9-6.2c0-.4.2-.6.5-.6s.5.2.5.6V12c0 .4-.1.6-.5.6-.3 0-.5-.2-.5-.6V2.9zM22.4.7v13.6h2.4l-.2-6.9h.2l1.3 6.9h2.5V.7h-2.4l.2 6.9h-.2L24.9.7h-2.5zm9.6 0l-1.2 13.4v.2H33l.2-3.3h1l.2 3.3H37v-.2L35.8.7H32zm1.4 8.2l.3-4.8h.2l.3 4.8h-.8zM37.5.7v13.6h2.7V.7h-2.7zm3.3 0v13.6h2.6V8.8c.5 0 .7.4.7 1.1l.1 2.3c0 .9.1 1.6.3 2.1H47v-.2c-.2-.4-.3-.9-.3-2.1v-1.3c0-1.5-.3-2.2-1.3-2.8v-.2c1-.6 1.6-1.6 1.6-3.2v-.3C47 2 45.6.7 43.4.7h-2.6zm2.6 1.7h.2c.4 0 .7.3.7 1.2v2.2c0 .9-.3 1.3-.7 1.3h-.2V2.4z"
          />
        </svg>
      </div>
      <div class="now-next">
        <p class="now" v-if="radioInfo.current">
          {{ radioInfo.current.name }} - {{ formatTime(radioInfo.current.starts) }} -
          {{ formatTime(radioInfo.current.ends) }}
        </p>
        <span v-if="radioInfo.next"></span>
        <p class="next" v-if="radioInfo.next">
          Coming up next: {{ radioInfo.next.name }} - {{ formatTime(radioInfo.next.starts) }} -
          {{ formatTime(radioInfo.next.ends) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { format, toDate, parseISO } from 'date-fns'
export default {
  data() {
    return {
      playing: false,
    }
  },
  computed: {
    radioInfo() {
      return this.$store.getters.radioInfo
    },
    s1Stream() {
      return this.$store.getters.s1Stream
    },
  },
  methods: {
    playPause() {
      const radio = this.$el.querySelector('#radio')
      if (radio) {
        if (radio.paused) {
          radio.play()
          this.playing = true
        } else {
          radio.pause()
          this.playing = false
        }
      }
    },
    listenerPlayPause() {
      const radio = this.$el.querySelector('#radio')
      if (radio) {
        radio.onpause = (event) => {
          this.playing = false
        }
        radio.onplay = (event) => {
          this.playing = true
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
    // setInterval(() => {
    //   this.$store.dispatch('fetchRadio')
    // }, 60 * 1000)
    // this.$nextTick(() => {
    //   this.listenerPlayPause()
    //   this.$store.dispatch('fetchRadio')
    // })
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
.on_air {
  width: auto;
  height: 18px;
  display: block;
  svg {
    height: 100%;
    position: relative;
    left: -10px;
    path {
      fill: var(--mainColor);
    }
  }
  @include breakpoint(mobile) {
    height: 15px;
  }
}
.playBtn {
  background: none;
  border: none;
  width: 30px;
  box-sizing: border-box;
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
  margin-left: 10px;
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
