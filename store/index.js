export const state = () => ({
  navState: false,
  reqData: null,
  stationMeta: null,
})

export const mutations = {
  toggleNav(state) {
    state.navState = !state.navState
  },
  toggleNavPayload(state, payload) {
    state.navState = payload
  },
  updateReqData(state, payload) {
    state.reqData = payload
  },
  updateStationMeta(state, payload) {
    state.stationMeta = payload
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }, context) {
    // console.log('liveInfo', liveInfo)
    await dispatch('fetchRadio')
    await dispatch('fetchRLiveStreamURI')
    // * archive
    await dispatch('archive/archiveServerInit')
  },
  async fetchRadio({ commit }) {
    const reqData = await this.$axios
      .$get('https://aajamusic.airtime.pro/api/live-info-v2')
      .then((data) => {
        return data
      })
      .catch((e) => {
        console.log('Error with fetching radio widget liveInfo data in the store::', e)
      })
    // console.log('fetch radio')
    commit('updateReqData', reqData)
  },
  async fetchRLiveStreamURI({ commit }) {
    const stationMetaData = await this.$axios
      .$get('https://aajamusic.airtime.pro/api/station-metadata')
      .then((data) => {
        return data
      })
      .catch((e) => {
        console.log('Error with fetching radio widget Metadat data in the store::', e)
      })

    commit('updateStationMeta', stationMetaData)
  },
  setNav({ commit }) {
    commit('toggleNav')
  },
  setNavPayload({ commit }, payload) {
    commit('toggleNavPayload', payload)
  },
}

export const getters = {
  radioInfo: (state) => {
    let current = state.reqData.shows.current ? state.reqData.shows.current : false
    let next = state.reqData.shows.next[0] ? state.reqData.shows.next[0] : false
    let onAir = state.reqData.shows.current ? true : false
    return { current, next, onAir }
  },
  s1Stream: (state) => {
    if (!state.stationMeta.stream_data.s1.url) {
      return 'https://aajamusic.out.airtime.pro/aajamusic_a'
    }
    return state.stationMeta.stream_data.s1.url
  },
}
