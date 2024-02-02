import { getFormattedSchedule } from './helpers.js';

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

const CALENDAR_WEEKS = 2

export const actions = {
  async scheduleServerInit({ dispatch }) {
    await dispatch('fetchSchedule')
    await dispatch('fetchSchedule2')
  },
  async fetchSchedule({ commit }) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const startDate = now.toISOString();
    const next = new Date().getTime() + 7 * CALENDAR_WEEKS * 24 * 60 * 60 * 1000;
    const endDate = new Date(next).toISOString();

    const scheduleData = await this.$axios
      .$get(`https://api.radiocult.fm/api/station/aaja/schedule?startDate=${startDate}&endDate=${endDate}&timezone=europe/london`, {
        headers: {
          'x-api-key': "pk_bd8d07b2fc1247778f3ee31e1bd02972",
        }
      })
      .catch((e) => {
        console.log('Error with fetching Schedule data in the store::', e)
      })

    commit('updateScheduleReq', scheduleData)
  },
  async fetchSchedule2({ commit }) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const startDate = now.toISOString();
    const next = new Date().getTime() + 7 * CALENDAR_WEEKS * 24 * 60 * 60 * 1000;
    const endDate = new Date(next).toISOString();

    const scheduleData = await this.$axios
      .$get(`https://api.radiocult.fm/api/station/aaja-2/schedule?startDate=${startDate}&endDate=${endDate}&timezone=europe/london`, {
        headers: {
          'x-api-key': "pk_723cdd9183004e34bb7da0125dfedf16",
        }
      })
      .catch((e) => {
        console.log('Error with fetching Schedule2 data in the store::', e)
      })

    commit('updateScheduleReq2', scheduleData)
  },
}

export const getters = {
  schedule: (state) => {
    if (!state.scheduleReq?.schedules) {
      return
    }

    return getFormattedSchedule(state.scheduleReq.schedules)
  },
  schedule2: (state) => {
    if (!state.scheduleReq2?.schedules) {
      return
    }

    return getFormattedSchedule(state.scheduleReq2.schedules)
  },
}
