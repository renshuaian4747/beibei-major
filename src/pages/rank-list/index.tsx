import React from 'react';
import { PageContainer, Table, Time } from '@bixi-design/core';
import { useAntdTable } from 'ahooks';
import { getRankList } from './services';
import { authStore } from '@stores/auth';
import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { RankListItem } from '@models';
import { useBreadcrumbs } from '@hooks/breadcrumb';

export default function RankListPage() {
  useBreadcrumbs(['积分排行榜']);
  const { userInfo } = authStore;

  const { tableProps, search, refresh, pagination } = useAntdTable(({ current, pageSize }) => {
    return getRankList({ pageNum: current, pageSize, token: userInfo?.token || '' }).then((res) => {
      return {
        total: res.data.data?.pages * pageSize,
        list: res.data.data?.list
      };
    });
  }, {});

  const { submit, reset } = search;

  const columns: ColumnsType<RankListItem> = [
    {
      title: '用户',
      dataIndex: 'nickName'
    },
    {
      title: '积分',
      dataIndex: 'integral'
    },
    {
      title: '胜率',
      dataIndex: 'winRate'
    },
    {
      title: '场均KDA',
      dataIndex: 'kda'
    },
    {
      title: '场均击杀',
      dataIndex: 'averageKills'
    },
    {
      title: '场均阵亡',
      dataIndex: 'averageDeaths'
    },
    {
      title: '场均助攻',
      dataIndex: 'averageAssists'
    },
    {
      title: 'GPM',
      dataIndex: 'goldPerMin'
    },
    {
      title: 'XPM',
      dataIndex: 'xpPerMin'
    },
    {
      title: '当前连胜/连败数',
      dataIndex: 'curMaxCount'
    },
    {
      title: '连胜/连败',
      dataIndex: 'isWin',
      render: (val) => {
        return val ? <Tag color='red'>连败</Tag> : <Tag color='green'>连胜</Tag>;
      }
    },
    {
      title: '最后比赛时间',
      dataIndex: 'lastPlayTime',
      render: (val) => <Time time={val} />
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      render(version: ISafeAny) {
        return (
          <div>
            <Button size='small' type='link'>
              详情
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <PageContainer autoHeight={false}>
      <Table rowKey='userId' onRefresh={refresh} onReset={reset} columns={columns} {...tableProps} />
    </PageContainer>
  );
}
