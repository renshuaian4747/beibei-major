import axios from 'axios';
import { get } from 'lodash-es';

export async function getVersion(): Promise<IVersion> {
  const res = await axios.get('./assets/version.json', {
    params: {
      timestamp: new Date().getTime()
    }
  });
  return get(res, 'data', {});
}
