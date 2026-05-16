export const state = () => ({
  navState: false,
  reqData: null,
  stationMeta: null,
  reqData2: null,
  stationMeta2: null,
  popupButtonSettings: null,
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
  updateReqData2(state, payload) {
    state.reqData2 = payload
  },
  popupButtonSettings(state, payload) {
    state.popupButtonSettings = payload
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }, context) {
    // console.log('liveInfo', liveInfo)
    await dispatch('fetchRadio')
    await dispatch('fetchRadio2')
    // * schedule
    await dispatch('schedule/scheduleServerInit')
    // * archive
    await dispatch('archive/archiveServerInit')
  },
  async fetchButtonSettings({ commit }) {
    console.log('gone here')
    const buttonSettings = await this.$axios.fetch(buttonPopupQuery)

    commit('popButtonSettings', buttonSettings)
  },

  async fetchRadio({ commit }) {
    const numWeeks = 2;
    const now = new Date();
    const nowISO = now.toISOString();
    const next = new Date().getTime() + 7 * numWeeks * 24 * 60 * 60 * 1000;
    const nextISO = new Date(next).toISOString();

    const reqData = await this.$axios
      .$get(`https://api.radiocult.fm/api/station/aaja/schedule?startDate=${nowISO}&endDate=${nextISO}&timezone=europe/london`, {
        headers: {
          'x-api-key': "pk_bd8d07b2fc1247778f3ee31e1bd02972",
        }
      })
      .then((data) => {
        return data
      })
      .catch((e) => {
        console.log('Error with fetching radio widget liveInfo data in the store::', e)
      })
    // console.log('fetch radio')
    commit('updateReqData', reqData)
  },
  async fetchRadio2({ commit }) {
    const numWeeks = 2;
    const now = new Date();
    const nowISO = now.toISOString();
    const next = new Date().getTime() + 7 * numWeeks * 24 * 60 * 60 * 1000;
    const nextISO = new Date(next).toISOString();

    const reqData = await this.$axios
      .$get(`https://api.radiocult.fm/api/station/aaja-2/schedule?startDate=${nowISO}&endDate=${nextISO}&timezone=europe/london`, {
        headers: {
          'x-api-key': "pk_723cdd9183004e34bb7da0125dfedf16",
        }
      })
      .then((data) => {
        return data
      })
      .catch((e) => {
        console.log('Error with fetching radio widget liveInfo2 data in the store::', e)
      })
    // console.log('fetch radio', reqData)
    commit('updateReqData2', reqData)
  },
  setNav({ commit }) {
    commit('toggleNav')
  },
  setNavPayload({ commit }, payload) {
    commit('toggleNavPayload', payload)
  },
}
// Programme
// {
//   id: string;
//   stationId: string;
//   title: string;
//   startDateUtc: string;
//   endDateUtc: string;
//   description?: JSONContent;
//   duration: Minutes;
//   timezone: string;
//   color?: string;
//   artistIds?: string[];
//   isRecurring: boolean
//   media:
//     | {
//       type: 'mix';
//       trackId: string;
//     }
//     | {
//         type: 'playlist';
//         playlistId: string;
//       }
//     | {
//         type: 'live';
//       };
// }

const isProgrammeLive = (programme) => {
  const now = new Date();
  const start = new Date(programme.start);
  const end = new Date(programme.end);
  return now <= end && now >= start
}

const isFutureProgramme = (programme) => {
  const now = new Date();
  const start = new Date(programme.start);
  return now < start
}


export const getters = {
  nowRadioInfo: (state) => {
    const hasProgrammes = !!state?.reqData?.schedules?.length;
    const current = hasProgrammes && state?.reqData?.schedules.find(isProgrammeLive);
    const next = hasProgrammes && !current && state?.reqData?.schedules.find(isFutureProgramme);

    return { current, next }
  },
  nowRadioInfo2: (state) => {
    const hasProgrammes = !!state?.reqData2?.schedules?.length;
    const current = hasProgrammes && state?.reqData2?.schedules.find(isProgrammeLive);
    const next = hasProgrammes && !current && state?.reqData2?.schedules.find(isFutureProgramme);

    return { current, next }
  },
  s1Stream: (state) => {
    return 'https://aaja.radiocult.fm/stream'
  },
  s2Stream: (state) => {
    return 'https://aaja-2.radiocult.fm/stream'
  },
}
