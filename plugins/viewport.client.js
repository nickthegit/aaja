export default ({ store }) => {
  const mediaQuery = window.matchMedia('(max-width: 480px)')

  const handleTabletChange = (e) => {
    store.commit('updateIsMobile', e.matches)
  }

  // Initial check
  handleTabletChange(mediaQuery)

  // Listen for changes
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleTabletChange)
  } else {
    // Fallback for older browsers
    mediaQuery.addListener(handleTabletChange)
  }
}
