import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import '@/custom.scss'

Vue.use(BootstrapVue)

import { faCircleNotch, faCheck, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faCircleNotch, faCheck, faFileAlt)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
