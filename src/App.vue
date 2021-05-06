<template>
  <div id="app">
    <NavBar></NavBar>
    <div style="height: 60px;"></div>
    <router-view/>
  </div>
</template>
<script>
import NavBar from "./components/NavBar";
export default {
  name: 'app',
  components: {NavBar},
  created() {
  }
}
</script>
<style lang="less">
  body {
    display: block;
    margin: 0px;
  }
</style>
