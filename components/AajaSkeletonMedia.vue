<template>
  <div class="aaja-media" :class="{ 'is-loading': loading }">
    <transition name="fade">
      <div v-if="loading" class="skeleton-shimmer">
        <div class="shimmer-indicator">
          Loading...
        </div>
      </div>
    </transition>

    <div class="media-content">
      <template v-if="type === 'file'">
        <video
          ref="video"
          :src="url"
          controls
          muted
          preload="metadata"
          playsinline
          @loadeddata="onLoaded"
          @canplay="onLoaded"
          @error="onError"
        />
      </template>
      <template v-else>
        <img
          v-show="src"
          :src="src"
          :alt="alt"
          @load="onLoaded"
          @error="onError"
          @click="$emit('click')"
        >
      </template>
    </div>
  </div>
</template>

<script>
// Global cache to track loaded assets during the session
const loadedCache = new Set();

export default {
  props: {
    type: {
      type: String,
      default: 'image'
    },
    src: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  data() {
    const mediaUrl = this.type === 'file' ? this.url : this.src;
    return {
      // Initialize loading state based on global cache
      loading: mediaUrl ? !loadedCache.has(mediaUrl) : true
    }
  },
  watch: {
    src(newSrc) { 
      if (newSrc && !loadedCache.has(newSrc)) {
        this.loading = true
      }
      this.$nextTick(() => this.checkIfLoaded())
    },
    url(newUrl) { 
      if (newUrl && !loadedCache.has(newUrl)) {
        this.loading = true
      }
      this.$nextTick(() => this.checkIfLoaded())
    }
  },
  mounted() {
    this.checkIfLoaded()
    // Periodic check for cache hits or late loads
    this.interval = setInterval(() => {
      if (this.loading) this.checkIfLoaded()
      else clearInterval(this.interval)
    }, 500)
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval)
  },
  methods: {
    checkIfLoaded() {
      if (process.client) {
        const mediaUrl = this.type === 'file' ? this.url : this.src;
        if (mediaUrl && loadedCache.has(mediaUrl)) {
          this.loading = false;
          return;
        }

        const el = this.$el.querySelector('img, video')
        if (el) {
          if (this.type === 'file') {
            if (el.readyState >= 2) this.onLoaded()
          } else if (el.complete && el.naturalWidth !== 0) this.onLoaded()
        }
      }
    },
    onLoaded() {
      const mediaUrl = this.type === 'file' ? this.url : this.src;
      if (mediaUrl) loadedCache.add(mediaUrl);
      this.loading = false
    },
    onError() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.aaja-media {
  position: relative;
  width: 100%;
  height: 100%;
  background: #111; /* Darker background for contrast */
  overflow: hidden;
}

.media-content {
  width: 100%;
  height: 100%;
  
  img, video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.skeleton-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.03) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shimmer-indicator {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.2);
    text-transform: uppercase;
    letter-spacing: 1px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
