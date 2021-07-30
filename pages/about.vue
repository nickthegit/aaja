<template>
  <main class="light-theme">
    <aaja-standard-hero>
      <template v-slot:heading>
        <aaja-heading>aaja music</aaja-heading>
      </template>
      <h3>
        {{ contactData.about.title }}
      </h3>
      <SanityContent :blocks="contactData.about.intro" />
      <p>No playlists, no ads, just the people.</p>
    </aaja-standard-hero>
    <article>
      <aaja-container class="about__content">
        <section class="contact-info">
          <h4>Get in touch</h4>
          <a :href="`mailto:${contactData.contact.email}`">{{ contactData.contact.email }}</a>
          <a :href="`tel:${contactData.contact.telephome}`">{{ contactData.contact.telephome }}</a>
          <address>
            <SanityContent :blocks="contactData.contact.address" />
          </address>
          <br />
          <p>
            <strong>Show applications</strong> <br />
            <a :href="`mailto:snakey@aajamusic.com`">snakey@aajamusic.com</a>
          </p>
        </section>
        <aaja-img
          class="about-img"
          altText="Aaja DJ booth"
          :desktopBg="contactImg.desktopBlur"
          :mobileBg="contactImg.mobileBlur"
          :desktopImgs="contactImg.desktop"
          :mobileImgs="contactImg.mobile"
          :ratio="[3, 2]"
          :percentageOfViewportWidth="70"
        />
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { cloudinaryImgParser } from '~/utils/images'
import AajaStandardHero from '~/components/AajaStandardHero.vue'
export default {
  components: { AajaStandardHero },
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(`{
  "about":*[_type == "contactPage"][0],
	"contact": *[_type == "siteSettings"][0] 
}`)

    return { contactData: data }
  },
  data() {
    return {
      aboutImg: cloudinaryImgParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620553010/Aaja/dj_station.jpg',
        '3:2'
      ),
    }
  },
  computed: {
    contactImg() {
      return this.$urlForSquare(this.contactData.about.feature_image, false, false)
    },
  },
  mounted() {
    // console.log(this.contactData)
  },
  head: {
    htmlAttrs: {
      class: 'light',
    },
  },
}
</script>

<style lang="scss" scoped>
.about__content {
  width: 100%;
  display: grid;
  grid-template: auto / 30% 1fr;
  gap: 20px;
}
h3 {
  margin-bottom: 30px;
}
.contact-info {
  grid-column: 1 / 2;
  padding: calc(var(--globalPadding) / 2) 0;
  @include breakpoint(mobile) {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }
  p,
  a,
  h4 {
    display: block;
    margin-bottom: 30px;
  }
  a {
    display: block;
    text-decoration: none;
    color: var(--primary);
    &:hover {
      opacity: 0.7;
    }
  }
  a,
  address {
    font-size: 20px;
  }
}
.about-img {
  grid-column: 2 / 3;
  @include breakpoint(mobile) {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }
}
</style>
