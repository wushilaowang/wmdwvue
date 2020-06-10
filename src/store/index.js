import Vue from 'vue'
import Vuex from 'vuex'

import {config} from '../network/login'

Vue.use(Vuex)


const state =  sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
  sysConfig: {},//系统参数
  token: {},
  sysParam: {},//字典
  district: {},//地区
  userInfo: {},//登陆用户信息
};
const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  deleteToken(state, token) {
    state.token = '';
  },
  mutationsSetSysConfig(state, payload) {
    state.sysConfig = JSON.stringify(payload)
  },
  mutationsSetSysParam(state, payload) {
    state.sysParam = JSON.stringify(payload)
  },
  mutationsSetDistrict(state, payload) {
    state.district = JSON.stringify(payload)
  },
  mutationsSetUserInfo(state, payload) {
    state.userInfo = JSON.stringify(payload)
  }
};
const actions = {
};
const modules = {
};


export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  modules: modules
})
