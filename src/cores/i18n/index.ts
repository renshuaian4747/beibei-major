import { LANG } from '@constants';
import { $storage } from '@utils';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN_US from './en-us.json';
import ZH_CN from './zh-cn.json';

i18n.use(initReactI18next).init({
  resources: {
    [LANG.zh]: {
      translation: ZH_CN
    },
    [LANG.en]: {
      translation: EN_US
    }
  },
  lng: LANG.zh,
  fallbackLng: LANG.zh,
  interpolation: {
    escapeValue: false
  }
});

i18n.changeLanguage($storage.lang);

export { i18n };
