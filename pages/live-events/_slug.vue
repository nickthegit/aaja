<template>
  <main class="light-theme">
    <img>
    <section class="slug__live-event">
      <aaja-container class="breadcrumb-container">
        <nuxt-link :to="`/live-events`" class="breadcrumb"><span>
            <arrow />
          </span>Back to Events</nuxt-link>
      </aaja-container>
      <aaja-standard-hero>
        <!-- <section class="bar__hero-img">
        <aaja-hero-img
          altText="Aaja Bar Hero image"
          :landscapeBg="heroImage.landscapeBlur"
          :portraitBg="heroImage.portraitBlur"
          :landscapeImgs="heroImage.landscape"
          :portraitImgs="heroImage.portrait"
        />
      </section> -->
        <template v-slot:heading>
          <aaja-heading>aaja music <span class="lowercase">x</span> <br /> {{ event.name }}
          </aaja-heading>
        </template>
        <h2 v-if="event.eventDateTime">{{ formatDateTime(event.eventDateTime) }}</h2>
        <h2 v-else-if="event.eventDate">{{ formatDate(event.eventDate) }}</h2>
      </aaja-standard-hero>
      <aaja-container class="live-event__container">
        <section>
          <p>{{ event.intro }}</p>
        </section>
        <aside v-if="event.eventLink">
          <a :href="event.eventLink" target="_blank" rel="noopener noreferrer">{{ event.ctaTitle || "Link to event!"
          }}</a>
        </aside>
      </aaja-container>
      <!-- <aaja-container v-if="event.liveStreamingLink">
        <iframe width="560" height="315" :src="event.liveStreamingLink" title="player" onError="@" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </aaja-container> -->
    </section>
  </main>
</template>

<script>
import { format } from 'date-fns'
import getVideoId from 'get-video-id'
import { liveEventSlugPageQuery } from '~/utils/queries.js'
import Arrow from '~/assets/img/icons/arrow.svg?inline'

export default {
  components: { Arrow },
  // validate({ params }) {

  //   return params.slug === "2"
  // },
  async asyncData({ $sanity, params }) {
    try {
      const data = await $sanity.fetch(liveEventSlugPageQuery(params.slug))
      console.log(data)
      return { event: data }
    } catch {
      // return navigateTo('/live-events', { redirectCode: 301 })
    }
  },
  data() {
    return {
      image: "https://cdn.sanity.io/images/ycpbe8x2/production/5ef93f3a2fd27d1945cdf6b968d3b3b8fd44e78e-5600x3200.jpg"
    }
  },
  computed: {
    youtubeLink() {
      const { id } = getVideoId(this.channel2Data.youtubeLink)
      return `https://www.youtube.com/embed/${id}?controls=0`
    },
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "d MMMM yyyy")
    },
    formatDateTime(date) {
      return format(new Date(date), "d MMMM yyyy - HH:mm")
    }
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

.slug__live-event {
  width: 100%;
  height: auto;
  min-height: 50vh;
  padding: calc(var(--headerHeight) + var(--subHeaderHeight)) 0 var(--headerHeight) 0;
  position: relative;

  @include breakpoint(mobile) {
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
  }

  aside {
    flex: 1 0 20%;

    a {
      display: inline-block;
      padding: 9px 30px;
      position: sticky;
      top: 170px;
      color: var(--white);
      background: var(--mainColor);
      text-decoration: none;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 1px;
      margin-top: 30px;

      text-align: center;

      &:hover {
        opacity: 0.7;
      }

      @include breakpoint(mobile) {
        width: 100%;
        padding: 16px 30px;
      }
    }
  }
}

.breadcrumb-container {
  padding-top: 20px;
}

.breadcrumb {
  margin-bottom: 30px;
  display: inline-block;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 500;
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
</style>
