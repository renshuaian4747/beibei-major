import React, { useState } from 'react';
import { PageContainer, Table } from '@bixi-design/core';
import { getDataList } from './services';
import { authStore } from '@stores/auth';
import { Alert, Tabs } from 'antd';
import { DataListItem } from '@models';
import { useBreadcrumbs } from '@hooks/breadcrumb';
import { useMount } from 'ahooks';
import S from './index.module.less';
import { LOSS_LIST_COL, TOP_LIST_COL } from './constants';

const { TabPane } = Tabs;

export default function DataListPage() {
  useBreadcrumbs(['数据榜单']);
  const { userInfo } = authStore;
  const [topList, setTopList] = useState<DataListItem[]>([]);
  const [lossList, setLossList] = useState<DataListItem[]>([]);

  useMount(() => {
    getDataList({ token: userInfo?.token as string }).then((res) => {
      setTopList(res.data.data.topList);
      setLossList(res.data.data.lossList);
    });
  });

  return (
    <PageContainer autoHeight={false}>
      <Tabs defaultActiveKey='0' tabPosition='left'>
        <TabPane tab='高手榜' key={0}>
          <Alert className={S['i-alert']} message='长剑应犹在，千里不留行；行云流水间，万古流芳处' type='info' />
          <Table tableLayout='fixed' pagination={false} rowKey='winRate' columns={TOP_LIST_COL} dataSource={topList}></Table>;
        </TabPane>
        <TabPane tab='低手榜' key={1}>
          <Alert className={S['i-alert']} message='十年磨一剑，霜刃未曾试；勤练斩楼兰，不日定超凡' type='info' />
          <Table tableLayout='fixed' pagination={false} rowKey='winRate' columns={LOSS_LIST_COL} dataSource={lossList}></Table>;
        </TabPane>
      </Tabs>
    </PageContainer>
  );
}
