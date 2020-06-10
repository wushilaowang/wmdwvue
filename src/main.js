import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'

import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(VueCookies)

Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
