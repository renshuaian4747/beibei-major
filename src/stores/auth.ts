import { LoginRes } from '@models';
import { $storage } from '@utils';
import { makeAutoObservable } from 'mobx';

class AuthStore {
  username = $storage.username;
  token = $storage.token;
  userInfo = $storage.userInfo;
  leagueList = $storage.leagueList;
  defaultLegendId: number = $storage.defaultLegendId;

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username: string) {
    this.username = username;
    $storage.username = username;
  }

  setToken(token: string) {
    this.token = token;
    $storage.token = token;
  }

  setUserInfo(userInfo: LoginRes | null) {
    this.userInfo = userInfo;
    $storage.userInfo = userInfo;
  }

  setLegendId(v: number) {
    this.defaultLegendId = v;
    $storage.defaultLegendId = v;
  }

  setLeagueList(v: { name: string; id: number }[]) {
    this.leagueList = v;
    $storage.leagueList = v;
  }

  clear = () => {
    this.setToken('');
    this.setUsername('');
    this.setUserInfo(null);
  };
}

export const authStore = new AuthStore();
