import '../../plugins/axios'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        All_CATEGORIES({ dispatch, commit, getters }) {
            return new Promise((resolve, reject) => {
                axios
                    .get('categories')
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        ADD_CATEGORY({ dispatch, commit, getters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('categories/', payload)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        UPDATE_CATEGORY({ dispatch, commit, getters }, data) {
            let { id, payload } = data
            return new Promise((resolve, reject) => {
                axios
                    .put('categories/' + id, payload)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        DELETE_CATEGORY({ dispatch, commit, getters }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete('categories/' + id)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        All_PROVIDERS({ dispatch, commit, getters }) {
            return new Promise((resolve, reject) => {
                axios
                    .get('providers')
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        ADD_PROVIDER({ dispatch, commit, getters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('providers/', payload)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        UPDATE_PROVIDER({ dispatch, commit, getters }, data) {
            let { id, payload } = data
            return new Promise((resolve, reject) => {
                axios
                    .put('providers/' + id, payload)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        DELETE_PROVIDER({ dispatch, commit, getters }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete('providers/' + id)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        All_PRODUCTS({ dispatch, commit, getters }) {
            return new Promise((resolve, reject) => {
                axios
                    .get('products')
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        ADD_PRODUCT({ dispatch, commit, getters }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post('products/', payload)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        UPDATE_PRODUCT({ dispatch, commit, getters }, data) {
            let { id, payload } = data
            return new Promise((resolve, reject) => {
                axios
                    .put('products/' + id, payload)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        DELETE_PRODUCT({ dispatch, commit, getters }, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete('products/' + id)
                    .then(response => {
                        resolve(response.data.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
    }
}