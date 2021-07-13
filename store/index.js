export const state = () => ({
  navState: false,
})

export const mutations = {
  toggleNav(state) {
    state.navState = !state.navState
  },
  toggleNavPayload(state, payload) {
    state.navState = payload
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchRadio')
  },
  fetchRadio() {
    console.log('HELLO THERE')
  },
  setNav({ commit }) {
    commit('toggleNav')
  },
  setNavPayload({ commit }, payload) {
    commit('toggleNavPayload', payload)
  },
}
