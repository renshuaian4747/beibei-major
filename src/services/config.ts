import { DEFAULT_CONFIG } from '@constants';
import axios from 'axios';
import { cloneDeep, get, isArray, mergeWith } from 'lodash-es';

export async function getConfig(): Promise<IConfig> {
  const res = await axios.get('./assets/config.json');
  const data = get(res, 'data', {});
  return mergeConfig(data);
}

export function mergeConfig(appearance: Partial<IConfig>) {
  return mergeWith(cloneDeep(DEFAULT_CONFIG), appearance, (a, b) => {
    // do not merge array
    if (isArray(a) && isArray(b)) return b;
  }) as IConfig;
}
