import { UserOutlined } from '@ant-design/icons';
import { useBreadcrumbs } from '@hooks';
import { useMount } from 'ahooks';
import { addDoubleIntegral, getUserInfo } from '@pages/profile/services';
import { authStore } from '@stores';
import { Card, Form, Avatar, Divider, Button, message, Tag } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import S from './index.module.less';
import { $storage } from '@utils/storage';
import { RADER_DEFAULT_OPTION } from '@pages/profile/constants';
import { RadarChart } from 'echarts/charts';
import { use } from 'echarts/core';
import { Base, ERadarOption } from '@bixi-design/charts';

use(RadarChart);

export default observer(function InfoPage() {
  const { username, userInfo } = authStore;
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(RADER_DEFAULT_OPTION);
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
    addDoubleIntegral({ token: $storage.token }).then((res) => {
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
    getUserInfo({
      token: $storage.token
    })
      .then((res) => {
        authStore.setUserInfo({ ...res.data.data, token: $storage.token });
        const indicator: { name: string; max: number }[] = [];
        const values: number[] = [];
        const options = JSON.parse(JSON.stringify(RADER_DEFAULT_OPTION));
        res.data.data.recentPerformList.forEach((item: { text: string; value: string; max: string }) => {
          indicator.push({ name: item.text, max: Number(item.max) });
          values.push(Number(item.value));
        });
        options.radar.indicator = indicator;
        options.series[0].data[0].value = values;
        setOptions(options);
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
        <div className={S['radar-container']}>
          <Base option={options as ERadarOption}></Base>;
        </div>
      </div>
    </Card>
  );
});
