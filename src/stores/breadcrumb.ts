import { makeAutoObservable } from 'mobx';
import { isEqual } from 'lodash-es';

class BreadcrumbStore {
  breadcrumbs: IBreadcrumbObject[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setBreadcrumbs = (breadcrumbs: IBreadcrumbObject[]) => {
    if (isEqual(breadcrumbs, this.breadcrumbs)) return;
    this.breadcrumbs = breadcrumbs;
  };
}

export const breadcrumbStore = new BreadcrumbStore();
