import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getStorage, setStorage } from './storage';
import { ApiGetCookie } from '@/api/auth';
import { mergeConfig } from '@u/object';

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

  const neglectSync = async (func: () => Promise<any>): Promise<any> => {
    eject();
    const response = await func();
    use();
    return response;
  };

  const neglect = (func: () => void) => {
    eject();
    func();
    use();
  };

  use();

  return { getState, use, eject, neglect, neglectSync };
};

/** 请求拦截器 */
interface CustomConfig {
  headers: { [key: string]: string };
  __retry_time: number; // 重试延迟
  __retry_count: number; // 重试次数
  __retry_max: number; // 重试最大数
}

const csrfTokenName = 'csrf-token';

const requestFulfilled = async (config: AxiosRequestConfig & CustomConfig) => {
  mergeConfig(config, { __retry_max: 3, __retry_count: 0, __retry_time: 1000 });

  let csrfToken = getStorage(csrfTokenName);

  if (!csrfToken) {
    axiosRequest.neglectSync(ApiGetCookie).then(({ data: req }) => {
      if (req.code === 0) {
        setStorage(csrfTokenName, req.data);
        csrfToken = req.data;
      }
    });
  }

  config.headers[csrfTokenName] = csrfToken;

  return config;
};

const requestRejected = (error: any) => {
  console.log('requestRejected ->>', error);
  return Promise.reject(error);
};

/** 响应拦截器 */
declare enum StatusCode {
  csrfToken = 403
}

const responseFulfilled = (config: AxiosResponse) => {
  console.log('responseFulfilled ->>', config);
  return config;
};

const responseRejected = (error: any) => {
  if (error.response) {
    console.log(error.response.status, StatusCode.csrfToken);
    if (error.response.status === StatusCode.csrfToken) {
      return Promise.reject(error);
    }
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }

  /** 在上面写业务逻辑 */
  const { url, __retry_max, __retry_count, __retry_time } = error.config;

  if (__retry_max < __retry_count) return Promise.reject(error);

  error.config.__retry_count = __retry_count + 1;

  return new Promise(resolve => setTimeout(resolve, __retry_time)).then(() => {
    console.log('[%s]\t[retry: %s\s/\s%s]\t href: %s', new Date(), __retry_count, __retry_max, url);
    return axios(error.config);
  });
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
