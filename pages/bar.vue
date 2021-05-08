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
        <aaja-img
          class="bar__content-img-1"
          altText="Aaja Bar"
          :desktopBg="img1.desktopBlur"
          :mobileBg="img1.mobileBlur"
          :desktopImgs="img1.desktop"
          :mobileImgs="img1.mobile"
          :ratio="[31, 15]"
          :ratioMobile="[111, 80]"
        />
        <aaja-img
          class="bar__content-img-2"
          altText="Aaja Bar"
          :desktopBg="img2.desktopBlur"
          :mobileBg="img2.mobileBlur"
          :desktopImgs="img2.desktop"
          :mobileImgs="img2.mobile"
          :ratio="[4, 3]"
          :ratioMobile="[111, 80]"
          :percentageOfViewportWidth="50"
        />
        <aaja-img
          class="bar__content-img-3"
          altText="Aaja Bar"
          :desktopBg="img3.desktopBlur"
          :mobileBg="img3.mobileBlur"
          :desktopImgs="img3.desktop"
          :mobileImgs="img3.mobile"
          :ratio="[4, 3]"
          :ratioMobile="[111, 80]"
          :percentageOfViewportWidth="50"
        />
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { cloudinaryHeroParser, cloudinaryImgParser } from '~/utils/images'

import AajaContainer from '~/components/AajaContainer.vue'
import AajaHeroImg from '~/components/AajaHeroImg.vue'
import Logo from '~/assets/img/icons/logo.svg?inline'
import AajaImg from '~/components/AajaImg.vue'

export default {
  components: { AajaContainer, AajaHeroImg, Logo, AajaImg },
  data() {
    return {
      heroImage: cloudinaryHeroParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620508041/Aaja/Hero_1.png'
      ),
      introText:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      img1: cloudinaryImgParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620501076/Aaja/bar_view1.jpg',
        '31:15',
        '111:80'
      ),
      img2: cloudinaryImgParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620501056/Aaja/bar_view2.jpg',
        '4:3',
        '111:80'
      ),
      img3: cloudinaryImgParser(
        'https://res.cloudinary.com/nickjohn/image/upload/v1620501038/Aaja/on_air.jpg',
        '4:3',
        '111:80'
      ),
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
    display: grid;
    grid-template: auto auto auto / 50% 50%;
    justify-items: center;
    padding-top: var(--globalPadding);
    padding-bottom: var(--globalPadding);
    &-intro {
      width: 100%;
      max-width: 800px;
      text-align: center;
      grid-row: 1 / 2;
      grid-column: 1 / 3;
      padding-bottom: var(--globalPadding);
    }
    img {
      width: 100%;
    }
    picture {
      width: 100%;
      position: relative;
      box-sizing: border-box;
    }
    &-img-1 {
      grid-row: 2 / 3;
      grid-column: 1 / 3;
      margin-bottom: calc(var(--globalPadding) / 2);
    }
    &-img-2,
    &-img-3 {
      grid-row: 3 / 4;
      width: calc(100% - 20px);
      @include breakpoint(mobile) {
        width: 100%;
        margin-bottom: calc(var(--globalPadding) / 2);
      }
    }
    &-img-2 {
      grid-column: 1 / 2;
      margin-right: 20px;
      @include breakpoint(mobile) {
        margin-right: 0;
        grid-column: 1 / 3;
      }
    }
    &-img-3 {
      grid-column: 2 / 3;
      margin-left: 20px;
      @include breakpoint(mobile) {
        margin-left: 0;
        grid-column: 1 / 3;
        grid-row: 4 / 5;
      }
    }
  }
}
</style>
