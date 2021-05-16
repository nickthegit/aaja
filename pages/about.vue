<template>
  <main class="light-theme">
    <aaja-standard-hero>
      <template v-slot:heading>
        <aaja-heading>aaja music</aaja-heading>
      </template>
      <h3>
        Lorem ipsum dolor sit amet consectetuer adipiscing elit sed diam nonummy
      </h3>
      <p>
        Aaja Radio is an independent radio station broadcasting from Deptford
        market yard, London. Tune in for daily shows from the misfits, dancers,
        collectors and selectors that make up our community. Tune in with open
        ears.
      </p>
      <p>No playlists, no ads, just the people.</p>
    </aaja-standard-hero>
    <article>
      <aaja-container class="about__content">
        <section class="contact-info">
          <h4>Get in touch</h4>
          <a href="mailto:info@aajamusic.com">info@aajamusic.com</a>
          <a href="tel:07862 813771">07862 813771</a>
          <address>
            Arch 2, <br />4 Deptford Market Yard, <br />Deptford <br />SE8 4BX
          </address>
        </section>
        <aaja-img
          class="about-img"
          altText="Aaja DJ booth"
          :desktopBg="aboutImg.desktopBlur"
          :mobileBg="aboutImg.mobileBlur"
          :desktopImgs="aboutImg.desktop"
          :mobileImgs="aboutImg.mobile"
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
  data() {
    return {
      aboutImg: cloudinaryImgParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620553010/Aaja/dj_station.jpg',
        '3:2'
      ),
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
.about__content {
  width: 100%;
  display: grid;
  grid-template: auto / 30% 1fr;
  gap: 20px;
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
  h3 {
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
