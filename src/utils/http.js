import axios from 'axios'
import store from '@/store'
import * as loginAuth from './session';
import * as tools from './tools'

const http = axios.create({
  baseURL: '',
  timeout: 30000
})

// request 拦截器
http.interceptors.request.use(
  config => {
    // if (store.getters.userInfo.token) {
    //   config.headers['eden-token'] = getSession()
    // }


    // let sessionId = loginAuth.getSessionId();
    // if (sessionId) {
    //   let session = loginAuth.getSession();
    //   if (session) {
    //     let userInfo = JSON.parse(session);
    //     // 为请求附加sessionId和loginUser
    //     if (config.method.toLowerCase() === 'get') {
    //       if (config.url.indexOf('?') < 0) {
    //         config.url += '?';
    //       } else {
    //         config.url += '&';
    //       }
    //       config.url += 'sessionId=' + sessionId + '&loginUserId=' + userInfo.userId + '&loginUserName=' + userInfo.userName;
    //     } else if (config.method.toLowerCase() === 'post') {
    //       let data = config.data;
    //       if (data != null) {
    //         data.sessionId = sessionId;
    //         data.loginUserId = userInfo.userId;
    //         data.loginUserName = userInfo.userName;
    //       } else {
    //         data = {
    //           sessionId: sessionId,
    //           loginUserId: userInfo.userId,
    //           loginUserName: userInfo.userName
    //         };
    //       }
    //       config.data = data;
    //     }
    //   }
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// respone 拦截器
http.interceptors.response.use(
  response => {
    const res = response.data
    if (res.error) {
      tools.notify({
        type: 'error',
        message: res.error.message
      })
      if (res.code === '') {
        // 接口自定义错误代码
        // 移除登陆token 显示接口错误消息
      }
      return Promise.reject(res)
    }
    return Promise.resolve(res)
  },
  error => {
    tools.notify({
      type: 'error',
      message: error.message,
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default http
