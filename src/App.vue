<template>
  <div id="app">
    <div class="bg-color">
    
    </div>
    <div class="background">
    <div class="d-flex justify-content-center">
      <div id="logo">

      </div>
    </div>
    </div>
    <div class="container">
      <div id="nav text-center text-white">
      <router-link to="/">Generate</router-link> |
      <router-link to="/validate">Validate</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import * as Vivus from 'vivus'

export default {
  mounted() {
    const myVivus = new Vivus('logo', { duration: 3000, file: 'logo.svg', animTimingFunction: Vivus.EASE });
    myVivus.play()
  }
}
</script>

<style lang="scss">
@import './custom.scss';

html, body {
  height: 100%;
  background-color: #09b39c;
}

#app {
  font-family: $Roboto;
  font-display: auto;
  text-rendering: optimizeLegibility;

  color: #2c3e50;
}

.bg-color {
  background-color: #2c3e50;
  height: 100px;
}

.background {
  background: url('assets/bg2.png');
  background-repeat: no-repeat;
}

#logo {
  width: 150px;
  padding-bottom: 3rem;

  svg {
    fill: white;
  }
}
</style>
