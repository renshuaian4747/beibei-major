import React, { useEffect } from 'react';
import { IfElse, SafeContainer } from '@bixi-design/core';
import { HashRouter, Route, Switch, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { Provider as StoreProvider, observer } from 'mobx-react';
import { authStore, configStore, STORES, versionStore } from '@stores';
import { Alert, Button, ConfigProvider } from 'antd';
import { ROUTES, LOCALES } from '@constants';
import { DefaultLayout } from '@layouts';
import loadable from '@loadable/component';
import LoginPage from './login';

const PrivateRoute = observer(function PrivateRoute(props: RouteProps & { layout: ISafeAny }) {
  const authenticated = !!authStore.token;
  const { component: Component, layout: Layout, ...rest } = props;
  if (authenticated)
    return (
      <Route
        {...rest}
        render={() => {
          return <Layout>{React.createElement(Component!, rest)}</Layout>;
        }}
      />
    );
  return <Redirect to={ROUTES.Login} />;
});

const Routes = () => {
  const location = useLocation();

  useEffect(() => {
    versionStore.checkForUpdate();
  }, [location]);

  return (
    <Switch>
      <Route path={ROUTES.Login} exact component={LoginPage}></Route>
      <PrivateRoute layout={DefaultLayout} path={ROUTES.Profile.Root} component={loadable(() => import('./profile'))}></PrivateRoute>
      <PrivateRoute layout={DefaultLayout} path={ROUTES.Rank.Root} component={loadable(() => import('./rank-list'))}></PrivateRoute>
      <PrivateRoute layout={DefaultLayout} path={ROUTES.Data.Root} component={loadable(() => import('./data-list'))}></PrivateRoute>
      <PrivateRoute layout={DefaultLayout} path={ROUTES.Record.Root} component={loadable(() => import('./record-list'))}></PrivateRoute>
      <Redirect to={ROUTES.Profile.Root} />
    </Switch>
  );
};

const Root = observer(function Root() {
  const { lang } = configStore;
  const locale = LOCALES.antd[lang];
  const { outdate } = versionStore;

  const onUpdate = () => {
    location.reload();
  };

  return (
    <SafeContainer>
      <IfElse if={outdate}>
        <Alert
          style={{ borderRadius: 0 }}
          message='当前存在可用更新'
          type='warning'
          showIcon
          action={
            <Button size='small' type='link' onClick={onUpdate}>
              立即更新
            </Button>
          }
        />
      </IfElse>
      <StoreProvider {...STORES}>
        <ConfigProvider locale={locale} input={{ autoComplete: 'off' }}>
          <HashRouter>
            <Routes />
          </HashRouter>
        </ConfigProvider>
      </StoreProvider>
    </SafeContainer>
  );
});

export default Root;
