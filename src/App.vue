<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Login from './views/Login'
import Store from './store/index'
export default {
  name: "App",
  components: {
    Login
  },
  mounted() {
      window.addEventListener('unload', this.saveState)
  },
  methods: {
      saveState() {
        console.log(1)
          sessionStorage.setItem('state', JSON.stringify(this.$store.state))
      },
  }
}
</script>

<style>
@import "./assets/css/normalize.css";
@import url('./assets/css/iconfont/iconfont.css');
</style>
