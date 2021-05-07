<template>
  <main>
    <section class="bar__hero">
      <section class="bar__hero-img">
        <aaja-hero-img
          altText="Aaja Bar Hero image"
          :landscapeBg="heroImage.landscapeBlur"
          :portraitBg="heroImage.portraitBlur"
          :landscapeImgs="heroImage.landscape"
          :portraitImgs="heroImage.portrait"
        />
      </section>
      <aaja-container class="bar__hero-container">
        <div class="bar__hero-heading">
          <h1>
            Aaja Bar<span><Logo /></span>
          </h1>
        </div>
        <section class="bar__hero-opening">
          <p>Opening Hours</p>
          <p><strong>Wednesday to Saturday - 10:00 - 23:00 </strong></p>
          <p><strong>Sunday to Tuesday - 10:00 - 22:00</strong></p>
          <div class="button-wrap">
            <a href="#" target="_blank" rel="noopener noreferrer"
              >Book a table</a
            >
            <a href="#" target="_blank" rel="noopener noreferrer">View menu</a>
          </div>
        </section>
      </aaja-container>
    </section>
    <article>
      <aaja-container class="bar__content">
        <section class="bar__content-intro">
          <p>{{ introText }}</p>
        </section>
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { cloudinaryHeroParser } from '~/utils/images'

import AajaContainer from '~/components/AajaContainer.vue'
import AajaHeroImg from '~/components/AajaHeroImg.vue'
import Logo from '~/assets/img/icons/logo.svg?inline'

export default {
  components: { AajaContainer, AajaHeroImg, Logo },
  data() {
    return {
      heroImage: cloudinaryHeroParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620372740/Aaja/bar_hero.jpg'
      ),
      introText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    }
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.bar__ {
  &hero {
    &-img {
      width: 100%;
      height: 100vh;
      position: relative;
      z-index: 1;
    }
    &-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 40px;
      padding-bottom: 40px;
    }
    &-heading {
      flex-grow: 1;
      width: 100%;
      display: flex;
      align-items: center;
      h1 {
        display: flex;
        align-items: center;
        width: 100%;
      }
      span {
        display: inline-block;
        width: 5vw;
        margin-left: 1%;
        svg {
          width: 100%;
          fill: var(--white);
        }
      }
    }
    &-opening {
      p {
        text-transform: uppercase;
        margin-bottom: 20px;
      }
      strong {
        font-weight: 600;
        font-size: 20px;
        @include breakpoint(mobile) {
          font-size: 16px;
        }
      }
      .button-wrap {
        display: flex;
        gap: 20px;
        margin-top: 30px;
      }
      a {
        width: 140px;
        height: 40px;
        display: flex;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        background: var(--white);
        color: var(--dark);
        text-decoration: none;
        cursor: pointer;
        &:hover {
          opacity: 0.75;
          text-decoration: underline;
        }
      }
    }
  }
  &content {
    background: salmon;
    padding-top: var(--globalPadding);
    padding-bottom: var(--globalPadding);
    display: grid;
    grid-template: auto auto auto / 50% 50%;
    justify-items: center;
    &-intro {
      width: 100%;
      max-width: 800px;
      text-align: center;
      grid-row: 1 / 2;
      grid-column: 1 / 3;
    }
  }
}
</style>
