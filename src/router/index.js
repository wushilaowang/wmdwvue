import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home/Home.vue')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]
const router = new VueRouter({
  routes
})

export default router
