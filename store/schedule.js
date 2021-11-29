import { format, isToday, isTomorrow, parseISO, toDate } from 'date-fns'

export const state = () => ({
  scheduleReq: null,
  scheduleReq2: null,
})

export const mutations = {
  updateScheduleReq(state, payload) {
    state.scheduleReq = payload
  },
  updateScheduleReq2(state, payload) {
    state.scheduleReq2 = payload
  },
}

export const actions = {
  async scheduleServerInit({ dispatch }) {
    await dispatch('fetchSchedule')
    await dispatch('fetchSchedule2')
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
  async fetchSchedule2({ commit }) {
    const scheduleData = await this.$axios
      .$get('https://aaja2.airtime.pro/api/week-info')
      .catch((e) => {
        console.log('Error with fetching Schedule data in the store::', e)
      })
    // console.log('schdule dispatch')

    commit('updateScheduleReq2', scheduleData)
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
  schedule2: (state) => {
    if (!state.scheduleReq2) {
      return
    }
    delete state.scheduleReq2.AIRTIME_API_VERSION

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
    for (const item of Object.entries(state.scheduleReq2)) {
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
}
