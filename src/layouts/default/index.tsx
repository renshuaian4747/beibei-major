import React, { ReactComponentElement } from 'react';
import { PortalLayout, IPortalMenu } from '@bixi-design/layouts';
import S from './index.module.less';
import { User } from '@components';
import { ROUTES } from '@constants';
import { Select } from 'antd';
import { authStore } from '@stores/auth';

const { Option } = Select;

const menus: IPortalMenu[] = [
  {
    title: '个人首页',
    link: ROUTES.Profile.Root
  },
  {
    title: '积分排行',
    link: ROUTES.Rank.Root
  },
  {
    title: '数据榜单',
    link: ROUTES.Data.Root
  },
  {
    title: '比赛记录',
    link: ROUTES.Record.Root
  }
];

const userInfo = authStore.userInfo;

const handleChange = (value: string) => {
  authStore.setLegendId(Number(value));
};

const ExtractHeader = () => {
  return (
    <>
      <div className='major-select'>
        当前联赛：
        <Select defaultValue={userInfo?.leagueId.toString() || ''} style={{ width: 200, marginRight: 12 }} onChange={handleChange}>
          {(userInfo?.leagueList || []).map((item, index) => (
            <Option key={index} value={item.id.toString()}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
      <User></User>
    </>
  );
};

export default ({ children }: { children: ReactComponentElement<ISafeAny> }) => {
  return (
    <PortalLayout className={S['i-layout']} menus={menus} logo='/assets/images/beibei-logo.jpeg' action={ExtractHeader()}>
      <div style={{ height: '100%', backgroundColor: '#f1f2f7' }}>{children}</div>
    </PortalLayout>
  );
};
