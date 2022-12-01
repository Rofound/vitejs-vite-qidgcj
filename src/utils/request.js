import Axios from 'axios';
import cookie from 'js-cookie';
import { hasMobile } from './platform.js';

const axios = Axios.create({
  baseURL: `${process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_BASE_API}/p/webapi/request/0Z5jW9bqFEWha/`,
  timeout: 30000,
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },
});

axios.interceptors.request.use((config) => {
  config.data = config.data || {}
  if (config.data) {
    const data = config.data;
    console.log('isMobile', hasMobile());
    let token = hasMobile() ? cookie.get('mobile_token') : cookie.get('index_token');
    if (process.env.NODE_ENV === 'development') {
      token = '0Z1Z5IoQnSfIbeLfv2w0C3yXGavOjPuAfQos-6jIZ7G845kfY0AMOIzRnHbLe4Oaph5ebg-QBd4m1N2kDhPjO76wWgsElZmFzOQj';
      token = '0Z1ZZoYxd9ZlFOKb-ZG4XHIFbVjJq2mXFL1i-6jIZ7G845kfY0AMOIzRnHbLe4Oaph5ebg-QBd4m1N2a0qL9BQ_t9toMQ-2O-um8';
      token = 'MTMyMDMyMDU5MjIsYWE=';
    }
    data.token = token;
    config.data = data;
  }
  return config;
});

axios.interceptors.request.use((config) => {
  if (config.appId) {
    config.baseURL = `${process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_BASE_API}/p/webapi/request/${config.appId}/`
  }
  return config;
});

// 响应拦截器
// axios.interceptors.response.use(
//   (response) => {
//     const { status, data = {} } = response;
//     if (status === 200) {
//       if (data.errorCode !== '0') {
//         // window.app.notify(data.errorMessage, 'danger');
//         return Promise.reject(data.data);
//       }
//       return data.data;
//     }
//     // window.app.notify('网络错误', 'danger');
//     return Promise.reject(data);
//   },
//   // eslint-disable-next-line prefer-promise-reject-errors
//   () => Promise.reject('未知错误'),
// );

export const http = axios;

// withOutToken：是否将token作为arg0
export const invokeWait = function (func, args = [], withOutToken = false) {
  const data = new FormData();
  if (!withOutToken) {
      let token = hasMobile() ? cookie.get('mobile_token') : cookie.get('index_token');
      if (process.env.NODE_ENV === 'development') {
        token = '0Z1ZkIGeGPUjKUOU9qT5z5oKBj0TTJ7hVZaH_EA4ww7-IfsPYP1roKaR5Zdz_lDENdF8bm3g6otpVmRUzhlXL-WyjLSFkzR5x7MT';
      }
      data.append('arg0', JSON.stringify(token));
  }
  for (let i = 0; i < args.length; i++) {
      data.append('arg' + (i + (withOutToken ? 0 : 1)), JSON.stringify(args[i]));
  }
  return Axios.request({
      url: `/p/api/invoke/${func}`,
      method: 'post',
      data
  });
}

export const request = axios;
