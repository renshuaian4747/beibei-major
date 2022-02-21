import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';

export const ROUTES = {
  Root: '/',
  Login: '/login',
  Profile: {
    Root: '/profile',
    Info: '/profile/info'
  },
  Rank: {
    Root: '/rank-list'
  },
  Data: {
    Root: '/data-list'
  },
  Record: {
    Root: '/record-list'
  }
};

export enum LANG {
  zh = 'ZH_CN',
  en = 'EN_US'
}

export const LOCALES = {
  antd: {
    [LANG.zh]: zhCN,
    [LANG.en]: enUS
  },
  dayjs: {
    [LANG.zh]: 'zh-cn',
    [LANG.en]: 'en'
  }
};

export const USE_PROGRESS = 'Use-Progress';
export const YES = 'YES';
export const NO = 'NO';
export const ALL = '__ALL';

export const DEFAULT_CONFIG: IConfig = {
  sentry_enabled: false,
  system_name_visible: true,
  system_name: '贝贝Major',
  copyright_visible: true,
  login_background_visible: true,
  login_background: './assets/images/login_background.png',
  login_descriptions_visible: true,
  login_descriptions: [
    '提供全面的搜索服务，支持人工干预，覆盖多种搜索需求场景',
    '支持可视化流程配置，内置专业算法，更快速地上线搜索引擎',
    '搜索排序效果随用户行为自动优化',
    '可视化的知识卡片，搜索结果更直观',
    '运用知识图谱技术，实现可视化关联呈现和智能化搜索查询'
  ],
  stylesheet: 'body { background: #fff }',
  small_logo_visible: true,
  small_logo_dark_visible: true,
  large_logo_visible: true,
  large_logo_dark_visible: true,
  small_logo: './assets/images/small_logo.svg',
  small_logo_dark: './assets/images/small_logo_dark.svg',
  large_logo: './assets/images/large_logo.svg',
  large_logo_dark: './assets/images/large_logo_dark.svg'
};
