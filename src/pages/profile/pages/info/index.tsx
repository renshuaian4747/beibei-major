import { UserOutlined } from '@ant-design/icons';
import { useBreadcrumbs } from '@hooks';
import { useMount } from 'ahooks';
import { login } from '@pages/login/services/auth';
import { addDoubleIntegral } from '@pages/profile/services';
import { authStore } from '@stores';
import { Card, Form, Avatar, Divider, Button, message, Tag } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import S from './index.module.less';
import CryptoJs from 'crypto-js';

export default observer(function InfoPage() {
  const { username, userInfo } = authStore;
  const [loading, setLoading] = useState(false);
  useBreadcrumbs(['个人中心', '个人信息']);

  useMount(() => {
    updateUserInfo();
  });

  const makeDouble = () => {
    if (!userInfo?.doubleCount) {
      message.error('当前无双倍次数可用');
      return;
    }
    setLoading(true);
    addDoubleIntegral({ token: userInfo?.token as string }).then((res) => {
      setLoading(false);
      updateUserInfo();
      if (res.data.code !== 200) {
        message.warning(res.data.msg);
        return;
      }
      message.success('已启用双倍积分');
    });
  };

  const updateUserInfo = () => {
    login({
      account: username!,
      password: CryptoJs.MD5('123456').toString()!
    })
      .then((res) => {
        authStore.setUserInfo(res);
        authStore.setToken(res.token);
        authStore.setUsername(username);
      })
      .catch(console.error);
  };

  const levelTag = () => {
    const tagStyle = { color: '#fff', marginLeft: 12 };
    const rank = userInfo?.rank || 1000;
    if (rank <= 5) {
      return (
        <Tag style={tagStyle} color='#f50'>
          特等马
        </Tag>
      );
    } else if (rank <= 10) {
      return (
        <Tag style={tagStyle} color='#f50'>
          特等马
        </Tag>
      );
    } else if (rank <= 15) {
      return (
        <Tag style={tagStyle} color='#87d068'>
          中等马
        </Tag>
      );
    }
    return (
      <Tag color='#108ee9' style={tagStyle}>
        下等马
      </Tag>
    );
  };

  return (
    <Card title='个人信息'>
      <div className={S['info-container']}>
        <Avatar className={S['user-avatar']} size={128} icon={<UserOutlined />} src={userInfo?.avatarUrl} />
        <Divider className={S['divider']} type='vertical' />
        <div className={S['form-container']}>
          <Form.Item label='用户名称'>
            {username}
            {levelTag()}
          </Form.Item>
          <Form.Item label='胜率'>{userInfo?.winRate}%</Form.Item>
          <Form.Item label='积分'>{userInfo?.integral}</Form.Item>
          <Form.Item label='排名'>{userInfo?.rank}</Form.Item>
          <Form.Item label='当前双倍次数'>{userInfo?.doubleCount}</Form.Item>
          <Button disabled={userInfo?.isDouble} type='primary' loading={loading} onClick={makeDouble}>
            {userInfo?.isDouble ? '今日已双倍' : '我要双倍'}
          </Button>
        </div>
      </div>
    </Card>
  );
});
