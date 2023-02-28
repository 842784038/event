import store from '@/store'
import axiox from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
const myAxios = axiox.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})
// 请求拦截器
myAxios.interceptors.request.use(function (config) {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
myAxios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    router.push('/login')
    Message.error('用户身份信息已过期，请重新登录')
  }
  return Promise.reject(error)
})
export default myAxios
