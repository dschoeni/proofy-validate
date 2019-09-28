import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'proof',
      component: () => import(/* webpackChunkName: "proof" */ './views/proof.vue')
    },
    {
      path: '/validate',
      name: 'validate',
      component: () => import(/* webpackChunkName: "validate" */ './views/validate.vue')
    },
    {
      path: '/diff',
      name: 'diff',
      component: () => import(/* webpackChunkName: "diff" */ './views/diff.vue')
    }
  ]
})
