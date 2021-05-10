<template>
  <main>
    <aaja-slug-hero breadcrumbDestination="label">
      <template v-slot:subheading>Aaja 003</template>
      <template v-slot:heading>Everson - grass is greener</template>
    </aaja-slug-hero>
    <article>
      <aaja-container class="record-item__content">
        <section class="record-item__copy">
          <p>
            AAJA003 we're pleased to gather 4 friends and artists in their own
            right for a diverse, inaugural 4-track Various Artists EP.
          </p>

          <p>
            Commencing proceedings on the A1, 'Abzent Mindz' by In:State & Guili
            lets rip. Following their recent 12" on Not An Animal, this
            ever-giving cross-European collaboration churns out something that
            is both functional and emotional.
          </p>

          <p>
            For A2, whilst this might be the start of his production journey,
            Ady Toledano is a permanent fixture on Berlin's queer club scene and
            we're excited to share his latest production. Regularly spinning at
            Cocktail D'Amore, Buttons at About:Blank & Riot,Toledano delivers
            'Rare Earth'. A deep, ceremonial journey best suited for those late
            night, deep in the rave moments and let's be honest, mornings.
          </p>

          <p>
            Flipping the 12" over for B1.The third track of the EP is produced
            by Everson. One of the co-founders of Aaja teases sample-work in an
            out of a grinding, tool style track bridging busy, UK influenced
            percussion and influence with slower, sledging techno.
          </p>

          ​

          <p>
            Finally, Alex Richards finishes off the VA with 'Platform' on the
            B2. His words about the track... 'messing about making noises'.
            Richards lends the compilation a superlative, building and stripped
            back tune. Suited equally to the early doors as it is the early
            mornings.
          </p>
        </section>
        <aside>
          <iframe
            width="100%"
            height="120"
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FAAJAdeptford%2Fearnshaw-mellow-music-episode-004%2F"
            frameborder="0"
          ></iframe>
          <a
            href="https://www.mixcloud.com"
            target="_blank"
            rel="noopener noreferrer"
            >Buy now</a
          >
        </aside>
      </aaja-container>
    </article>
  </main>
</template>

<script>
import AajaSlugHero from '~/components/AajaSlugHero.vue'
export default {
  components: { AajaSlugHero },
  head: {
    htmlAttrs: {
      class: 'light',
    },
  },
}
</script>

<style lang="scss" scoped>
.record-item__content {
  display: grid;
  grid-template: auto / 1fr 33%;
  gap: 40px;
  @include breakpoint(mobile) {
    grid-template: auto / 100%;
  }
}
.record-item__copy {
  width: 100%;
  max-width: 680px;
  padding: var(--globalPadding) 0;
  @include breakpoint(mobile) {
    grid-row: 2 / 3;
  }
}
aside {
  iframe {
    background: var(--primary);
    position: sticky;
    top: 20px;
    width: 100%;
  }
  a {
    display: inline-block;
    padding: 9px 30px;
    position: sticky;
    top: 170px;
    color: var(--white);
    background: var(--mainColor);
    text-decoration: none;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 1px;
    margin-top: 30px;

    text-align: center;
    &:hover {
      opacity: 0.7;
    }
    @include breakpoint(mobile) {
      width: 100%;
      padding: 16px 30px;
    }
  }
  @include breakpoint(mobile) {
    grid-row: 1 / 2;
  }
}
</style>
