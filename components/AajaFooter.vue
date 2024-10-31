<template>
  <footer>
    <p v-if="$fetchState.pending">Fetching footer...</p>
    <p v-else-if="$fetchState.error">An error occurred getting footer data</p>

    <aaja-container v-else class="footer__container">
      <section class="footer__logo">
        <logo />
      </section>
      <section class="footer__navigate">
        <p><strong>Navigate</strong></p>
        <nav>
          <ul class="footer__navigate-menu footer-list">
            <li v-for="link in links" :key="link._id" @click="navClose">
              <a v-if="link.external_link" :href="link.external_link" target="_blank" rel="noopener noreferrer">{{
      link.name }}</a>
              <nuxt-link v-else :to="`/${link.slug}`">{{ link.name }}</nuxt-link>
            </li>
          </ul>
        </nav>
      </section>
      <section class="footer__follow">
        <p><strong>Follow</strong></p>
        <ul class="footer__follow-menu footer-list">
          <li v-for="social in data[0].socials" :key="social._id" @click="navClose">
            <a :href="social.link" target="_blank" rel="noopener noreferrer">{{ social.name }}</a>
          </li>
        </ul>
      </section>
      <section class="footer__contact">
        <p><strong>Get in touch</strong></p>
        <a :href="`mailto:${data[0].email}`">{{ data[0].email }}</a>
        <img class="footer__contact__image" src="~/assets/img/arts_council.png"/>
      </section>
    </aaja-container>
  </footer>
</template>

<script>
import Logo from '~/assets/img/icons/logo.svg?inline'
import AajaContainer from './AajaContainer.vue'

import { footerQuery } from '~/utils/queries.js'

export default {
  components: { Logo, AajaContainer },
  async fetch() {
    this.data = await this.$sanity.fetch(footerQuery)
  },
  data() {
    return {
      data: '',
      links: [
        {
          name: 'Radio',
          slug: 'radio',
          external_link: null,
          _id: '89035162262743512',
        },
        // {
        //   name: 'Channel 2',
        //   slug: 'channel-2',
        //   external_link: null,
        //   _id: '85447217114896539',
        // },
        {
          name: 'Bar',
          slug: 'bar',
          external_link: null,
          _id: '2643279460950317',
        },
        {
          name: 'Label',
          slug: 'label',
          external_link: null,
          _id: '77126813159547019',
        },
        {
          name: 'Festival',
          slug: 'festival',
          external_link: null,
          _id: '1489651315',
        },
        {
          name: 'Studio',
          slug: 'studio',
          external_link: null,
          _id: '148965131',
        },
        {
          name: 'Live Events',
          slug: 'live-events',
          external_link: null,
          _id: '59547020',
        },
        // {
        //   name: 'Shop',
        //   slug: 'shop',
        //   external_link: 'https://aajamusic.myshopify.com/collections/all',
        //   _id: '20695671470082206',
        // },
        {
          name: 'About',
          slug: 'about',
          external_link: null,
          _id: '72731429781566496',
        },
        // {
        //   name: 'Become a patron',
        //   slug: 'become-a-patron',
        //   external_link: 'https://www.patreon.com/',
        //   _id: '17177059915161091',
        // },
      ],
    }
  },
  methods: {
    navClose() {
      this.$store.dispatch('setNavPayload', false)
    },
  },
  created() {
    // this.fetch()
  },
  mounted() {
    // console.log('FOOTER QUERY: ', this.data[0])
  },
}
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  padding: var(--globalPadding) 0;
  background: var(--dark);
  color: var(--white);
}

.footer__container {
  width: 100%;
  height: auto;
  display: grid;
  grid-template: auto / 10% 30% 30% 30%;

  @include breakpoint(tablet) {
    grid-template: auto / 50% 50%;
  }

  @include breakpoint(mobile) {
    grid-template: auto / 100%;
  }
}

section {
  width: 100%;
  padding-right: 15%;

  @include breakpoint(tablet-mobile) {
    margin-bottom: 40px;
  }
}

.footer__logo {
  svg {
    width: 60%;

    @include breakpoint(tablet-mobile) {
      width: 20%;
    }
  }
}

.footer-list {
  width: 100%;
  display: grid;
  grid-template: auto auto / 1fr 1fr 1fr;
}

p {
  margin-bottom: 15px;

  strong {
    font-weight: 600;
  }
}

a {
  color: var(--white);
  text-decoration: none;
  display: block;
  margin-bottom: 15px;
  padding-right: 5px;

  &:hover {
    opacity: 0.7;
  }
}

svg {
  width: 100%;
  fill: var(--white);
}
</style>
