import { format, isToday, isTomorrow, parseISO, toDate } from 'date-fns'

export const state = () => ({
  scheduleReq: null,
})

export const mutations = {
  updateScheduleReq(state, payload) {
    state.scheduleReq = payload
  },
}

export const actions = {
  async scheduleServerInit({ dispatch }) {
    await dispatch('fetchSchedule')
  },
  async fetchSchedule({ commit }) {
    const scheduleData = await this.$axios
      .$get('https://aajamusic.airtime.pro/api/week-info')
      .catch((e) => {
        console.log('Error with fetching Schedule data in the store::', e)
      })
    // console.log('schdule dispatch')

    commit('updateScheduleReq', scheduleData)
  },
}

export const getters = {
  schedule: (state) => {
    if (!state.scheduleReq) {
      return
    }
    delete state.scheduleReq.AIRTIME_API_VERSION

    let formatTime = (val) => {
      if (!val) {
        return
      }
      let formattedDate = format(toDate(parseISO(val)), 'HH:mm')
      return formattedDate
    }
    function getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
    }
    let schedule = []
    for (const item of Object.entries(state.scheduleReq)) {
      if (item[1].length > 0) {
        let theDate = toDate(parseISO(item[1][0].start_timestamp))
        let label
        if (isToday(theDate)) {
          label = 'Today'
        } else if (isTomorrow(theDate)) {
          label = 'Tomorrow'
        } else {
          label = format(theDate, 'EEEE')
        }
        schedule.push({
          date: theDate,
          label,
          _id: getRandomInt(54123, 98465),
          schedule: [...item[1]].map((day) => {
            return {
              onAir: false,
              time: {
                from: formatTime(day.start_timestamp, 'HH:mm'),
                to: formatTime(day.end_timestamp, 'HH:mm'),
              },
              name: day.name,
              _id: getRandomInt(34623, 346346),
              img: false,
            }
          }),
        })
      }
    }

    return schedule
  },
  // radioInfo: (state) => {
  //   let current = state.reqData.shows.current ? state.reqData.shows.current : false
  //   let next = state.reqData.shows.next[0] ? state.reqData.shows.next[0] : false
  //   let onAir = state.reqData.shows.current ? true : false
  //   return { current, next, onAir }
  // },
  // s1Stream: (state) => {
  //   if (!state.stationMeta.stream_data.s1.url) {
  //     return 'https://aajamusic.out.airtime.pro/aajamusic_a'
  //   }
  //   return state.stationMeta.stream_data.s1.url
  // },
}
