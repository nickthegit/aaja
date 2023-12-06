<template>
  <main class="light-theme" :style="styleObject">
    <aaja-hero-img class="live-event__hero-image" v-if="eventData.feature_image" altText="Aaja Bar Hero image"
      :landscapeBg="heroImage.landscapeBlur" :portraitBg="heroImage.portraitBlur" :landscapeImgs="heroImage.landscape"
      :portraitImgs="heroImage.portrait" />
    <section class="slug__live-event">
      <aaja-container class="breadcrumb-container">
        <nuxt-link :to="`/live-events`" class="breadcrumb"><span>
            <arrow />
          </span>Back to Events</nuxt-link>
      </aaja-container>
      <aaja-standard-hero>
        <template v-slot:heading :style="textColor.color">
          <aaja-heading>{{ eventData.name }}
          </aaja-heading>
        </template>
        <h2 v-if="eventData.eventDateText">{{ eventData.eventDateText }}</h2>
        <!-- <h2 v-else-if="eventData.eventDateTime">{{ formatDateTime }}</h2>
        <h2 v-else-if="eventData.eventDate">{{ formatDate }}</h2> -->
        <h4 v-if="eventData.eventLocation"> {{ eventData.eventLocation }}</h4>
      </aaja-standard-hero>
      <aaja-container class="live-event__container">
        <section>
          <SanityContent v-if="eventData.intro" :blocks="eventData.intro" />

        </section>
        <aside v-if="eventData.eventLink">
          <a :href="eventData.eventLink" target="_blank" rel="noopener noreferrer">{{ eventLinkCtaLabel }} </a>
          <audio id="audio" :src="eventData.audioStreamingLink" preload="auto"></audio>
          <button class="playBtn" @click="playPause" v-if="eventData.audioStreamingLink">
            {{ audioCtaLabel }}
            <svg v-if="!playing" class="playIcon" width="13" height="20" viewBox="0 0 13 20" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12.0313 9.54242C12.4727 9.93966 12.4727 10.6318 12.0313 11.029L3.09757 19.0694C2.45405 19.6485 1.42861 19.1918 1.42861 18.3261L1.42861 2.24536C1.42861 1.37959 2.45405 0.922898 3.09757 1.50207L12.0313 9.54242Z"
                fill="white" stroke="#262626" stroke-linejoin="round" />
            </svg>
            <svg v-else class="pauseIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 531 824">
              <path
                d="M119 824H67c-37 0-67-30-67-67V67C0 30 30 0 67 0h52c37 0 68 30 68 67v690c0 37-31 67-68 67zm345 0h-53c-37 0-67-30-67-67V67c0-37 30-67 67-67h53c37 0 67 30 67 67v690c0 37-30 67-67 67z"
                fill-rule="evenodd" clip-rule="evenodd" />
            </svg>
          </button>
          <iframe v-if="eventData.iframeLink" id="myIframe" :src="eventData.iframeLink" title="YouTube video player"
            frameborder="0" autoplay="1" start
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </aside>
      </aaja-container>
    </section>
  </main>
</template>

<script>
import { format } from 'date-fns';
import { liveEventSlugPageQuery } from '~/utils/queries.js';
import Arrow from '~/assets/img/icons/arrow.svg?inline';
import { cloudinaryHeroParser } from '~/utils/images'


export default {
  components: { Arrow },
  async asyncData({ $sanity, params, app }) {
    const data = await $sanity.fetch(liveEventSlugPageQuery(params.slug))
    if (!data.slug?.current) app.router.push({ path: '/live-events' })
    const backgroundColor = !data.feature_image && data?.backgroundColor ? data.backgroundColor : '';
    const color = !data.feature_image && data?.textColor ? data?.textColor : '';
    return {
      eventData: data,
      styleObject: { backgroundColor },
      textColor: { color }
    }
  },
  data() {
    return {
      playing: false
    }
  },
  computed: {
    heroImage() {
      const image = this.$urlForSquare(this.eventData.feature_image);
      const parsedImage = cloudinaryHeroParser(image.desktop['1200']);
      return parsedImage
    },
    formatDate() {
      return format(new Date(this.eventData.eventDate), "d MMMM yyyy")
    },
    formatDateTime() {
      return format(new Date(this.eventData.eventDateTime), "d MMMM yyyy - HH:mm")
    },
    audioCtaLabel() {
      return this.playing ? 'Pause' : 'Play'
    },
    eventLinkCtaLabel() {
      return this.eventData.ctaTitle || "Link to event!"
    },

  },
  methods: {
    playPause() {
      const audio = this.$el.querySelector('#audio')
      if (this.playing) {
        audio.pause()
        this.playing = false;
      } else {
        audio.play();
        this.playing = true;
      };
    },
    // setTheme() {
    //   this.styleObject.backgroundColor = this.eventData.backgroundColor
    // }
  },
  mounted() {

  },
  head: {
    htmlAttrs: {
      class: 'light',
    },
  },
}
</script>

<style lang="scss">
.slug__live-event {
  .standard__hero {
    .subheading {
      display: flex;
      flex-wrap: wrap;
      max-width: unset;
      width: 100% !important;

      h2 {
        flex: 1 0 100%;
        margin-bottom: 13px;
        font-size: calc(var(--h2Size) - 1vw);
      }
    }
  }
}
</style>

<style lang="scss" scoped>
main {
  width: 100%;
  overflow: scroll;
}

.live-event__hero-image {
  opacity: 0.5;

  &:after {
    content: '';
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background: linear-gradient(175deg, rgba(255, 255, 255, 0) 30%, var(--white) 100%);
    backdrop-filter: blur(2px);
  }
}

.slug__live-event {
  width: 100%;
  height: auto;
  min-height: 50vh;
  padding: calc(var(--headerHeight) + var(--subHeaderHeight)) 0 var(--headerHeight) 0;
  position: relative;

  @include breakpoint(tablet-mobile) {
    padding: calc(var(--headerHeight) * 1.5 + var(--subHeaderHeight)) 0 var(--headerHeight) 0;
  }
}

.live-event__container {
  display: flex;
  gap: 4vw;

  @include breakpoint(mobile) {
    flex-wrap: wrap;

    section,
    aside {
      flex: 1 0 100%;
    }
  }

  section {
    flex: 1 1 80%;
    color: #000;
    font-weight: 500;
  }

  aside {
    flex: 1 0 20%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    gap: 30px;


    a,
    button {
      display: flex;
      justify-content: center;
      flex: 1 0 100%;
      height: fit-content;
      padding: 9px 30px;
      color: var(--white);
      background: var(--mainColor);
      text-decoration: none;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 1px;
      text-align: center;
      border: none;

      &:hover {
        opacity: 0.7;
      }

      @include breakpoint(mobile) {
        width: 100%;
        padding: 16px 30px;
      }

      &.playBtn {
        display: flex;
        justify-content: center;
        transition-duration: 0.2s;
        gap: 20px;

        .playIcon,
        .pauseIcon {
          width: 12px;
          fill: var(--white);
          transform: translateX(0);
          transition: 0.2s transform ease-in-out;
        }

        &:hover svg {
          transform: translateX(10px);

        }
      }

      iframe {
        width: 100%;
      }

    }
  }
}

.breadcrumb-container {
  padding-top: 20px;

  .breadcrumb {
    margin-bottom: 30px;
    display: inline-block;
    text-decoration: underline;
    font-size: 16px;
    font-weight: bold;
    color: var(--mainColor);


    &:hover {
      opacity: 0.7;

      span {
        transform: translateX(-5px);
      }
    }

    span {
      display: inline-block;
      width: 17px;
      vertical-align: middle;
      margin-right: 10px;
      transform: translateX(0);
      transition: 0.2s transform ease-in;

      svg {
        width: 100%;

        path {
          fill: var(--mainColor);
        }
      }
    }
  }
}
</style>
