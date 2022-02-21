// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ISafeAny = any;

declare module '*.svg' {
  const content: ISafeAny;
  export = content;
}

declare module '*.module.less' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

interface Window {
  _STORES: ISafeAny;
  _BUILD_INFO: {
    VERSION: string;
    CI_COMMIT_SHA: string;
    CI_BUILD_TIME: string;
  };
}

interface IConfig {
  sentry_enabled?: boolean;
  sentry_dsn?: string;
  system_name_visible: boolean;
  system_name: string;
  copyright_visible: boolean;
  login_descriptions_visible: boolean;
  login_descriptions: string[];
  stylesheet: string;
  small_logo_visible: boolean;
  small_logo_dark_visible: boolean;
  large_logo_visible: boolean;
  large_logo_dark_visible: boolean;
  small_logo: string;
  small_logo_dark: string;
  large_logo: string;
  large_logo_dark: string;
  login_background_visible: boolean;
  login_background: string;
}

interface IResponse<T> {
  code: string;
  msg: string;
  data: T;
}

interface IResponseList<T> {
  code: string;
  msg: string;
  data: {
    items: T[];
    total: number;
  };
}

interface IFilter {
  [prop: string]: string | number | string[] | number[];
}

interface IOption {
  label: string;
  value: string | number;
}

interface IBreadcrumbObject {
  link?: string;
  title: string;
}

type IBreadcrumb = string | IBreadcrumbObject;

interface IVersion {
  VERSION: string;
  CI_BUILD_TIME: string;
  CI_COMMIT_SHA: string;
}
