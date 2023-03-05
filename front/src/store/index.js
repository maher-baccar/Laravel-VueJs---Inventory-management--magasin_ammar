import Vue from 'vue'
import Vuex from 'vuex'
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

/* Modules */
import actions from './modules/actions'
import admin from './modules/admin'
import storekepeer from './modules/storekeeper'
import auth from './modules/auth'
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { actions, admin, storekepeer, auth },
    plugins: [createPersistedState()],
})