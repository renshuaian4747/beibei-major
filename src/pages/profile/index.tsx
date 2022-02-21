import React from 'react';
import { Menu, Layout } from 'antd';
import { Route, Redirect, useHistory, useLocation, Switch } from 'react-router-dom';
import { ROUTES } from '@constants';
import { InfoPage } from './pages';
import { PageContainer } from '@bixi-design/core';

const { Content, Sider } = Layout;

export default function ProfilePage() {
  const history = useHistory();
  const location = useLocation();
  const selectKeys = location.pathname === ROUTES.Profile.Info ? ['1'] : ['2'];

  return (
    <PageContainer autoHeight={false}>
      <Layout>
        <Sider>
          <Menu style={{ width: 201 }} theme='light' mode='inline' selectedKeys={selectKeys}>
            <Menu.Item key='1' onClick={() => history.replace(ROUTES.Profile.Info)}>
              个人信息
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ paddingLeft: '16px' }}>
          <Switch>
            <Route path={ROUTES.Profile.Info} component={InfoPage} />
            <Redirect to={ROUTES.Profile.Info} />
          </Switch>
        </Content>
      </Layout>
    </PageContainer>
  );
}
