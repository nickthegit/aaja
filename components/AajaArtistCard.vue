<template>
  <transition name="img-in">
    <nuxt-link v-if="showing" :to="`/residents/${artistLink}`" class="archive-card">
      <article>
        <div class="img-wrap">
          <img
            :src="artistImage ? artistImage : 'https://placehold.co/600x400'"
            :alt="imageAltText"
          />
        </div>
        <h2>{{ artistName }}</h2>
        <p v-if="sortBio">{{ sortBio }}</p>
        <button>
          Listen to a show <span><arrow /></span>
        </button>
      </article>
    </nuxt-link>
  </transition>
</template>

<script>
import Arrow from '~/assets/img/icons/arrow.svg?inline'
export default {
  components: {
    Arrow,
  },
  props: {
    artistLink: {
      type: String,
    },
    artistImage: {
      default: 'https://placehold.co/600x400',
    },
    imageAltText: {
      type: String,
      default: 'A Aaja Resident Image',
    },
    artistName: {
      type: String,
      default: 'Artist Name',
    },
    sortBio: {
      type: [String, Boolean],
    },
  },
  data() {
    return {
      showing: true,
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
a {
  width: 100%;
  height: 100%;
  display: block;
  background: var(--white);
  color: var(--dark);
  padding: 20px;
  text-decoration: none;
  &:hover {
    button {
      opacity: 0.7;
    }
  }
}
article {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: stretch;
  padding-bottom: 0;
}
.img-wrap {
  width: 100%;
  height: 0;
  position: relative;
  padding-bottom: 100%;
}
img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
}
h2 {
  font-size: var(--h5Size);
  line-height: var(--h5Size);
  margin: 20px 0;
}
p {
  font-size: var(--pSize);
  line-height: var(--pLineHeight);
  margin-bottom: 10px;
}
button {
  color: var(--black);
  position: relative;
  font-weight: 600;
  background: transparent;
  border: none;
  text-align: left;
  margin-top: 20px;
  flex-grow: 2;
  display: flex;
  align-items: flex-end;
  padding-left: 0;
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
</style>
