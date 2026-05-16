<template>
  <div class="aaja-media" :class="{ 'is-loading': loading }">
    <transition name="fade">
      <div v-if="loading" class="skeleton-shimmer"></div>
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
          @error="onError"
        ></video>
      </template>
      <template v-else>
        <img
          :src="src"
          :alt="alt"
          @load="onLoaded"
          @error="onError"
          @click="$emit('click')"
        />
      </template>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.checkIfLoaded()
  },
  watch: {
    // Reset loading state when src/url changes
    src() { 
      this.loading = true
      this.$nextTick(() => this.checkIfLoaded())
    },
    url() { 
      this.loading = true
      this.$nextTick(() => this.checkIfLoaded())
    }
  },
  methods: {
    checkIfLoaded() {
      if (process.client) {
        const el = this.$el.querySelector('img, video')
        if (el) {
          if (this.type === 'file') {
            if (el.readyState >= 3) this.loading = false
          } else {
            if (el.complete && el.naturalWidth !== 0) this.loading = false
          }
        }
      }
    },
    onLoaded() {
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
  background: rgba(255, 255, 255, 0.05);
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
  z-index: 2;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
