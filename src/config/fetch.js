/**
 * 封装axios请求
 */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { baseUrl } from '../config/index'

Vue.use(VueAxios, axios)
const mainAxios = axios.create({
  baseURL: baseUrl,
  timeout: 30 * 1000
})

export default function fetch (url = '', {
  method = 'get',
  params,
  data,
  baseURL = baseUrl,
  timeout = 30000,
  responseType = 'json',
  cancelToken, // 取消请求的token
  resolve, // 请求成功回调函数,参数包含所有响应信息,如data，status，statusText，headers，config，参考axios响应结构
  reject // 请求失败回调
} = {}) {
  return mainAxios({
    url,
    baseURL,
    method,
    params,
    data,
    timeout,
    responseType,
    cancelToken
  }).then((response) => {
    if (resolve) {
      resolve(response)
    }
    return response.data // 返回给后续then做参数
  }, (error) => {
    if (reject) {
      reject(error)
    }
    return error
  })
}
/**
 * 获取取消请求的token
 * exp:
 * let token = cancelToken()
 * fetch('url', {cancelToken: token}) -- 请求url
 * token() -- 取消上边的请求
 */
let CancelToken = axios.CancelToken

function cancelToken () {
  return CancelToken.source()
}

export { axios, mainAxios, cancelToken }
