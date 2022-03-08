import { LoginRes } from './../models/index';
import { LANG } from '@constants';
import { isNil } from 'lodash-es';

function formatKey(key: string) {
  return `beibei_${key}`.toUpperCase();
}

function getItem(key: string) {
  const str = localStorage.getItem(formatKey(key)) as string;
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

function removeItem(key: string) {
  localStorage.removeItem(formatKey(key));
}

function setItem(key: string, data: ISafeAny) {
  localStorage.setItem(formatKey(key), JSON.stringify(data));
}

const $storage = {
  get lang(): LANG {
    const l = getItem('lang');
    return [LANG.en, LANG.zh].includes(l) ? l : LANG.zh;
  },
  set lang(data: LANG) {
    setItem('lang', data);
  },
  get token() {
    return getItem('token') || '';
  },
  set token(data: string) {
    setItem('token', data);
  },
  get username() {
    return getItem('username') || '';
  },
  set username(data: string) {
    setItem('username', data);
  },
  get config() {
    return getItem('config') || {};
  },
  set config(value: IConfig) {
    setItem('config', value);
  },
  get rememberAccount() {
    const remember = getItem('remember_account');
    return isNil(remember) ? true : remember;
  },
  set rememberAccount(value: boolean) {
    setItem('remember_account', value);
  },
  get lastLoginAccount() {
    return getItem('last_login_account') || '';
  },
  set lastLoginAccount(value: string) {
    setItem('last_login_account', value);
  },
  get flags() {
    return getItem('flags') || {};
  },
  set flags(value) {
    setItem('flags', value);
  },
  get version() {
    return (getItem('version') || {}) as IVersion;
  },
  set version(value: IVersion) {
    setItem('version', value);
  },
  get userInfo() {
    return (getItem('userInfo') || {}) as LoginRes;
  },
  set userInfo(value: LoginRes | null) {
    setItem('userInfo', value);
  },
  get defaultLegendId() {
    return (getItem('defaultLegendId') || 0) as number;
  },
  set defaultLegendId(value: number) {
    setItem('defaultLegendId', value);
  },
  get leagueList() {
    return (getItem('leagueList') || 0) as [];
  },
  set leagueList(value: { name: string; id: number }[]) {
    setItem('leagueList', value);
  },
  clear() {
    removeItem('token');
    removeItem('username');
  }
};
export { $storage };
