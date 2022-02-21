import React from 'react';
import { PageContainer, Table, Time } from '@bixi-design/core';
import { useAntdTable } from 'ahooks';
import { getRecordList } from './services';
import { authStore } from '@stores/auth';
import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { RecordListItem } from '@models';
import { useBreadcrumbs } from '@hooks/breadcrumb';
import S from './index.module.less';

export default function RecordListPage() {
  useBreadcrumbs(['比赛记录']);
  const { userInfo } = authStore;

  const { tableProps, search, refresh, pagination } = useAntdTable(({ current, pageSize }) => {
    return getRecordList({ pageNum: current, pageSize, token: userInfo?.token || '', userId: userInfo?.accountId }).then((res) => {
      return {
        total: res.data.data?.pages * pageSize,
        list: res.data.data?.list
      };
    });
  }, {});

  const { submit, reset } = search;

  const columns: ColumnsType<RecordListItem> = [
    {
      title: '英雄名称',
      dataIndex: 'heroName',
      render: (val, item) => {
        return (
          <>
            <div className={S['hero-icon']} style={{ backgroundImage: `url(${item.heroIcon})` }} />
            <span className={S['hero-name']}>{val}</span>
          </>
        );
      }
    },
    {
      title: '比赛结果',
      dataIndex: 'result',
      render: (val) => {
        return Number(val) ? <Tag color='green'>胜</Tag> : <Tag color='red'>败</Tag>;
      }
    },
    {
      title: 'KDA',
      dataIndex: 'kda'
    },
    {
      title: '正补数量',
      dataIndex: 'lastHits'
    },
    {
      title: '反补数量',
      dataIndex: 'denies'
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
      title: '比赛时间',
      dataIndex: 'playDate',
      render: (val) => <Time time={val} />
    },
    {
      title: '双倍积分',
      dataIndex: 'isDouble',
      render: (val) => {
        return Number(val) ? <Tag color='green'>是</Tag> : <Tag color='red'>否</Tag>;
      }
    },
    {
      title: '积分变化',
      dataIndex: 'integral'
    }
  ];

  return (
    <PageContainer autoHeight={false}>
      <Table rowKey='playDate' onRefresh={refresh} onReset={reset} columns={columns} {...tableProps} />
    </PageContainer>
  );
}
