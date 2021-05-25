<template>
  <main>
    <aaja-slug-hero
      class="resident-hero"
      breadcrumbDestination="radio"
      :heroImage="heroImg"
    >
      <template v-slot:subheading>Residents</template>
      <template v-slot:heading>The Yesness</template>
      <p class="timeslot">
        <strong> First Tuesday of every month - 8-10pm </strong>
      </p>
      <p>
        The Yesness, founded in 2010 and known for there parties across London
        bring there eclectic selection from the dancefloor to the Aaja radio
        waves on the first Tuesday of every month. Hosted by Paulorder and J.nix
        no genre is of the table. Tune in to hear anything from house and garage
        to drum and bass and footwork and everything in between.
      </p>
      <a href="http://theyesness.com" target="_blank" rel="noopener noreferrer"
        >theyesness.com</a
      >
      <ul class="resident-socials">
        <li
          v-for="social in socials"
          :key="social._id"
          :class="social.icon.slug"
        >
          <a
            :href="social.link"
            target="_blank"
            rel="noopener noreferrer"
            v-html="social.icon.svg"
          ></a>
        </li>
      </ul>
    </aaja-slug-hero>
    <article>
      <aaja-container class="residents__content">
        <div v-for="(playlist, pIndex) in latestPlaylists" :key="playlist.key">
          <p v-if="$fetchState.pending">Fetching posts...</p>
          <p v-else-if="$fetchState.error">Error while fetching posts</p>
          <span v-else v-html="playlist.embed.html">
            {{ playlist.url }}
          </span>
        </div>
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { cloudinaryImgParser } from '~/utils/images'
const instagram = require('simple-icons/icons/instagram')
const twitter = require('simple-icons/icons/twitter')
const facebook = require('simple-icons/icons/facebook')
const mixcloud = require('simple-icons/icons/mixcloud')
const soundcloud = require('simple-icons/icons/soundcloud')
export default {
  async fetch() {
    this.latestPlaylists = await this.$axios
      .$get(this.mixcloudUser + 'feed/?limit=5')
      .then((response) => response)
      .then(async (res) => {
        return res.data.map((playlist) => {
          return {
            url: `${playlist.cloudcasts[0].url}`,
            key: `${playlist.key}`,
          }
        })
      })
      .catch((e) => {
        console.log('ERRORRR:', e)
      })
    let theEmbeds = await []
    const dave = await this.latestPlaylists.forEach((playlist) => {
      let embed
      let url = `${playlist.url.replace('www', 'api').trim()}embed-json/`
      const getEmbedCode = this.$axios.$get(url).then((res) => {
        embed = res
        theEmbeds.push({ embed, ...playlist })
      })
    })

    this.latestPlaylists = theEmbeds
    console.log('PLAYLISTS Fetch', this.latestPlaylists)
  },
  data() {
    return {
      latestPlaylists: null,
      mixcloudUserRaw: 'https://www.mixcloud.com/theyesness/',
      heroImg: cloudinaryImgParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
        '1:1'
      ),
      socials: [
        {
          icon: instagram,
          link: 'https://www.instagram.com/',
          _id: 'PD8al9AMwo8aBf6ZI',
        },
        {
          icon: twitter,
          link: 'https://www.twitter.com/',
          _id: 'xYreoYPbwfmIVJ7P',
        },
        {
          icon: facebook,
          link: 'https://www.facebook.com/',
          _id: 'wSmJekH',
        },
        {
          icon: mixcloud,
          link: 'https://www.mixcloud.com/',
          _id: '2SCHhcJVDwFk',
        },
        {
          icon: soundcloud,
          link: 'https://www.soundcloud.com/',
          _id: 'GzavMN',
        },
      ],
    }
  },
  computed: {
    mixcloudUser() {
      let raw = this.mixcloudUserRaw
      //www.mixcloud.com/theyesness/
      let parseStr = raw
        .replace('http', '')
        .replace('s://', '')
        .replace('://mixcloud', 'api.mixcloud')
        .replace('://', '')
        .replace('www', 'api')
        .trim()

      let str =
        parseStr.charAt(parseStr.length - 1) === '/' ? parseStr : parseStr + '/'

      return 'https://' + str
    },
  },
  created() {
    // console.log(this.mixcloudUser)
    this.$fetch()
  },
  mounted() {
    // this.$fetch()
    // console.log('PLAYLISTS', this.latestPlaylists)
  },
}
</script>

<style lang="scss">
.resident-hero {
  a {
    color: var(--white);
  }
}
.resident-socials {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  li {
    width: 30px;
    &.mixcloud {
      width: 60px;
    }
    &.soundcloud {
      width: 40px;
    }
  }
  a {
    width: 100%;
    display: block;
    svg,
    path {
      fill: var(--white);
    }
  }
}
</style>
