import '../../plugins/axios'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  getters: {
    GET_NOTIFICATIONS(state) {
      // console.log(state.notifications);
      return state.notifications
    },
  },
  mutations: {
    SET_NOTIFICATION(state, payload) {
      payload.date_creation = moment(new Date()).format('DD/MM/YYYY hh:mm')
      state.notifications.unshift(payload)
    },
    SET_NOTIFICATIONS(state, payload) {
      state.notifications = payload
    },
    MAKE_ALL_SEEN(state) {
      state.notifications = state.notifications.map(el => {
        el.seen = true

        return el
      })
    },
    CLEAR_NOTIFICATIONS(state) {
      state.notifications = []
    },
  },
  actions: {
    GET_OFFLINE_NOTIFICATIONS({ dispatch, commit, getters }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get()
          .then(response => {
            let data = []
            if (response.data && response.data.data) {
              data = response.data.data.map(el => {
                const obj = el.content
                obj.seen = el.seen
                obj.date_creation = moment(el.date_creation).format('DD/MM/YYYY hh:mm')

                return obj
              })
            }
            commit('SET_NOTIFICATIONS', data)
            resolve(response.data.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    MAKE_ALL_SEEN({ dispatch, commit, getters }, id) {
      return new Promise((resolve, reject) => {
        axios
          .post()
          .then(response => {
            commit('MAKE_ALL_SEEN')
            resolve(true)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    CLEAR_NOTIFICATIONS({ dispatch, commit, getters }, id) {
      return new Promise((resolve, reject) => {
        axios
          .post()
          .then(response => {
            commit('CLEAR_NOTIFICATIONS')
            resolve(true)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
}
