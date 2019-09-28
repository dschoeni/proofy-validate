import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import '@/custom.scss'

Vue.use(BootstrapVue)

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
