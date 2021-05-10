<template>
  <main class="light-theme">
    <aaja-standard-hero>
      <template v-slot:heading>
        <aaja-heading>aaja music <br />Channel 2</aaja-heading>
      </template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </aaja-standard-hero>
    <article>
      <aaja-container class="channel2__content">
        <div class="iframe-wrap">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Rm82-k2ox3Y?controls=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </aaja-container>
    </article>
  </main>
</template>

<script>
export default {
  data() {
    return {}
  },
  head: {
    htmlAttrs: {
      class: 'light',
    },
  },
}
</script>

<style lang="scss" scoped>
.channel2__ {
  &content {
    .iframe-wrap {
      width: 100%;
      height: 0;
      position: relative;
      padding-bottom: 56.25%;
      background-color: var(--dark);
      background-image: url('https://res.cloudinary.com/nickjohn/image/upload/f_auto,w_500/v1620549353/Aaja/aaja_black_logo.png');
      background-size: 40%;
    }
    iframe {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
