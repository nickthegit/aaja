<template>
  <div v-if="videoId" class="video-embed">
    <iframe
      width="100%"
      height="450"
      :src="`https://www.youtube.com/embed/${videoId}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div v-else-if="url" class="video-embed-fallback">
    <a :href="url" target="_blank" rel="noopener noreferrer">{{ url }}</a>
  </div>
</template>

<script>
export default {
  // Sanity passes the block data in the 'node' prop
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  computed: {
    url() {
      return this.node?.url
    },
    videoId() {
      if (!this.url) return null
      // Fixed regex to avoid useless escapes
      const match = this.url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)
      return match ? match[1] : null
    }
  }
}
</script>

<style lang="scss" scoped>
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
    background: #000;
  }
}

.video-embed-fallback {
  padding: 20px;
  border: 1px dashed #666;
  text-align: center;
  margin: 1em 0;
}
</style>
