import React from 'react';
import * as ReactDOM from 'react-dom';
import { dayjs } from '@utils/day';
import { configStore, STORES, versionStore } from '@stores';
import Root from './pages/root';
import './cores/i18n';
import './styles/global.less';

ReactDOM.render(<Root />, document.getElementById('root'));

window._STORES = STORES;

window._BUILD_INFO = {
  VERSION: process.env.VERSION!,
  CI_COMMIT_SHA: process.env.CI_COMMIT_SHA!,
  CI_BUILD_TIME: dayjs(new Date(process.env.CI_BUILD_TIME!)).format('YYYY-MM-DD HH:mm:ss')
};

configStore.initConfig();
versionStore.initCurrentVersion();

console.log('BUILD INFO', window._BUILD_INFO);

window.addEventListener('unhandledrejection', (error) => {
  console.error('捕获到异步异常', error);
  versionStore.checkForUpdate();
});

window.addEventListener(
  'error',
  (error) => {
    console.error('捕获到异常', error);
    versionStore.checkForUpdate();
  },
  true
);
