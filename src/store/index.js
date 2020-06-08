import Vue from 'vue'
import Vuex from 'vuex'

import {config} from '../network/login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sysConfig: {}
  },
  mutations: {
    mutationsSetConfig(state, payload) {
      state.sysConfig = payload
    }
  },
  actions: {
    actionSetConfig(context, payload) {
      context.commit('mutationsSetConfig', payload);
    }
  },
  modules: {
  }
})
