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
    <article class="live-event__content-wrapper" >
      <aaja-container class="live-event__intro">
        <SanityContent v-if="eventsPage.intro && hasFutureEvents" :blocks="eventsPage.intro" />
        <p v-else="eventsPage.introNoEvents">{{ eventsPage.introNoEvents || "No upcoming streamed events at the moment." }}</p>
      </aaja-container>

      <aaja-container class="live-event__cards-wrapper" v-if="hasFutureEvents">
        <nuxt-link class="live-event__cards-wrapper--card" v-for="event in futureEventCards" :key="event._id"
          :to="`/live-events/${event.slug.current}`">
          <h4 v-if="event.name">{{ event.name }}</h4>
          <p class="event-date" v-if="event.eventDateText">{{ event?.eventDateText }}</p>
          <p class="event-location" v-if="event.eventLocation">{{ '@' + event.eventLocation }}</p>
          <aaja-img v-if="event.img" :altText="`Aaja event - ${event.name}`" :desktopBg="event.img.desktopBlur"
            :mobileBg="event.img.mobileBlur" :desktopImgs="event.img.desktop" :mobileImgs="event.img.mobile"
            :ratio="[1, 1]" :percentageOfViewportWidth="33" />
        </nuxt-link>
      </aaja-container>

      <aaja-container v-if="hasPastEvents" class="live-event__archive-intro">
        <h2 class="live-event__archive-title">Archive</h2>
      </aaja-container>

      <aaja-container class="live-event__cards-wrapper live-event__cards-wrapper--archive" v-if="hasPastEvents">
        <nuxt-link class="live-event__cards-wrapper--card live-event__cards-wrapper--card-archive" v-for="event in pastEventCards" :key="event._id"
          :to="`/live-events/${event.slug.current}`">
          <h4 v-if="event.name">{{ event.name }}</h4>
          <p class="event-date" v-if="event.eventDateText">{{ event?.eventDateText }}</p>
          <p class="event-location" v-if="event.eventLocation">{{ '@' + event.eventLocation }}</p>
          <aaja-img v-if="event.img" :altText="`Aaja event - ${event.name}`" :desktopBg="event.img.desktopBlur"
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
        let img = null;
        if (event.feature_image) {
          img = this.$urlForSquare(event.feature_image, false, true)
        }
        return { ...event, img }
      })
    },
    futureEventCards() {
      return this.eventCards
        .filter(this.isFutureEvent)
        .sort((a, b) => this.getEventTimestamp(a, Infinity) - this.getEventTimestamp(b, Infinity))
    },
    pastEventCards() {
      return this.eventCards
        .filter(event => !this.isFutureEvent(event))
        .sort((a, b) => this.getEventTimestamp(b, 0) - this.getEventTimestamp(a, 0))
    },
    hasFutureEvents() {
      return this.futureEventCards.length > 0
    },
    hasPastEvents() {
      return this.pastEventCards.length > 0
    },

  },
  watch: { // Like useEffect
    // firstName: (value, oldValue) => { /* ... */ }
  },
  methods: {
    isFutureEvent(event) {
      if (!event || !event.eventDateText) return false;
      const date = event.eventDateText.split('@')[0]
      return isToday(new Date(date), new Date()) || isAfter(new Date(date), new Date());
    },
    getEventTimestamp(event, fallback) {
      return event?.eventDateText ? new Date(event.eventDateText.split('@')[0]).getTime() : fallback;
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

  &__archive-intro {
    padding-top: calc(var(--globalPadding) * 1.5);
    padding-bottom: calc(var(--globalPadding) / 2);
  }

  &__archive-title {
    font-size: 32px;
    margin-bottom: 20px;
    text-transform: uppercase;
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

    &--archive {
      grid-template: auto / 1fr 1fr 1fr 1fr;
      
      @include breakpoint(mobile) {
        grid-template: auto / 1fr 1fr;
      }
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

      &-archive {
        opacity: 0.6;
        transition: opacity 0.3s ease;
        
        &:hover {
          opacity: 1;
        }

        h4 {
          padding: 15px;
          font-size: 16px;
        }

        p {
          font-size: 14px;
        }

        ::v-deep .aaja-img {
          filter: grayscale(1);
          transition: filter 0.3s ease;
        }

        &:hover ::v-deep .aaja-img {
          filter: grayscale(0);
        }
      }

      h4 {
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
