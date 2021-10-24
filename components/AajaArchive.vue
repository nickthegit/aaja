<template>
  <article class="archive">
    <aaja-container>
      <section class="archive-title-bar title-bar">
        <h2>
          Archive<span><Logo /></span>
        </h2>
      </section>
      <section class="res-filter">
        <button
          v-for="letter in residentsLetters"
          :key="letter"
          :class="letter == letterSelected ? 'selected' : ''"
          @click="selectLetter(letter)"
        >
          {{ letter }}
        </button>
      </section>
      <section class="archive-artist-card-wrap">
        <aaja-artist-card
          v-for="resident in residents"
          :key="resident._id"
          :artistLink="resident.slug"
          :artistImage="
            resident.image
              ? $urlFor(resident.image).size(600)
              : `https://placehold.co/600x400?text=${resident.slug}`
          "
          :imageAltText="`Image of Aaja Resident ${resident.name}`"
          :artistName="resident.name"
          :sortBio="resident.short_bio | cutBio"
        />
      </section>
      <section class="res-filter">
        <button
          v-for="letter in residentsLetters"
          :key="letter"
          :class="letter == letterSelected ? 'selected' : ''"
          @click="selectLetter(letter)"
        >
          {{ letter }}
        </button>
      </section>
    </aaja-container>
  </article>
</template>

<script>
import Logo from '~/assets/img/icons/logo.svg?inline'
export default {
  components: {
    Logo,
  },
  data() {
    return {
      letterSelected: 'A',
    }
  },
  computed: {
    // residentsLetters() {
    //   return this.$store.getters['archive/residentsLetters']
    // },
    hasDigits() {
      const residentsLetters = this.$store.getters['archive/residentsLetters']
      const hasDigits = residentsLetters.filter((i) => +i === +i)
      return hasDigits
    },
    residentsLetters() {
      const residentsLetters = this.$store.getters['archive/residentsLetters']
      if (this.hasDigits.length > 0) {
        const removeNumbers = residentsLetters.filter((i) => +i != +i)
        removeNumbers.unshift('#')
        return removeNumbers
      } else {
        return residentsLetters
      }
    },
    residents() {
      const residents = this.$store.state.archive.residentsReq
      if (this.letterSelected === '&num;' || this.letterSelected === '#') {
        return residents.filter((resident) => +resident.name.charAt(0) === +resident.name.charAt(0))
      } else {
        return residents.filter(
          (resident) => resident.name.charAt(0).toUpperCase() === this.letterSelected
        )
      }
    },
  },
  methods: {
    selectLetter(val) {
      this.letterSelected = val.toUpperCase()
    },
  },
  filters: {
    cutBio: function (value) {
      if (!value) return false
      value = value.toString()
      if (value.length < 114) return value
      return value.slice(0, 118) + '...'
    },
  },
  async created() {
    await this.$store.dispatch('archive/fetchResidents')
  },
  mounted() {
    // console.log('STORREEEYYY', this.$store.getters['archive/residentsLetters'])
    // console.log('residents', this.residents)

    console.log('TEST', this.residentsLetters)
  },
}
</script>

<style lang="scss" scoped>
.title-bar {
  margin-bottom: 0px;
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
  h2 {
    margin-bottom: 0;
  }
}
.archive {
  background: transparent;
  color: var(--white);
  padding: var(--globalPadding) 0;
}
.archive-title-bar {
  span {
    svg {
      fill: var(--white);
    }
  }
}
.archive-artist-card-wrap {
  width: 100%;
  display: grid;
  grid-template: auto / 1fr 1fr 1fr 1fr;
  gap: 40px;
  grid-gap: 40px;
  @media screen and (max-width: 1024px) {
    grid-template: auto / 1fr 1fr 1fr;
  }
  @include breakpoint(tablet) {
    grid-template: auto / 1fr 1fr;
  }
  @include breakpoint(mobile) {
    grid-template: auto / 1fr;
    gap: 20px;
    grid-gap: 20px;
  }
}
.res-filter {
  padding: 40px 0;
  width: 100%;
  button {
    display: inline-block;
    color: #fff;
    background: transparent;
    border: none;
    font-size: 22px;
    padding: 10px;
    // margin-bottom: 10px;
    &.selected {
      font-weight: 800;
      text-decoration: underline;
    }
  }
}
</style>
