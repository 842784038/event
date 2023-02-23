import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('@/views/layout/index.vue') },
  {
    path: '/reg',
    component: () => import('@/views/register/index-register.vue')
  },
  { path: '/login', component: () => import('@/views/login/index-login.vue') }
]

const router = new VueRouter({
  routes
})

// 全局前置路由守卫
const whiteList = ['/reg', '/login'] // 白名单
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    if (!store.state.userInfo.username) {
      store.dispatch('getUserInfoActions')
    }
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
