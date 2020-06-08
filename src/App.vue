<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Login from './views/Login'
export default {
  name: "APp",
  components: {
    Login
  }
}
</script>

<style>
@import "./assets/css/normalize.css";
</style>
