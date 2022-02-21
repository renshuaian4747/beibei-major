import { $http } from '@utils';

export function addDoubleIntegral(params: { token: string; deviceInfo?: string; pf?: string; version?: string }) {
  return $http.post('api/web/app-api/add_double_integral', params);
}
