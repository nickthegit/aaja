// import { residentAllQuery } from '~/utils/queries.js'

// export const state = () => ({
//   residentsReq: null,
// })

// export const mutations = {
//   updateResidentsReq(state, payload) {
//     state.residentsReq = payload
//   },
// }

// export const actions = {
//   async archiveServerInit({ dispatch }) {
//     await dispatch('fetchResidents')
//   },
//   async fetchResidents({ commit }) {
//     const residentAll = await this.$sanity.fetch(residentAllQuery)
//     commit('updateResidentsReq', residentAll)
//   },
// }

// export const getters = {
//   residentsLetters: (state) => {
//     let arrayOfFirstLetters = state.residentsReq.map((resident) => {
//       return resident.name.charAt(0).toUpperCase()
//     })
//     let arrayRemoveDuplicates = arrayOfFirstLetters
//       .filter((letter, index) => {
//         return arrayOfFirstLetters.indexOf(letter) === index
//       })
//       .sort()

//     return arrayRemoveDuplicates
//   },
// }
