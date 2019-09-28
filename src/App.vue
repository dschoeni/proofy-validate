<template>
  <div id="app">
    <div class="bg-color">
      <div class="brand text-center">veritas</div>
      <div class="text-center text-white">a truthserum for the Internet.</div>
    </div>
    <div class="background">
    <div class="d-flex justify-content-center">
      <div class="logo">
        <object class="shield" type="image/svg+xml" data="logo.svg"></object>
        <object class="flask" type="image/svg+xml" data="flask.svg"></object>
      </div>
    </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-center">
      <ul class="nav py-4">
        <li class="nav-item">
          <router-link style="margin-right:20px;" class="btn btn-primary my-4" to="/">Generate</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-primary my-4" to="/validate">Validate</router-link>
        </li>
      </ul>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  mounted() {
  }
}
</script>

<style lang="scss">
@import './custom.scss';

html, body {
  height: 100%;
  background-color: #09b39c;
}

.brand {
  font-family: $Cairo;
  font-size: 4rem;
  color: white;
  padding-top: 3rem;
}

.shield {
  width: 200px;
}

.nav {
  font-size: 1.2rem;

  .nav-link:hover {
    color: #2c3e50;
  }

  .nav-link {
    color: white;
  }
}

.flask {
  position: absolute;
  width: 40px;
  left: 50%;
  margin-left: -20px;
  top: 140px;

  svg {
    fill: white;
    stroke-width: 100px;
  }
}

.logo {
  position: relative;
}

#app {
  font-family: $Roboto;
  font-display: auto;
  text-rendering: optimizeLegibility;

  color: #2c3e50;
}

.bg-color {
  background-color: #2c3e50;
  height: 200px;
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
