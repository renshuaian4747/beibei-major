import { $http } from '@utils';

export function getRecordList(params: {
  token: string;
  userId?: number;
  leagueId?: number;
  deviceInfo?: string;
  pf?: string;
  version?: string;
  pageNum?: number;
  pageSize?: number;
}) {
  return $http.post('api/web/app-api/record_list', params);
}
