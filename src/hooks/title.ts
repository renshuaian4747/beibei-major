import { configStore } from '@stores';
import { useTitle as useATitle } from 'ahooks';

export function useTitle(title: string) {
  const system_name = configStore.config.system_name;
  const system_name_visible = configStore.config.system_name_visible;
  const name = system_name_visible ? system_name : '';
  const _title = title && name ? `${title}-${name}` : title ? title : name ? name : '';

  useATitle(_title, {
    restoreOnUnmount: true
  });
}
