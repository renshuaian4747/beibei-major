import { useTranslation } from 'react-i18next';
export * from './title';
export * from './breadcrumb';

export function useI18n() {
  const { t } = useTranslation();
  return t;
}
