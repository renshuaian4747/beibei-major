import dayjs from 'dayjs';
import { LOCALES } from '@constants';
import { $storage } from './storage';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

dayjs.locale(LOCALES.dayjs[$storage.lang]);

export { dayjs };
