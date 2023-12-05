<template>
  <main class="light-theme">
    <aaja-standard-hero>
      <template v-slot:heading>
        <aaja-heading>aaja music <br />Live Events</aaja-heading>
      </template>
      <p>{{ eventsPage.intro }}</p>
      <div v-for="event in events">
        <nuxt-link :to="`/live-events/${event.slug.current}`">
          {{ formatDate(event) + event.name }}
        </nuxt-link>
      </div>
    </aaja-standard-hero>
    <article>
      <aaja-container class="channel2__content">

      </aaja-container>
    </article>
  </main>
</template>

<script>
import getVideoId from 'get-video-id'
import { format } from 'date-fns';

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
  },
  watch: { // Like useEffect
    // firstName: (value, oldValue) => { /* ... */ }
  },
  methods: {
    // helper functions
    formatDate(event) {
      if (event?.eventDateText) {
        return event?.eventDateText + ' - '
      } else if (event?.eventDateTime)
        return format(new Date(event?.eventDateTime), "d MMMM yyyy @ HH:mm") + ' - '
      else if (event?.eventDate)
        return format(new Date(event?.eventDate), "d MMMM yyyy") + ' - '
      else return ''
    },
  },
  mounted() {
    // console.log(`channel2Data`, this.channel2Data)
  },
  head: {
    htmlAttrs: {
      class: 'light',
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  overflow: scroll;
}
</style>
