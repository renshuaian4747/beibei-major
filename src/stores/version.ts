import { $storage, isProduction } from '@utils';
import { makeAutoObservable, runInAction } from 'mobx';
import { getVersion } from '@services/version';
import { message } from 'antd';
import { debounce } from 'lodash-es';

class VersionStore {
  currentVersion = $storage.version;
  latestVersion = $storage.version;

  get outdate() {
    if (this.currentVersion.CI_COMMIT_SHA && this.latestVersion.CI_COMMIT_SHA) {
      return this.currentVersion.CI_COMMIT_SHA !== this.latestVersion.CI_COMMIT_SHA;
    }
    return false;
  }

  constructor() {
    makeAutoObservable(this);
  }

  initCurrentVersion = () => {
    getVersion()
      .then((version) => {
        runInAction(() => {
          this.currentVersion = version;
          $storage.version = version;
        });
      })
      .catch(() => {
        message.error('服务暂时不可用，请稍后再试');
      });
  };

  checkForUpdate = debounce(() => {
    getVersion()
      .then((version) => {
        runInAction(() => {
          this.latestVersion = version;
        });
      })
      .catch(() => {
        message.error('服务暂时不可用，请稍后再试');
      });
  }, 200);
}

export const versionStore = new VersionStore();
