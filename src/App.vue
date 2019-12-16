<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <About/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import About from './components/about'

export default {
  name: 'app',
  // components: {
  //   About
  // }
}
</script>

<style>
body {
  margin:0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  width:100%;
  height:100%;
  margin-left:0;
  margin-top: 0;
  color: #2c3e50;
}
</style>
