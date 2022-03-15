import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getStorage, setStorage } from './storage';
import { ApiGetCookie } from '@/api/auth';

const useTools = <T = AxiosRequestConfig | AxiosResponse>(axios: AxiosInstance, types: 'request' | 'response', onFulfilled: (config: T) => T | Promise<T>, onRejected: (error: any) => any | Promise<any>) => {
  let stateNum: number | null = null;

  const getState = () => stateNum;

  const eject = () => {
    if (stateNum !== null) {
      axios.interceptors[types].eject(stateNum);
    }
  };

  const use = () => {
    if (stateNum !== null) {
      eject();
    }
    // @ts-ignore 类型已限定
    stateNum = axios.interceptors[types].use(onFulfilled, onRejected);
  };

  use();

  return { getState, use, eject };
};

/** 请求拦截器 */

const requestFulfilled = async (config: AxiosRequestConfig) => {
  if (!config.headers) config.headers = {};

  let csrfToken = getStorage('x-csrf-token');

  if (!csrfToken) {
    await ApiGetCookie().then(({ data: req }) => {
      if (req.code === 0) {
        setStorage('x-csrf-token', req.data);
        csrfToken = req.data;
      }
    });
  }

  config.headers['x-csrf-token'] = csrfToken;

  return config;
};

const requestRejected = (error: any) => {
  return Promise.reject(error);
};

/** 响应拦截器 */

const responseFulfilled = (config: AxiosResponse) => {
  return config;
};

const responseRejected = (error: any) => {
  return Promise.reject(error);
};

/** 实例 */
export const axios = Axios.create({
  method: 'GET',
  // baseURL: 'http://127.0.0.1:4564',
  timeout: 60 * 1000, // 60/s
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

// 请求拦截器
export const axiosRequest = useTools(axios, 'request', requestFulfilled, requestRejected);
// 响应拦截器

export const axiosResponse = useTools(axios, 'response', responseFulfilled, responseRejected);

export default axios;
