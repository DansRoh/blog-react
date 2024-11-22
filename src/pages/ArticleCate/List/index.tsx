import { Button, Table } from 'antd';
import { usePagination } from 'ahooks';
import { getArticleCatePage } from '@/api/article';
import { columns } from './config';
import { useMemo } from 'react';

const ArticleCateList = () => {
	const { data, loading, pagination } = usePagination(getArticleCatePage);

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
					current: pagination.current,
					pageSize: pagination.pageSize,
					total: pagination.total,
					onChange: pagination.onChange,
					onShowSizeChange: pagination.onChange
				}}
			></Table>
		</div>
	);
};

export default ArticleCateList;
