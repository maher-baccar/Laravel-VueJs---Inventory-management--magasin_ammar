import '../../plugins/axios'

export default {
    namespaced: true,
    state: {
        user: {},
        token: '',
        loggedIn: false,
    },
    getters: {
        GET_USER_DATA(state) {
            return state.user
        },
        GET_TOKEN(state) {
            return state.token
        },
        GET_ROLE(state) {
            return state.user.role.name
        },
        IS_AUTH(state) {
            return state.loggedIn
        },
    },
    mutations: {
        SET_USER_DATA(state, user) {
            state.user = user
        },
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_LOGGED(state, status) {
            state.loggedIn = status
        },
        LOGIN(state, payload) {
            state.user = payload.user
            state.token = payload.token
            state.loggedIn = true
        },
        LOGOUT(state) {
            state.user = {}
            state.token = null
            state.loggedIn = false
        },
    },
    actions: {
        LOGIN({ dispatch, commit, getters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('login', payload)
                    .then(response => {
                        console.log(response.data);
                        commit('LOGIN', response.data)
                        resolve(response.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        GET_USER_DATA({ dispatch, commit, getters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get('user', payload)
                    .then(response => {

                        commit('LOGIN', response.data.data)
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
      
        UPDATE_PASSWORD({ dispatch, commit, getters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .put('update_password', payload)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        UPDATE_PROFILE({ dispatch, commit, getters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .put('update_profile', payload)
                    .then(response => {
                        commit('SET_USER_DATA', response.data.data)
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        REGISTER_CLIENT({ dispatch, commit, getters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('register_client', payload)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        FORGOT({ dispatch, commit, getters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('forgot-password', payload)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        RESET({ dispatch, commit, getters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('reset-password', payload)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        async LOGOUT({ dispatch, commit, getters }) {
            return new Promise((resolve, reject) => {
                axios
                    .post('logout')
                    .then(response => {
                        commit('LOGOUT')
                        resolve(true)
                    })
                    .catch(err => {
                        commit('LOGOUT')
                        window.localStorage.clear()
                        window.location.reload(true)
                        reject(err)
                    })
            })
        },
    },
}