<template>
  <main class="light-theme">
    <aaja-standard-hero>
      <template v-slot:heading>
        <aaja-heading>aaja music <br />record Label</aaja-heading>
      </template>
      <p>{{ labelData.intro }}</p>
    </aaja-standard-hero>
    <article>
      <aaja-container class="record__content">
        <nuxt-link
          class="record__card"
          v-for="record in eps_records"
          :key="record._id"
          :to="`label/${record.slug.current}`"
        >
          <aaja-img
            :altText="`Aaja Record - ${record.title}`"
            :desktopBg="record.img.desktopBlur"
            :mobileBg="record.img.mobileBlur"
            :desktopImgs="record.img.desktop"
            :mobileImgs="record.img.mobile"
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

import { labelPageQuery } from '~/utils/queries.js'
export default {
  async asyncData({ $sanity }) {
    const data = await $sanity.fetch(labelPageQuery)

    return { labelData: data[0] }
  },
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
  computed: {
    eps_records() {
      return this.labelData.eps.map((record) => {
        let img = this.$urlForSquare(record.feature_image, false, true)
        return { ...record, img }
      })
    },
  },
  mounted() {
    // console.log(this.labelData)
    // console.log(this.eps_records)
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
