<template>
  <transition name="nav">
    <aside v-if="$store.state.navState" @click="navClose">
      <button id="closeMenu" @click="navClose">
        <Close />
      </button>
      <nav @click.stop>
        <ul id="navMenu">
          <li v-for="link in links" :key="link._id" @click="navClose">
            <a
              v-if="link.external_link"
              :href="link.external_link"
              target="_blank"
              rel="noopener noreferrer"
              >{{ link.name }}</a
            >
            <nuxt-link v-else :to="`/${link.slug}`">{{ link.name }}</nuxt-link>
          </li>
        </ul>
        <ul id="navSocials">
          <li v-for="social in getSocials" :key="social._id" :class="social.icon.slug">
            <a
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              v-html="social.icon.svg"
            ></a>
          </li>
        </ul>
      </nav>
    </aside>
  </transition>
</template>

<script>
import Close from '~/assets/img/icons/close.svg?inline'

import { headerQuery } from '~/utils/queries.js'

const instagram = require('simple-icons/icons/instagram')
const twitter = require('simple-icons/icons/twitter')
const facebook = require('simple-icons/icons/facebook')
const mixcloud = require('simple-icons/icons/mixcloud')
const soundcloud = require('simple-icons/icons/soundcloud')

export default {
  components: { Close },
  async fetch() {
    this.data = await this.$sanity.fetch(headerQuery)
  },
  data() {
    return {
      data: '',
      socials: [
        {
          icon: instagram,
          link: 'https://www.instagram.com/',
          _id: '9woz6mv0KH',
        },
        {
          icon: twitter,
          link: 'https://www.twitter.com/',
          _id: 'C1K3VoByqeUme4L',
        },
        {
          icon: facebook,
          link: 'https://www.facebook.com/',
          _id: 'gMCgELgBYO6vI1d1',
        },
        {
          icon: mixcloud,
          link: 'https://www.mixcloud.com/',
          _id: '7QY5WycuOSTATwfvdE',
        },
        {
          icon: soundcloud,
          link: 'https://www.soundcloud.com/',
          _id: 'cp52vCk7JPBnfIM3dMb',
        },
      ],
      links: [
        {
          name: 'Radio',
          slug: 'radio',
          external_link: null,
          _id: '62743512',
        },
        {
          name: 'Channel 2',
          slug: 'channel-2',
          external_link: null,
          _id: '14896539',
        },
        {
          name: 'Bar',
          slug: 'bar',
          external_link: null,
          _id: '60950317',
        },
        {
          name: 'Label',
          slug: 'label',
          external_link: null,
          _id: '59547019',
        },
        {
          name: 'Shop',
          slug: 'shop',
          external_link: 'https://aajamusic.myshopify.com/collections/all',
          _id: '70082206',
        },
        {
          name: 'About',
          slug: 'about',
          external_link: null,
          _id: '81566496',
        },
        {
          name: 'Become a patron',
          slug: 'become-a-patron',
          external_link: 'https://www.patreon.com/aajadeptford',
          _id: '15161091',
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
  methods: {
    navClose() {
      this.$store.dispatch('setNavPayload', false)
    },
  },
  computed: {
    getSocials() {
      return this.data.socials
        .filter((social) => social.link)
        .map((social) => {
          return { ...social, icon: this.socialIcons[social.slug] }
        })
    },
  },
  mounted() {},
  head() {
    return {
      bodyAttrs: {
        class: this.$store.state.navState ? 'navOpen' : '',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
aside {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 999999;
}
svg {
  width: 100%;
  fill: var(--headerColor);
}
#closeMenu {
  width: 40px;
  height: 40px;
  background: transparent;
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 2;
  border: none;
  &:hover {
    opacity: 0.7;
  }
}
nav {
  width: 100%;
  height: 100%;
  max-width: 480px;
  position: absolute;
  right: 0;
  top: 0;
  background: var(--primary);
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include breakpoint(mobile) {
    padding-left: 20px;
  }
}
ul {
  width: 100%;
  position: relative;
  z-index: 1;
}
#navMenu {
  li {
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid var(--white);
  }
  a {
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    font-family: FK Screamer Trial;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    text-transform: uppercase;
    color: var(--white);
    text-decoration: none;
    &:hover,
    &.nuxt-link-active,
    &:active,
    &:focus {
      opacity: 0.7;
    }
    @include breakpoint(mobile) {
      height: 56px;
      font-size: 24px;
    }
  }
}
#navSocials {
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
  }
}
</style>
