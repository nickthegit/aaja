<template>
  <footer>
    <aaja-container class="footer__container">
      <section class="footer__logo">
        <logo />
      </section>
      <section class="footer__navigate">
        <p><strong>Navigate</strong></p>
        <nav>
          <ul class="footer__navigate-menu footer-list">
            <li v-for="link in links" :key="link._id" @click="navClose">
              <a
                v-if="link.external_link"
                :href="link.external_link"
                target="_blank"
                rel="noopener noreferrer"
                >{{ link.name }}</a
              >
              <nuxt-link v-else :to="`/${link.slug}`">{{
                link.name
              }}</nuxt-link>
            </li>
          </ul>
        </nav>
      </section>
      <section class="footer__follow">
        <p><strong>Follow</strong></p>
        <ul class="footer__follow-menu footer-list">
          <li v-for="social in socials" :key="social._id" @click="navClose">
            <a :href="social.link" target="_blank" rel="noopener noreferrer">{{
              social.name
            }}</a>
          </li>
        </ul>
      </section>
      <section class="footer__contact">
        <p><strong>Get in touch</strong></p>
        <a href="mailto:info@aajamusic.com">info@aajamusic.com</a>
      </section>
    </aaja-container>
  </footer>
</template>

<script>
import Logo from '~/assets/img/icons/logo.svg?inline'
import AajaContainer from './AajaContainer.vue'
export default {
  components: { Logo, AajaContainer },
  data() {
    return {
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
          external_link: 'https://www.aajamusic.com/shop',
          _id: '70082206',
        },
        {
          name: 'About',
          slug: 'about',
          external_link: null,
          _id: '81566496',
        },
        // {
        //   name: 'Become a patron',
        //   slug: 'become-a-patron',
        //   external_link: 'https://www.patreon.com/',
        //   _id: '15161091',
        // },
      ],
      socials: [
        {
          name: 'Instagram',
          link: 'https://www.instagram.com/',
          _id: '9woz6mv0KH',
        },
        {
          name: 'Twitter',
          link: 'https://www.twitter.com/',
          _id: 'C1K3VoByqeUme4L',
        },
        {
          name: 'Facebook',
          link: 'https://www.facebook.com/',
          _id: 'gMCgELgBYO6vI1d1',
        },
        {
          name: 'Mixcloud',
          link: 'https://www.mixcloud.com/',
          _id: '7QY5WycuOSTATwfvdE',
        },
        {
          name: 'Soundcloud',
          link: 'https://www.soundcloud.com/',
          _id: 'cp52vCk7JPBnfIM3dMb',
        },
      ],
    }
  },
  methods: {
    navClose() {
      this.$store.dispatch('setNavPayload', false)
    },
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
