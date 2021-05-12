<template>
  <main>
    <section class="radio__hero">
      <aaja-container class="radio__hero-container">
        <div class="radio__heading">
          <aaja-heading>Aaja Radio<br />on air</aaja-heading>
          <p>Listen live or dig into our music archive of radio and mixes</p>
        </div>
        <snake-roundel id="snake_roundel" />
      </aaja-container>
    </section>
    <article class="radio__spotlight">
      <aaja-container>
        <h2>Spotlight</h2>
        <p>Updated weekly, dip into our recommended sounds</p>
        <slider-container
          class="spotlight-slider-container"
          :sliderOptions="spotlightSliderOptions"
        >
          <div class="swiper-slide" v-for="slide in spotlight" :key="slide._id">
            <div class="spotlight-slide-wrap">
              <aaja-img
                :altText="`Aaja Resident - ${slide.slug}`"
                :desktopBg="slide.img.desktopBlur"
                :mobileBg="slide.img.mobileBlur"
                :desktopImgs="slide.img.desktop"
                :mobileImgs="slide.img.mobile"
                :ratio="[1, 1]"
                :percentageOfViewportWidth="15"
                :percentageOfViewportWidthMobile="49"
              />
            </div>
          </div>
          <template v-slot:sliderButtons>
            <!-- If we need navigation buttons -->
            <div class="slider-btns-wrap">
              <div class="slider-button-prev"><slider-arrow /></div>
              <div class="slider-button-next"><slider-arrow /></div>
            </div>
          </template>
        </slider-container>
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { cloudinaryImgParser } from '~/utils/images'

import SnakeRoundel from '~/assets/img/radio-snake.svg?inline'
import sliderArrow from '~/assets/img/icons/sliderArrow.svg?inline'
export default {
  components: {
    SnakeRoundel,
    sliderArrow,
  },
  data() {
    return {
      spotlight: [
        {
          _id: 'gKZIIKzlZjCMbNXuRuM',
          slug: 'pencil-test',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/WhatsApp_Image_2021-01-21_at_18.57.jpg',
            '1:1'
          ),
        },
        {
          _id: 'vldjMj4',
          slug: 'child-mood',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/WhatsApp_Image_2021-01-21_at_18.57.jpg',
            '1:1'
          ),
        },
        {
          _id: 'ljDAzsNvkAl9',
          slug: 'must-white',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/WhatsApp_Image_2021-01-21_at_18.57.jpg',
            '1:1'
          ),
        },
        {
          _id: 'dYOjNOMKyX5W',
          slug: 'positive-physical',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/WhatsApp_Image_2021-01-21_at_18.57.jpg',
            '1:1'
          ),
        },
        {
          _id: 'WcDP6R',
          slug: 'experiment-wherever',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/WhatsApp_Image_2021-01-21_at_18.57.jpg',
            '1:1'
          ),
        },
        {
          _id: 'A9UAI',
          slug: 'they-within',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/WhatsApp_Image_2021-01-21_at_18.57.jpg',
            '1:1'
          ),
        },
        {
          _id: 'yoZUSGHWhiYnTcVFM56',
          slug: 'seen-describe',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/WhatsApp_Image_2021-01-21_at_18.57.jpg',
            '1:1'
          ),
        },
        {
          _id: 'Ea1kDEJWbnyHzYc',
          slug: 'bigger-scientist',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/WhatsApp_Image_2021-01-21_at_18.57.jpg',
            '1:1'
          ),
        },
        {
          _id: 'K4tyA8vS',
          slug: 'tube-needle',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/WhatsApp_Image_2021-01-21_at_18.57.jpg',
            '1:1'
          ),
        },
      ],
      spotlightSliderOptions: {
        loop: false,
        slidesPerView: 2,
        slidesPerGroup: 2,
        grabCursor: true,
        spaceBetween: 20,
        breakpoints: {
          // when window width is >= 480px
          481: {
            slidesPerView: 6,
            slidesPerGroup: 6,
            spaceBetween: 30,
          },
        },
        // Navigation arrows
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.radio__hero {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  // background: salmon;
}
.radio__hero-container {
  height: 100%;
  display: grid;
  grid-template: auto / 53% 1fr;
  gap: 40px;
  align-items: center;
  justify-items: start;
  padding-top: var(--headerHeight) !important;
  @include breakpoint(mobile) {
    grid-template: auto / 45% 1fr;
  }
  svg {
    width: 100%;
  }
  p {
    width: 100%;
    max-width: 500px;
    font-size: 20px;
    line-height: 24px;
    text-transform: uppercase;
    @include breakpoint(mobile) {
      width: 60%;
    }
  }
}
.radio__heading {
  @include breakpoint(mobile) {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }
}
#snake_roundel {
  @include breakpoint(mobile) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    align-self: end;
    padding-bottom: var(--globalPadding);
    width: 200%;
  }
}
.radio__spotlight {
  background: var(--light);
  color: var(--black);
  padding: var(--globalPadding) 0;
  h2 {
    margin-bottom: 20px;
  }
}
.spotlight-slide-wrap {
  width: 100%;
  img {
    width: 100%;
  }
}
.slider-btns-wrap {
  position: relative;
  padding: 20px 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  div {
    display: block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &.swiper-button-disabled {
      opacity: 0.3;
    }
    svg {
      width: 100%;
    }
  }
  .slider-button-prev {
    transform: rotate(180deg);
    margin-right: 20px;
  }
}
</style>
