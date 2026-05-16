<template>
  <main class="light-theme">
    <aaja-standard-hero>
      <template v-slot:heading>
        <aaja-heading>aaja music <br />Channel 2</aaja-heading>
      </template>
      <p>{{ channel2Data.intro }}</p>
    </aaja-standard-hero>
    <article>
      <aaja-container class="channel2__content">
        <div class="iframe-wrap">
          <iframe id="embed_player" frameborder="0" width="350" height="396" src="https://aaja2.airtime.pro/embed/player?stream=auto&skin=2"></iframe>
          <iframe class="schedule-widget" height="400px" width="550px" scrolling="yes" frameborder="0" src=https://aaja2.airtime.pro/embed/weekly-program></iframe>

          <!-- <iframe
            width="560"
            height="315"
            :src="youtubeLink"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe> -->
        </div>
      </aaja-container>
    </article>
  </main>
</template>

<script>
import getVideoId from 'get-video-id'
export default {
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(`*[_type == "channel2Page"]`)

    return { channel2Data: data[0] }
  },
  data() {
    return {}
  },
  computed: {
    youtubeLink() {
      const { id } = getVideoId(this.channel2Data.youtubeLink)
      return `https://www.youtube.com/embed/${id}?controls=0`
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
.channel2__ {
  &content {
    .iframe-wrap {
      width: 100%;
      height: auto;
      position: relative;
      // padding-bottom: 56.25%;
      // background-color: var(--dark);
      // background-image: url('https://res.cloudinary.com/nickjohn/image/upload/f_auto,w_500/v1620549353/Aaja/aaja_black_logo.png');
      // background-size: 40%;
    }
    iframe {
      width: 100%;
      // height: 100%;
      position: relative;
      top: 0;
      left: 0;
    }
    .schedule-widget {
      width: 100%;
    }
  }
}
</style>
