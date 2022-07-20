'use strict'
import axios from 'axios'

const config = {
  baseURL: '',
  timeout: 50000
}
const instance = axios.create(config)
// axios拦截器，拦截发起请求前操作
instance.interceptors.request.use(
  config => {
    // 设置GET请求随机数
    if (config.method === 'get') {
      config.params = { ...config.params }
      config.params['v'] = new Date().getTime()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// axios拦截器，拦截发起返回前操作
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
