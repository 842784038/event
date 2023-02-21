import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('@/views/layout/index.vue') },
  { path: '/reg', component: () => import('@/views/register/index-register.vue') },
  { path: '/login', component: () => import('@/views/login/index-login.vue') }
]

const router = new VueRouter({
  routes
})

export default router
