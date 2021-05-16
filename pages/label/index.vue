<template>
  <main class="light-theme">
    <aaja-standard-hero>
      <template v-slot:heading>
        <aaja-heading>aaja music <br />record Label</aaja-heading>
      </template>
      <p>
        Aaja Radio is an independent radio station broadcasting from Deptford
        market yard, London. Tune in for daily shows from the misfits, dancers,
        collectors and selectors that make up our community. Tune in with open
        ears.
      </p>
    </aaja-standard-hero>
    <article>
      <aaja-container class="record__content">
        <nuxt-link
          class="record__card"
          v-for="record in records"
          :key="record._id"
          :to="`label/${record.slug}`"
        >
          <aaja-img
            :altText="`Aaja Record - ${record.title}`"
            :desktopBg="record.image.desktopBlur"
            :mobileBg="record.image.mobileBlur"
            :desktopImgs="record.image.desktop"
            :mobileImgs="record.image.mobile"
            :ratio="[1, 1]"
            :percentageOfViewportWidth="33"
          />
          <h4>{{ record.title }}</h4>
        </nuxt-link>
      </aaja-container>
    </article>
  </main>
</template>

<script>
import { cloudinaryImgParser } from '~/utils/images'
export default {
  data() {
    return {
      records: [
        {
          title: 'Aaja 001',
          slug: 'aaja-001',
          image: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620554655/Aaja/label_placeholder.png',
            '1:1'
          ),
          _id: '5593545546',
        },
        {
          title: 'Aaja 002',
          slug: 'aaja-002',
          image: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620554655/Aaja/label_placeholder.png',
            '1:1'
          ),
          _id: '5177985175',
        },
        {
          title: 'Aaja 003',
          slug: 'aaja-003',
          image: cloudinaryImgParser(
            'https://res.cloudinary.com/nickjohn/image/upload/v1620554655/Aaja/label_placeholder.png',
            '1:1'
          ),
          _id: '3436337500',
        },
      ],
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
.record__content {
  width: 100%;
  display: grid;
  grid-template: auto / 1fr 1fr 1fr;
  gap: calc(var(--globalPadding) / 2);
  @include breakpoint(mobile) {
    grid-template: auto / 100%;
  }
}
.record__card {
  width: 100%;
  display: block;
  text-decoration: none;
  color: var(--primary);
  &:hover {
    opacity: 0.7;
  }
  h3 {
    padding: 20px;
  }
}
</style>
