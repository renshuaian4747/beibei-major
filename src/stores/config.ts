import { $storage, dayjs, isProduction } from '@utils';
import { makeAutoObservable } from 'mobx';
import { i18n } from '@cores/i18n';
import { LANG, LOCALES } from '@constants';
import { getConfig, mergeConfig } from '@services/config';
import { loadSentry } from '@monitors';
import { insertStylesheet } from '@bixi-design/utils';

class ConfigStore {
  lang: LANG = $storage.lang;
  config: IConfig = mergeConfig($storage.config);

  constructor() {
    makeAutoObservable(this);
  }

  setLang(lang: LANG) {
    $storage.lang = lang;
    this.lang = lang;
    i18n.changeLanguage(lang);
    dayjs.locale(LOCALES.dayjs[lang]);
  }

  toggleLang() {
    this.setLang(this.lang === LANG.zh ? LANG.en : LANG.zh);
  }

  setConfig(config: IConfig) {
    this.config = config;
  }

  initConfig() {
    getConfig()
      .then((config) => {
        this.setConfig(config);
        const { small_logo_visible, small_logo, stylesheet, sentry_dsn, sentry_enabled } = config;
        // icon
        const icon = document.querySelector('link[rel="icon"]') as ISafeAny;
        if (icon && small_logo_visible) {
          icon.href = small_logo;
        } else {
          icon.href = '';
        }
        // style
        if (stylesheet) {
          insertStylesheet(stylesheet);
        }
        // sentry
        if (isProduction() && sentry_enabled && sentry_dsn) {
          loadSentry(sentry_dsn, process.env.CI_COMMIT_SHA!);
        }
      })
      .catch((err) => {
        console.error('获取系统配置失败', err);
      });
  }
}

export const configStore = new ConfigStore();
