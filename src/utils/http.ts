import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message as antdMessage } from 'antd';
import { cloneDeep, get, isNumber, isString } from 'lodash-es';
import { progress } from '@bixi-design/core';
import { USE_PROGRESS, NO } from '@constants';
import { $storage } from './storage';
import qs from 'qs';

function createHttp() {
  const client = axios.create({
    timeout: 1000 * 60 * 10,
    headers: {}
  });

  client.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config.headers[USE_PROGRESS] !== NO) {
      progress.start();
      delete config.headers[USE_PROGRESS];
    }
    const conf = cloneDeep(config);
    conf.url = `${process.env.API_URL}${conf.url}`;
    const token = $storage.token;

    if (token) {
      conf.headers = {
        ...conf.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      };
    }
    conf.data = qs.stringify(conf.data); // 转为formdata数据格式
    return conf;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      progress.done();
      const { data = {}, config = {} } = response;
      const { url, method } = config;
      const { status, message } = data;
      if (isNumber(status) && status !== 200) {
        const _res = {
          url,
          method,
          status,
          message
        };
        if (message && isString(message)) {
          antdMessage.error(message);
        }
        return Promise.reject(_res);
      }
      return response;
    },
    (error: AxiosError) => {
      progress.done();
      if (get(error, 'response.status') === 401) {
        window._STORES.authStore.clear();
        return;
      }
      const message = get(error, 'response.data.message', '');
      if (message && isString(message)) {
        antdMessage.error(message);
      }
      return Promise.reject(error);
    }
  );
  return client;
}

const $http = createHttp();

export { $http };
