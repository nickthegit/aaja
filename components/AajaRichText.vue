<template>
  <div class="aaja-rich-text">
    <SanityContent :blocks="blocks" :serializers="serializers" />
  </div>
</template>

<script>
import SanityYoutube from './SanityYoutube.vue'

export default {
  props: {
    blocks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      serializers: {
        types: {
          youtube: SanityYoutube
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.aaja-rich-text {
  line-height: 1.6;
  
  ::v-deep {
    p { margin-bottom: 1.5em; }
    h1, h2, h3 { margin-top: 1.5em; margin-bottom: 0.5em; }
    ul { list-style: disc; margin-left: 1.5em; margin-bottom: 1em; }
    a { text-decoration: underline; color: inherit; }
  }
}
</style>
