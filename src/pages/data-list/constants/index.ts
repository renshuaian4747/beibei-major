import { DataListItem } from './../../../models/index';
import { ColumnsType } from 'antd/lib/table';

export const TOP_LIST_COL: ColumnsType<DataListItem> = [
  {
    title: '胜率最高',
    dataIndex: 'winRate'
  },
  {
    title: '参战率最高',
    dataIndex: 'warRate'
  },
  {
    title: 'KDA最高',
    dataIndex: 'kad'
  },
  {
    title: '击杀最多',
    dataIndex: 'killsPerGame'
  },
  {
    title: '死亡最少',
    dataIndex: 'deathPerGame'
  },
  {
    title: '助攻最高',
    dataIndex: 'assistsPerGame'
  },
  {
    title: '英雄胜率最高',
    dataIndex: 'heroWinRate'
  },
  {
    title: '场均英雄数最高',
    dataIndex: 'heroRate'
  },
  {
    title: '英雄次数最高',
    dataIndex: 'heroCount'
  }
];

export const LOSS_LIST_COL: ColumnsType<DataListItem> = [
  {
    title: '胜率最低',
    dataIndex: 'winRate'
  },
  {
    title: '参战率最低',
    dataIndex: 'warRate'
  },
  {
    title: 'KDA最低',
    dataIndex: 'kad'
  },
  {
    title: '击杀最少',
    dataIndex: 'killsPerGame'
  },
  {
    title: '死亡最多',
    dataIndex: 'deathPerGame'
  },
  {
    title: '助攻最低',
    dataIndex: 'assistsPerGame'
  },
  {
    title: '英雄胜率最低',
    dataIndex: 'heroWinRate'
  },
  {
    title: '场均英雄数最低',
    dataIndex: 'heroRate'
  }
];
