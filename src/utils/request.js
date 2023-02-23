import store from '@/store'
import axiox from 'axios'
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
export default myAxios
