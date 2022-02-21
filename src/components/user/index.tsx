import * as React from 'react';
import { Dropdown, Menu, message } from 'antd';
import { observer } from 'mobx-react';
import { authStore } from '@stores';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants';
import { LogoutIcon, ProfileIcon } from '@assets/icons';
import { logout } from '@pages/login/services/auth';

const imageStyle = { width: '27px', height: '27px', marginRight: '8px', border: '1px solid #d8d8d8', borderRadius: '50%' };

export default observer(function User() {
  const { clear: clearAuth, username, userInfo } = authStore;
  const onLogout = () => {
    clearAuth();
    logout({ token: userInfo?.token }).then((res) => {
      message.warn('用户已注销');
    });
  };

  const userMenu = (
    <Menu>
      {/* <Menu.Item key='1'>
        <Link to={ROUTES.Profile.Info}>
          <ProfileIcon />
          <span> 个人中心</span>
        </Link>
      </Menu.Item> */}
      <Menu.Item key='2' onClick={onLogout}>
        <LogoutIcon />
        <span> 退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={userMenu} placement='bottomCenter'>
      <div data-cypress='user' style={{ cursor: 'pointer' }}>
        <img src={userInfo?.avatarUrl} alt='' style={imageStyle} />
        <span>{username}</span>
      </div>
    </Dropdown>
  );
});
