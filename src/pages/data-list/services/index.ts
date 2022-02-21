import { $http } from '@utils';

export function getDataList(params: {
  token: string;
  leagueId?: number;
  deviceInfo?: string;
  pf?: string;
  version?: string;
  pageNum?: number;
  pageSize?: number;
}) {
  return $http.post('api/web/app-api/rank_list', params);
}
