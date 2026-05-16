<template>
  <div class="sanity-content">
    <SanityContent :blocks="blocks" :serializers="serializers" />
  </div>
</template>

<script>
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
          youtube: (props) => {
            const { url } = props.node
            if (!url) return null
            
            const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^\"&?\/\s]{11})/);
            const videoId = match ? match[1] : null;
            
            if (!videoId) return this.$createElement('a', { attrs: { href: url } }, url)

            return this.$createElement('div', { class: 'video-embed' }, [
              this.$createElement('iframe', {
                attrs: {
                  width: '100%',
                  height: '450',
                  src: `https://www.youtube.com/embed/${videoId}`,
                  frameborder: '0',
                  allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                  allowfullscreen: true
                }
              })
            ])
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sanity-content {
  line-height: 1.6;
  
  ::v-deep {
    p { margin-bottom: 1.5em; }
    h1, h2, h3 { margin-top: 1.5em; margin-bottom: 0.5em; }
    ul { list-style: disc; margin-left: 1.5em; margin-bottom: 1em; }
    a { text-decoration: underline; color: inherit; }
  }
}

.video-embed {
  margin: 2em 0;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
}
</style>
