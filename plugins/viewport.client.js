export default ({ store }) => {
  const mediaQuery = window.matchMedia('(max-width: 480px)')

  const handleTabletChange = (e) => {
    store.commit('updateIsMobile', e.matches)
  }

  // Defer initial check until after hydration to avoid SSR/client mismatch
  window.onNuxtReady(() => {
    handleTabletChange(mediaQuery)
  })

  // Listen for changes
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleTabletChange)
  } else {
    // Fallback for older browsers
    mediaQuery.addListener(handleTabletChange)
  }
}
