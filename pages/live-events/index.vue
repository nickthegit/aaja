<template>
  <main>
    <section class="live-event__hero">
      <section class="live-event__hero-img">
        <aaja-hero-img class="live-event__hero-image" v-if="eventsPage.feature_image" altText="Aaja Events Hero image"
          :landscapeBg="heroImage.landscapeBlur" :portraitBg="heroImage.portraitBlur"
          :landscapeImgs="heroImage.landscape" :portraitImgs="heroImage.portrait" />
      </section>
      <aaja-container class="live-event__hero-header">
        <div class="live-event__hero-header-wrapper">
          <aaja-heading-block>
            <SanityContent :blocks="eventsPage.heading" />
          </aaja-heading-block>
          <p v-if="eventsPage.headingIntro" class="live-event__hero-header-intro">{{ eventsPage.headingIntro }}</p>
        </div>
      </aaja-container>
    </section>
    <article class="live-event__content-wrapper">
      <aaja-container class="live-event__intro">
        <SanityContent v-if="eventsPage.intro" :blocks="eventsPage.intro" />
      </aaja-container>
      <aaja-container class="live-event__cards-wrapper">
        <nuxt-link class="live-event__cards-wrapper--card" v-for="event in eventCards" :key="event._id"
          :to="`live-events/${event.slug.current}`" v-if="isFutureEvent(event)">
          <h4 v-if="event.name">{{ event.name }}</h4>
          <p class="event-date" v-if="event.eventDateText">{{ event?.eventDateText }}</p>
          <p class="event-location" v-if="event.eventLocation">{{ '@' + event.eventLocation }}</p>
          <aaja-img :altText="`Aaja event - ${event.name}`" :desktopBg="event.img.desktopBlur"
            :mobileBg="event.img.mobileBlur" :desktopImgs="event.img.desktop" :mobileImgs="event.img.mobile"
            :ratio="[1, 1]" :percentageOfViewportWidth="33" />
        </nuxt-link>
      </aaja-container>
    </article>
  </main>
</template>

<script>
import getVideoId from 'get-video-id'
import { isAfter, isToday } from 'date-fns';
import { cloudinaryHeroParser } from '~/utils/images'

export default {
  // Fetch
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(`*[_type == "liveEventsLandingPage"][0]`);
    const events = await $sanity.fetch(`*[_type == "liveEvents"]`)
    return { eventsPage: data, events }
  },
  computed: {
    // Like useMemo
    // Return cached values until dependencies change (i.e. this.fooBar)
    youtubeLink() {
      const { id } = getVideoId(this.channel2Data.youtubeLink)
      return `https://www.youtube.com/embed/${id}?controls=0`
    },
    heroImage() {
      const image = this.$urlForSquare(this.eventsPage.feature_image);
      return cloudinaryHeroParser(image.desktop['1200']);
    },
    eventCards() {
      return this.events.map((event) => {
        let img = this.$urlForSquare(event.feature_image, false, true)
        return { ...event, img }
      })
    },
  },
  watch: { // Like useEffect
    // firstName: (value, oldValue) => { /* ... */ }
  },
  methods: {
    isFutureEvent(event) {
      const date = event.eventDateText.split('@')[0]
      return isToday(new Date(date), new Date()) || isAfter(new Date(date), new Date());
    },

    // helper functions
    formatDate(event) {
      if (event?.eventDateText) {
        return event?.eventDateText + ' - ' + event?.name;
      }
    },
  },
  mounted() {
    // console.log(`channel2Data`, this.channel2Data)
  },
  head: {
    htmlAttrs: {
      // class: 'light',
    },
  },
}
</script>

<style lang="scss" scoped>
.live-event {
  &__hero {
    &-img {
      width: 100%;
      height: 100vh;
      position: relative;
      z-index: 1;
      filter: grayscale(1) brightness(0.7);
    }

    &-header {
      position: absolute;
      flex: 1 0 auto;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-top: 80px;
      padding-bottom: 40px;
      color: var(--white);
      --headerColor: var(--white);

      @include breakpoint(mobile) {
        padding-top: 160px;
      }

      &-wrapper {
        width: 100%;
      }

      &-intro {
        width: 60%;
        margin-top: 20px;

        @include breakpoint(tablet-mobile) {
          width: 100%;
          margin-top: 13px;
        }
      }
    }

    &-opening {
      p {
        text-transform: uppercase;
        margin-bottom: 20px;
      }

      strong {
        font-weight: 600;
        font-size: 20px;

        @include breakpoint(mobile) {
          font-size: 16px;
        }
      }

      .button-wrap {
        display: flex;
        gap: 20px;
        margin-top: 30px;
      }

      a {
        width: 140px;
        height: 40px;
        display: flex;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        background: var(--white);
        color: var(--dark);
        text-decoration: none;
        cursor: pointer;

        &:hover {
          opacity: 0.75;
          text-decoration: underline;
        }
      }
    }
  }

  &__content-wrapper {
    min-height: 50vh;
    padding: var(--globalPadding) 0;
  }

  &__intro {
    padding-top: 0;
    padding-bottom: calc(var(--globalPadding) / 2);
  }

  &__cards-wrapper {
    width: 100%;
    display: grid;
    grid-template: auto / 1fr 1fr 1fr;
    gap: calc(var(--globalPadding) / 2);
    grid-gap: calc(var(--globalPadding) / 2);

    @include breakpoint(mobile) {
      grid-template: auto / 100%;
    }

    &--card {
      width: 100%;
      display: block;
      text-decoration: none;
      color: var(--white);
      padding-bottom: var(--globalPadding);

      &:hover {
        opacity: 0.7;
      }

      h3 {
        padding: 20px;
      }

      p {
        margin-bottom: 13px;
      }

      p:not(.event-location) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
