import { breadcrumbStore } from '@stores';
import { useMount, useUnmount } from 'ahooks';
import { isString, last, map, get } from 'lodash-es';
import { useTitle } from './title';

function makeBreadcrumbs(breadcrumbs: IBreadcrumb[]): IBreadcrumbObject[] {
  return map(breadcrumbs, (b) => {
    if (isString(b)) {
      return {
        title: b
      };
    }
    return b;
  });
}

export function useBreadcrumbs(newBreadcrumbs: IBreadcrumb[]) {
  const { setBreadcrumbs } = breadcrumbStore;
  const _newBreadcrumbs = makeBreadcrumbs(newBreadcrumbs);
  const lastTitle = get(last(_newBreadcrumbs), 'title', '');
  useTitle(lastTitle);
  useMount(() => {
    setBreadcrumbs(_newBreadcrumbs);
  });
  useUnmount(() => {
    setBreadcrumbs([]);
  });
}
