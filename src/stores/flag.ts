import { makeAutoObservable, toJS } from 'mobx';
import { $storage } from '@utils/storage';
import { cloneDeep } from 'lodash-es';

export type FlagKeys = 'list_basic_1' | 'list_tab_1' | 'list_tab_2';

class FlagStore {
  flags = $storage.flags || {};

  constructor() {
    makeAutoObservable(this);
  }

  getFlag = (key: FlagKeys) => {
    return this.flags[key] ?? true;
  };

  toggleFlag = (key: FlagKeys) => {
    const flags = cloneDeep(toJS(this.flags));
    flags[key] = !this.getFlag(key);
    this.flags = flags;
    $storage.flags = flags;
  };
}

export const flagStore = new FlagStore();
