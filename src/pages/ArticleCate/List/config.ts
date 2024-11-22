import { DataType } from "@/pages/Article/List/config";
import { TableProps } from "antd";
import dayjs from "dayjs";

export const columns: TableProps<DataType>['columns'] = [
  {
    title: '分类名称',
    dataIndex: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render: (_) => {
      return dayjs(_).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    render: (_) => {
      return dayjs(_).format('YYYY-MM-DD HH:mm:ss')
    },
  }
]
