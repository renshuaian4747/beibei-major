import { $http } from '@utils';

export function getRankList(params: { token: string; deviceInfo?: string; pf?: string; version?: string; pageNum?: number; pageSize?: number }) {
  return $http.post('api/web/app-api/integral_list', params);
}
