<template>
  <ul id="socials">
    <li>
      <a
        href="http://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        :class="['social-icon', facebook.slug]"
        :style="{background: `#${facebook.hex}`}"
        v-html="facebook.svg"
      />
    </li>
    <li>
      <a
        href="http://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        :class="['social-icon', twitter.slug]"
        :style="{background: `#${twitter.hex}`}"
        v-html="twitter.svg"
      />
    </li>
    <li>
      <a
        href="http://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        :class="['social-icon', instagram.slug]"
        :style="{background: `#${instagram.hex}`}"
        v-html="instagram.svg"
      />
    </li>
    <li>
      <a
        href="http://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        :class="['social-icon', linkedin.slug]"
        :style="{background: `#${linkedin.hex}`}"
        v-html="linkedin.svg"
      />
    </li>
    <li>
      <a
        href="http://spotify.com"
        target="_blank"
        rel="noopener noreferrer"
        :class="['social-icon', spotify.slug]"
        :style="{background: `#${spotify.hex}`}"
        v-html="spotify.svg"
      />
    </li>
    <li>
      <a
        href="http://vimeo.com"
        target="_blank"
        rel="noopener noreferrer"
        :class="['social-icon', vimeo.slug]"
        :style="{background: `#${vimeo.hex}`}"
        v-html="vimeo.svg"
      />
    </li>
    <li>
      <a
        href="http://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        :class="['social-icon', youtube.slug]"
        :style="{background: `#${youtube.hex}`}"
        v-html="youtube.svg"
      />
    </li>
  </ul>
</template>

<script>
  const facebook = require('simple-icons/icons/facebook')
  const twitter = require('simple-icons/icons/twitter')
  const instagram = require('simple-icons/icons/instagram')
  const linkedin = require('simple-icons/icons/linkedin')
  const spotify = require('simple-icons/icons/spotify')
  const vimeo = require('simple-icons/icons/vimeo')
  const youtube = require('simple-icons/icons/youtube')

  // console.log(spotify, linkedin, instagram, twitter, facebook, youtube, vimeo)
  export default {
    data: () => {
      return {
        facebook,
        twitter,
        instagram,
        linkedin,
        spotify,
        vimeo,
        youtube,
      }
    },
    mounted() {
      // console.log(this.spotify.svg)
    },
  }
</script>

<style lang="scss">
  #socials {
    li {
      display: inline-block;
    }
    a {
      display: block;
      width: 40px;
      height: 40px;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
    }
  }
</style>