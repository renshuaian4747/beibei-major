import { configStore } from './config';
import { authStore } from './auth';
import { breadcrumbStore } from './breadcrumb';
import { flagStore } from './flag';
import { versionStore } from './version';

export const STORES = {
  configStore,
  authStore,
  breadcrumbStore,
  flagStore,
  versionStore
};

export { configStore, authStore, breadcrumbStore, flagStore, versionStore };
