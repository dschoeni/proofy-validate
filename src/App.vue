<template>
  <div id="app">
    <div class="container">
      <img alt="Vue logo" src="./assets/logo.png" class="py-4" />
      <Validate />
    </div>
  </div>
</template>

<script>
import Validate from "./components/validate.vue";

export default {
  name: "app",
  components: {
    Validate
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
