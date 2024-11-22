import type { TableProps } from 'antd';
import dayjs from 'dayjs';

export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  id?: number;
}

export const columns: TableProps<DataType>['columns'] = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (_) => {
      return dayjs(_).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    render: (_) => {
      return dayjs(_).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    title: '内容',
    key: 'content',
    dataIndex: 'content',
  }
];
