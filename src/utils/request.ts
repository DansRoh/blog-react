import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // API 的基础URL
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 例如：添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error('请求错误：', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    const res = response.data;
    // 这里可以根据后端的数据结构进行相应的处理
    if (res.code !== 0) {
      message.error(res.message);
      throw new Error(res.message)
    }
    return res.data;
  },
  (error) => {
    // 处理响应错误
    console.error('响应错误：', error);
    return Promise.reject(error);
  }
);

// 封装请求方法
export const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await service(config);
    return response as T;
  } catch (error) {
    throw new Error('error' + error)
  }
};

// 导出便捷方法
export const get = <T = any>(url: string, params?: any) =>
  request<T>({ method: 'GET', url, params });

export const post = <T = any>(url: string, data?: any) =>
  request<T>({ method: 'POST', url, data });

export const put = <T = any>(url: string, data?: any) =>
  request<T>({ method: 'PUT', url, data });

export const del = <T = any>(url: string, params?: any) =>
  request<T>({ method: 'DELETE', url, params });

export const patch = <T = any>(url: string, params?: any) =>
  request<T>({ method: 'PATCH', url, params });