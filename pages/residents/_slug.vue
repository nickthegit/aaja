<template>
  <main>
    <AajaSlugHero
      class="resident-hero"
      breadcrumbDestination="radio"
      :heroImage="residentData.feature_image ? heroImage : {}"
    >
      <template v-slot:subheading>Residents</template>
      <template v-slot:heading v-if="residentData.name">{{ residentData.name }}</template>
      <p class="timeslot" v-if="residentData.slot">
        <strong>{{ residentData.slot }}</strong>
      </p>
      <SanityContent :blocks="residentData.bio" v-if="residentData.bio" />
      <!-- <p v-if="residentData.bio">{{ residentData.bio }}</p> -->
      <a
        v-if="residentData.website"
        :href="residentData.website"
        target="_blank"
        rel="noopener noreferrer"
        >{{ residentData.website }}</a
      >
      <ul class="resident-socials">
        <li v-for="social in getSocials" :key="social._id" :class="social.icon.slug">
          <a
            :href="social.link"
            target="_blank"
            rel="noopener noreferrer"
            v-html="social.icon.svg"
          ></a>
        </li>
      </ul>
    </AajaSlugHero>
    <article>
      <AajaContainer
        class="residents__content"
        v-if="residentData.soundcloud_embed"
        v-html="residentData.soundcloud_embed"
      >
      </AajaContainer>
    </article>
  </main>
</template>

<script>
import { residentSlugPageQuery } from '~/utils/queries.js'

const instagram = require('simple-icons/icons/instagram')
const twitter = require('simple-icons/icons/twitter')
const facebook = require('simple-icons/icons/facebook')
const mixcloud = require('simple-icons/icons/mixcloud')
const soundcloud = require('simple-icons/icons/soundcloud')
export default {
  async asyncData({ params, $sanity }) {
    const data = await $sanity.fetch(residentSlugPageQuery(params.slug))

    return { residentData: data }
  },

  data() {
    return {
      latestPlaylists: null,
      mixcloudUserRaw: 'https://www.mixcloud.com/theyesness/',
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
      socialIcons: {
        instagram,
        facebook,
        twitter,
        mixcloud,
        soundcloud,
      },
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

      let str = parseStr.charAt(parseStr.length - 1) === '/' ? parseStr : parseStr + '/'

      return 'https://' + str
    },
    heroImage() {
      return this.$urlForSquare(this.residentData.feature_image, false, true)
    },
    getSocials() {
      return this.residentData.socials
        .filter((social) => social.link)
        .map((social) => {
          return { ...social, icon: this.socialIcons[social.slug] }
        })
    },
  },
  created() {},
  mounted() {
    console.log(this.residentData)
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
  flex-gap: 20px;
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
article {
  padding-bottom: 40px;
  iframe {
  }
}
main {
  @include breakpoint(mobile) {
    margin-top: 100px !important;
  }
}
</style>
