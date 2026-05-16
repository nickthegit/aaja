<template>
  <section class="slug__hero">
    <aaja-container class="breadcrumb-container">
      <nuxt-link :to="`/${breadcrumbDestination}`" class="breadcrumb"
        ><span><arrow /></span>Back to {{ breadcrumbDestination }}</nuxt-link
      >
    </aaja-container>
    <aaja-container class="slug__hero-container">
      <div class="heading__wrap">
        <h2 class="top-subheading">
          <slot name="subheading">Subheading</slot>
        </h2>
        <aaja-heading><slot name="heading">heading</slot></aaja-heading>
        <div class="subtext">
          <slot></slot>
        </div>
      </div>
      <aaja-img
        altText="`Aaja hero`"
        :desktopBg="heroImage.desktopBlur"
        :mobileBg="heroImage.mobileBlur"
        :desktopImgs="heroImage.desktop"
        :mobileImgs="heroImage.mobile"
        :ratio="[1, 1]"
        :percentageOfViewportWidth="33"
      />
    </aaja-container>
  </section>
</template>

<script>
import { cloudinaryImgParser } from '~/utils/images'
import Arrow from '~/assets/img/icons/arrow.svg?inline'

export default {
  components: { Arrow },
  props: {
    breadcrumbDestination: {
      type: String,
      default: 'radio', // label
    },
    heroImage: {
      type: Object,
      default: () => {
        return cloudinaryImgParser(
          'https://res.cloudinary.com/nickjohn/image/upload/v1620554655/Aaja/label_placeholder.png',
          '1:1'
        )
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.slug__hero {
  width: 100%;
  height: auto;
  min-height: 50vh;
  padding: calc(var(--headerHeight) + var(--subHeaderHeight)) 0 var(--headerHeight) 0;
  position: relative;
  @include breakpoint(mobile) {
    padding: calc(var(--headerHeight) * 1.5 + var(--subHeaderHeight)) 0 var(--headerHeight) 0;
  }
}
.breadcrumb {
  margin-bottom: 30px;
  display: inline-block;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 500;
  color: var(--mainColor);
  &:hover {
    opacity: 0.7;
  }
  span {
    display: inline-block;
    width: 17px;
    vertical-align: middle;
    margin-right: 15px;
    svg {
      width: 100%;
      path {
        fill: var(--mainColor);
      }
    }
  }
}
.slug__hero-container {
  position: relative;
  display: grid;
  grid-template: auto / 1fr 33%;
  gap: 8vw;
  grid-gap: 8vw;
  @include breakpoint(mobile) {
    grid-template: auto / 100%;
  }
}
.heading__wrap {
  padding-top: var(--globalPadding);
}
.top-subheading {
  margin-bottom: 10px;
}
.subtext {
  width: 100%;
  max-width: 680px;
  margin-top: 20px;
}
</style>
