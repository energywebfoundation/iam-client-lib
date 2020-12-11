<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h2>IAM showcase app</h2>
    <Main />
    <SourceCode />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Main from "./components/Main.vue";
import SourceCode from "./components/SourceCode.vue";

export default Vue.extend({
  name: "App",
  components: {
    Main,
    SourceCode
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
