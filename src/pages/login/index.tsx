import React from 'react';
import { observer } from 'mobx-react';
import {
  LoginLayout,
  LoginLayoutFooter,
  LoginLayoutHeader,
  LoginLayoutSlogan,
  LoginLayoutForm,
  ILoginLayoutFormParams,
  ILoginLayoutFooterLink
} from '@bixi-design/layouts';
import { authStore, configStore } from '@stores';
import { useBreadcrumbs } from '@hooks';
import { $storage } from '@utils';
import { login } from './services/auth';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '@constants';
import CryptoJs from 'crypto-js';

const LoginPage = observer(function LoginPage() {
  useBreadcrumbs(['登录']);
  const history = useHistory();
  const defaultRemember = $storage.rememberAccount;
  const defaultUsername = defaultRemember ? $storage.lastLoginAccount : undefined;
  const {
    login_descriptions_visible,
    login_descriptions,
    system_name,
    system_name_visible,
    login_background,
    login_background_visible,
    copyright_visible,
    large_logo_dark,
    large_logo_dark_visible
  } = configStore.config;
  const background = login_background_visible ? login_background : '';
  const title = system_name_visible ? system_name : '';

  // const slogan = login_descriptions_visible ? <LoginLayoutSlogan descriptions={login_descriptions} title={title} /> : null;
  const slogan = null;
  const footer = null;
  // const footer = copyright_visible ? <LoginLayoutFooter links={links} copyright={copyright} /> : null;
  const header = large_logo_dark_visible ? <LoginLayoutHeader logo={large_logo_dark} /> : null;

  const onLogin = (params: ILoginLayoutFormParams) => {
    const { remember = true, username, password } = params as Required<ILoginLayoutFormParams>;

    login({
      account: username!,
      password: CryptoJs.MD5(password).toString()!
    })
      .then((res) => {
        authStore.setUserInfo(res);
        $storage.rememberAccount = remember;
        if (remember) {
          $storage.lastLoginAccount = username;
        } else {
          $storage.lastLoginAccount = '';
        }
        authStore.setToken(res.token);
        authStore.setUsername(username);
        history.replace(ROUTES.Profile.Info);
      })
      .catch(console.error);
  };

  return (
    <LoginLayout background={background} header={header} footer={footer} slogan={slogan}>
      <LoginLayoutForm defaultRemember={defaultRemember} defaultUsername={defaultUsername} onLogin={onLogin} />
    </LoginLayout>
  );
});

export default React.memo(LoginPage);
