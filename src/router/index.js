import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home/Home.vue')
const panelContent = () => import('../views/Home/Content/Panel/PanelContent')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {path: 'panelContent', name: 'panelContent', component: panelContent}
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
