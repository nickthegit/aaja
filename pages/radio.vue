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
        <h3>Spotlight</h3>
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
            <div class="slider-btns-wrap">
              <div class="slider-button-prev"><slider-arrow /></div>
              <div class="slider-button-next"><slider-arrow /></div>
            </div>
          </template>
        </slider-container>
      </aaja-container>
    </article>
    <article class="radio__schedule">
      <aaja-container>
        <section class="schedule-title-bar title-bar">
          <h2>
            Schedule<span><Logo /></span>
          </h2>
        </section>
        <slider-container
          class="schedule-slider-container"
          :sliderOptions="scheduleSliderOptions"
        >
          <template v-slot:sliderButtons>
            <div class="slider-btns-wrap">
              <div class="slider-button-prev schedule-prev">
                <slider-arrow />
              </div>
              <div class="slider-button-next schedule-next">
                <slider-arrow />
              </div>
            </div>
          </template>
          <div class="swiper-slide" v-for="slide in schedule" :key="slide._id">
            <div class="schedule-slide-wrap">
              <h3>{{ slide.label }}</h3>
              <div class="schedule-table">
                <div
                  class="schedule-item"
                  v-for="item in slide.schedule"
                  :key="item._id"
                >
                  <aaja-img
                    v-if="!item.onAir"
                    class="schedule-img"
                    :altText="`Aaja resident - ${item.name}`"
                    :desktopBg="item.img.desktopBlur"
                    :mobileBg="item.img.mobileBlur"
                    :desktopImgs="item.img.desktop"
                    :mobileImgs="item.img.mobile"
                    :ratio="[1, 1]"
                    :percentageOfViewportWidth="20"
                  />
                  <aaja-img
                    v-else
                    class="schedule-img"
                    :altText="`Aaja resident - ${item.name}`"
                    :desktopBg="item.imgLive.desktopBlur"
                    :mobileBg="item.imgLive.mobileBlur"
                    :desktopImgs="item.imgLive.desktop"
                    :mobileImgs="item.imgLive.mobile"
                    :ratio="[1, 1]"
                    :percentageOfViewportWidth="20"
                  />
                  <p>
                    {{ item.time.from }} - {{ item.time.to
                    }}<span v-if="item.onAir"><live-now /></span>
                  </p>
                  <h5>{{ item.name }}</h5>
                </div>
              </div>
            </div>
          </div>
        </slider-container>
      </aaja-container>
    </article>
    <article class="featured">
      <aaja-container>
        <div class="featured-container">
          <section class="featured-title-bar title-bar">
            <h2>
              aaja community<span><Logo /></span>
            </h2>
          </section>
          <section class="featured-copy">
            <h3>Meet the family</h3>
            <p>
              Aaja is a global family of music lovers. We strive to broadcast
              diverse and unique music that excites, inspires and moves you.
              Aaja is where eclecticism is celebrated and niche music takes
              centre stage. It’s where passionate people, not algorithms, play
              exceptional music that is hard to find anywhere else.
            </p>
          </section>
          <section class="featured-artist-card-wrap">
            <slider-container
              class="featured-slider-container"
              :sliderOptions="featuredSliderOptions"
            >
              <template v-slot:sliderButtonsTop>
                <div class="slider-btns-wrap">
                  <div class="slider-button-prev featured-prev">
                    <slider-arrow />
                  </div>
                  <div class="slider-button-next featured-next">
                    <slider-arrow />
                  </div>
                </div>
              </template>
              <div
                class="swiper-slide"
                v-for="slide in featured"
                :key="slide._id"
              >
                <div class="featured-artist-card">
                  <div class="featured-artist-card-copy-warp">
                    <h5>Featured</h5>
                    <h3>{{ slide.name }}</h3>
                    <p>{{ slide.bio }}</p>
                    <nuxt-link :to="`/residents/${slide.slug}`"
                      >Listen to a show <span><arrow /></span
                    ></nuxt-link>
                  </div>
                  <aaja-img
                    class="featured-img"
                    :altText="`Aaja Resident - ${slide.name}`"
                    :desktopBg="slide.img.desktopBlur"
                    :mobileBg="slide.img.mobileBlur"
                    :desktopImgs="slide.img.desktop"
                    :mobileImgs="slide.img.mobile"
                    :ratio="[1, 1]"
                    :percentageOfViewportWidth="60"
                    :percentageOfViewportWidthMobile="100"
                  />
                </div>
              </div>
            </slider-container>
          </section>
        </div>
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { cloudinaryImgParser } from '~/utils/images'

import Logo from '~/assets/img/icons/logo.svg?inline'
import SnakeRoundel from '~/assets/img/radio-snake.svg?inline'
import sliderArrow from '~/assets/img/icons/sliderArrow.svg?inline'
import liveNow from '~/assets/img/live_now.svg?inline'
import AajaContainer from '~/components/AajaContainer.vue'
import Arrow from '~/assets/img/icons/arrow.svg?inline'
export default {
  components: {
    SnakeRoundel,
    sliderArrow,
    Logo,
    liveNow,
    AajaContainer,
    Arrow,
  },
  data() {
    return {
      spotlight: [
        {
          _id: 'gKZIIKzlZjCMbNXuRuM',
          slug: 'pencil-test',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
        {
          _id: 'vldjMj4',
          slug: 'child-mood',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
        {
          _id: 'ljDAzsNvkAl9',
          slug: 'must-white',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
        {
          _id: 'dYOjNOMKyX5W',
          slug: 'positive-physical',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
        {
          _id: 'WcDP6R',
          slug: 'experiment-wherever',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
        {
          _id: 'A9UAI',
          slug: 'they-within',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
        {
          _id: 'yoZUSGHWhiYnTcVFM56',
          slug: 'seen-describe',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
        {
          _id: 'Ea1kDEJWbnyHzYc',
          slug: 'bigger-scientist',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
        {
          _id: 'K4tyA8vS',
          slug: 'tube-needle',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
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
      schedule: [
        {
          date: '',
          label: 'today',
          _id: 'ps3rbPVb8NX',
          schedule: [
            {
              onAir: false,
              time: {
                from: '09:00',
                to: '12:00',
              },
              name: 'brief',
              _id: 'wg1jChi',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '12:00',
                to: '14:00',
              },
              name: 'coffee',
              _id: '33Szr4xCcE9dnetWNB',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '14:00',
                to: '16:00',
              },
              name: 'ready',
              _id: '9xoJCseLlCV',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: true,
              time: {
                from: '16:00',
                to: '18:00',
              },
              name: 'note',
              _id: '7MxKIlkv5BmJQN9UX4HC',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '18:00',
                to: '20:00',
              },
              name: 'our',
              _id: 'Zehix89XsJCUO',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '20:00',
                to: '22:00',
              },
              name: 'evening',
              _id: 'NCga15tod4Ciyr',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
          ],
        },
        {
          date: '',
          label: 'tomorrow',
          _id: 'LSeI4',
          schedule: [
            {
              onAir: false,
              time: {
                from: '09:00',
                to: '12:00',
              },
              name: 'visit',
              _id: 'RP035UADiP969D6GL7',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '12:00',
                to: '14:00',
              },
              name: 'answer',
              _id: '1pXr4fgjQANtxIAAj8w',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '14:00',
                to: '16:00',
              },
              name: 'outside',
              _id: 'QYfsg',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '16:00',
                to: '18:00',
              },
              name: 'silent',
              _id: '6gPcYwxFHyZvD7',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '18:00',
                to: '20:00',
              },
              name: 'fire',
              _id: 'NIUYKs9hMwd5kjDx',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '20:00',
                to: '22:00',
              },
              name: 'rubbed',
              _id: 'Fy2jmdFBF0vFBzzmu7oN',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
          ],
        },
        {
          date: '',
          label: 'wednesday',
          _id: 'CESykZuABm1oIVfAZQ',
          schedule: [
            {
              onAir: false,
              time: {
                from: '09:00',
                to: '12:00',
              },
              name: 'evidence',
              _id: 'K9qArARyI1L5Ncyop9f',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '12:00',
                to: '14:00',
              },
              name: 'wagon',
              _id: 'zFVQVe',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '14:00',
                to: '16:00',
              },
              name: 'street',
              _id: '3BMD91HNzNdclJUQqv',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '16:00',
                to: '18:00',
              },
              name: 'none',
              _id: 'eN8lmFbvymn4i',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '18:00',
                to: '20:00',
              },
              name: 'mathematics',
              _id: 'bFVK7mTQNWxQIEl',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '20:00',
                to: '22:00',
              },
              name: 'generally',
              _id: 'XtgPH02z',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
          ],
        },
        {
          date: '',
          label: 'thursday',
          _id: 'w523zpV86duvC',
          schedule: [
            {
              onAir: false,
              time: {
                from: '09:00',
                to: '12:00',
              },
              name: 'stretch',
              _id: 'jOxllHDT',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '12:00',
                to: '14:00',
              },
              name: 'hidden',
              _id: '8osOJTUobgwGs',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '14:00',
                to: '16:00',
              },
              name: 'forth',
              _id: 'Ws5wE0Q88eBx',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '16:00',
                to: '18:00',
              },
              name: 'rubbed',
              _id: 'ALmiug',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '18:00',
                to: '20:00',
              },
              name: 'fat',
              _id: 't3U7TY65KmSV',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '20:00',
                to: '22:00',
              },
              name: 'trouble',
              _id: 'GZZDuwaDW3j8gv8',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
          ],
        },
        {
          date: '',
          label: 'friday',
          _id: '09BdUw6x0Zbx',
          schedule: [
            {
              onAir: false,
              time: {
                from: '09:00',
                to: '12:00',
              },
              name: 'storm',
              _id: '3nNFDf6b0mZ',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '12:00',
                to: '14:00',
              },
              name: 'car',
              _id: '3fZnv9fqaDRmWdB',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '14:00',
                to: '16:00',
              },
              name: 'powerful',
              _id: 'KuSU3ncVIE',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '16:00',
                to: '18:00',
              },
              name: 'got',
              _id: 'gIZFx5Ih0yvUDGu4D',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '18:00',
                to: '20:00',
              },
              name: 'weight',
              _id: '2lOe3B5IPYe0D',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '20:00',
                to: '22:00',
              },
              name: 'chosen',
              _id: 'RbykRc4AAx47WCg9',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
          ],
        },
        {
          date: '',
          label: 'saturday',
          _id: 'mwI6Aw',
          schedule: [
            {
              onAir: false,
              time: {
                from: '09:00',
                to: '12:00',
              },
              name: 'rubbed',
              _id: 'm1r6CmfPpbGC6Q',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '12:00',
                to: '14:00',
              },
              name: 'come',
              _id: '4WfBLy',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '14:00',
                to: '16:00',
              },
              name: 'slabs',
              _id: 'PxU3Sczqwkmp0LH4A',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '16:00',
                to: '18:00',
              },
              name: 'dirty',
              _id: 'VXMQeDqAyb6b5GObe',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '18:00',
                to: '20:00',
              },
              name: 'floating',
              _id: 'xrUDFoF79TlAfy',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '20:00',
                to: '22:00',
              },
              name: 'camp',
              _id: 'SQgURbtVPqMJze',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
          ],
        },
        {
          date: '',
          label: 'sunday',
          _id: '4OV3U12xmcN2yyy',
          schedule: [
            {
              onAir: false,
              time: {
                from: '09:00',
                to: '12:00',
              },
              name: 'chance',
              _id: 'YrG5I95oKVuicS',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '12:00',
                to: '14:00',
              },
              name: 'why',
              _id: 'RV9yS',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '14:00',
                to: '16:00',
              },
              name: 'captured',
              _id: 'IjfqKZ7LyDHKd',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '16:00',
                to: '18:00',
              },
              name: 'shelter',
              _id: 'sVv86XN92tbqb5x',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '18:00',
                to: '20:00',
              },
              name: 'health',
              _id: 'Wt20B',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
            {
              onAir: false,
              time: {
                from: '20:00',
                to: '22:00',
              },
              name: 'box',
              _id: 'CMqgLzcleHxccHI',
              img: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                'e_grayscale'
              ),
              imgLive: cloudinaryImgParser(
                'https://res.cloudinary.com/nickjohn/image/upload/v1620559265/Aaja/the_yesness.jpg',
                '1:1',
                false,
                false
              ),
            },
          ],
        },
      ],
      scheduleSliderOptions: {
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        grabCursor: true,
        spaceBetween: 0,
        breakpoints: {
          // when window width is >= 480px
          481: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 40,
          },
        },
        // Navigation arrows
        navigation: {
          nextEl: '.schedule-next',
          prevEl: '.schedule-prev',
        },
      },
      featured: [
        {
          _id: 'Xbb2TW5yIbeLkYIDbRR',
          slug: 'house-early',
          name: 'House Early',
          bio:
            'DJ, Producer and Label boss Gaucho plays club tracks, Jungle, Breaks and unreleased bits from the Trule catalogue.',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
        {
          _id: 'BNJSOnwSGKQeN6',
          slug: 'wonderful-construction',
          name: 'Wonderful Construction',
          bio:
            'DJ, Producer and Label boss Gaucho plays club tracks, Jungle, Breaks and unreleased bits from the Trule catalogue.',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
        {
          _id: '9ePrbA',
          slug: 'burst-curve',
          name: 'Burst Curve',
          bio:
            'DJ, Producer and Label boss Gaucho plays club tracks, Jungle, Breaks and unreleased bits from the Trule catalogue.',
          img: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620809594/Aaja/spotlight_placeholder.jpg',
            '1:1'
          ),
        },
      ],
      featuredSliderOptions: {
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        grabCursor: true,
        spaceBetween: 0,
        breakpoints: {},
        // Navigation arrows
        navigation: {
          nextEl: '.featured-next',
          prevEl: '.featured-prev',
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
.schedule-slider-container {
  .slider-btns-wrap {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    padding: 0;
  }
}
.radio__schedule {
  background: var(--white);
  color: var(--black);
  padding: var(--globalPadding) 0;
}
.title-bar {
  margin-bottom: 20px;
  span {
    height: var(--h2Size);
    display: inline-block;
    vertical-align: middle;
    svg {
      height: 100%;
      margin-left: 10px;
      fill: var(--white);
    }
  }
}
.schedule-title-bar {
  span {
    svg {
      fill: var(--black);
    }
  }
}
.schedule-slide-wrap {
  h3 {
    -webkit-text-stroke: 1px var(--black);
    color: transparent;
    text-transform: uppercase;
    border-bottom: var(--borderAtts);
    box-sizing: border-box;
    border-color: var(--black);
    padding-bottom: 20px;
  }
}
.schedule-item {
  width: 100%;
  margin-top: 20px;
  padding-bottom: 10px;
  display: grid;
  grid-template: auto 1fr / 80px 1fr;
  align-items: start;
  column-gap: 15px;
  row-gap: 5px;
  border-bottom: var(--borderAtts);
  box-sizing: border-box;
  border-color: var(--black);
  .schedule-img {
    width: 100%;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
  p {
    width: 100%;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    font-size: 16px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      display: block;
      width: 60px;
      svg {
        width: 100%;
      }
    }
  }
  h5 {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    text-transform: uppercase;
  }
}
.featured {
  padding: var(--globalPadding) 0;
  .slider-btns-wrap {
    path,
    circle {
      stroke: var(--white);
    }
  }
}
.featured-container {
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template: auto 1fr / 1fr 57.5%;
  gap: var(--globalPadding);
  row-gap: 0;
  @include breakpoint(mobile) {
    grid-template: auto auto auto / 100%;
  }
}

.featured-title-bar {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  @include breakpoint(mobile) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
}

.featured-copy {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  align-self: end;
  h3 {
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  @include breakpoint(mobile) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
}

.featured-artist-card-wrap {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  @include breakpoint(mobile) {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
  }
}

.featured-artist-card {
  background: var(--white);
  color: var(--black);
  padding: 20px;
  display: grid;
  grid-template: auto / 40% 1fr;
  gap: 20px;
  @include breakpoint(mobile) {
    grid-template: auto auto / 100%;
  }
  .featured-img {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  .featured-artist-card-copy-warp {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    position: relative;
    @include breakpoint(mobile) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
  }
  h5 {
    text-transform: uppercase;
    padding: 5px 0;
  }
  h3 {
    margin-bottom: 20px;
  }
  a {
    color: var(--black);
    position: absolute;
    bottom: 0;
    font-weight: 600;
    &:hover {
      opacity: 0.7;
    }
    span {
      margin-left: 20px;
      display: inline-block;
      width: 18px;
      vertical-align: middle;
      transform: rotate(180deg);
      svg {
        width: 100%;
        path,
        g {
          fill: var(--black);
        }
      }
    }
  }
}
</style>
