import { TableProps } from "antd";
import { DataType } from "@/pages/Article/List/config";
import dayjs from "dayjs";

export const columns: TableProps<DataType>['columns'] = [
  {
    title: '标签名称',
    dataIndex: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render: _ => (dayjs(_).format('YYYY-MM-DD hh:mm:ss'))
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    render: _ => (dayjs(_).format('YYYY-MM-DD hh:mm:ss'))
  },
]
