import { getArticleTagPage } from "@/api/article";
import { usePagination } from "ahooks";
import { Button, Table } from "antd";
import { columns } from "./config";
import { useMemo } from "react";
const TagsList = () => {
  const { data, loading, pagination } = usePagination(getArticleTagPage);
  const _columns = useMemo(() => {
    return columns?.concat({
      title: '操作',
      key: 'action',
      render: (record: any) => {
        return <Button type='link'>编辑</Button>
      }
    })
  }, [columns])
  return (
    <div>
      <Table
        dataSource={data?.list}
        loading={loading}
        columns={_columns}
        pagination={{
          ...pagination,
          onChange: pagination.onChange,
          onShowSizeChange: pagination.onChange
        }}
      ></Table>
    </div>
  )
}

export default TagsList
