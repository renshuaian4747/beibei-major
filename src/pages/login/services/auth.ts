import { LoginRes } from '@models';
import { $http } from '@utils/http';

export async function login(params: ISafeAny) {
  const res = await $http.post<IResponse<LoginRes>>('api/web/app-api/login', params);
  return res.data.data;
}

export async function logout(params: ISafeAny) {
  const res = await $http.post<IResponse<LoginRes>>('api/web/app-api/login_out', params);
  return res.data.data;
}
