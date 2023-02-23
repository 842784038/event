import request from '@/utils/request'
import store from '@/store'
export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}
export const loginAPI = ({ username, password }) => {
  return request({
    url: 'api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
export const getUserInFoAPI = () => {
  return request({
    url: 'my/userinfo',
    headers: {
      Authorization: store.state.token
    }
  })
}
export const getMenusListAPI = () => {
  return request({
    url: 'my/menus',
    headers: {
      Authorization: store.state.token
    }
  })
}
