import Vue from 'vue'
import Vuex from 'vuex'

import {config} from '../network/login'

Vue.use(Vuex)


const state =  {
  sysConfig: localStorage.getItem('sysConfig'),//系统参数
  token: localStorage.getItem('token'),
  sysParam: localStorage.getItem('sysParam'),//字典
  district: localStorage.getItem('district'),//地区
  userInfo: localStorage.getItem('userInfo'),//登陆用户信息
};
const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  deleteToken(state, token) {
    state.token = '';
  },
  mutationsSetConfig(state, payload) {
    localStorage.setItem("sysConfig", JSON.stringify(payload))
  },
  mutationsSetSysParam(state, payload) {
    localStorage.setItem("sysParam", JSON.stringify(payload))
  },
  mutationsSetDistrict(state, payload) {
    localStorage.setItem("district", JSON.stringify(payload))
  },
  mutationsSetUserInfo(state, payload) {
    localStorage.setItem("userInfo", JSON.stringify(payload))
    console.log(JSON.parse(JSON.stringify(payload)))
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
