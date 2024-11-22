import React, { useMemo } from 'react';
import { Button, message, Table } from 'antd';
import { columns, DataType } from './config';
import { usePagination } from 'ahooks';
import { deleteArticle, getArticleList } from '@/api/article';
import { useNavigate } from 'react-router-dom';

const ArticleList: React.FC = () => {
  const { data, loading, pagination, refresh } = usePagination(getArticleList);
	const navigate = useNavigate();
	const handleEdit = (record: DataType) => {
		console.log(record);
	};

	const handleDelete = async (record: DataType) => {
		await deleteArticle(record.id);
		message.success('操作成功');
		refresh();
	};

	const _columns = useMemo(() => {
		return columns?.concat({
			title: '操作',
			key: 'action',
			render: (_, record) => (
				<>
					<Button type="link" onClick={() => handleEdit(record)}>
						编辑
					</Button>
					<Button type="link" onClick={() => handleDelete(record)}>
						删除
					</Button>
				</>
			)
		});
	}, [columns]);

	return (
		<div>
			<Button type="primary" onClick={() => navigate('/article/add')}>
				新建
			</Button>
			<Table<DataType>
				columns={_columns}
				rowKey="id"
				dataSource={data?.list}
				pagination={{
					current: pagination.current,
					pageSize: pagination.pageSize,
					total: pagination.total,
					onChange: pagination.onChange,
					onShowSizeChange: pagination.onChange
				}}
				loading={loading}
			/>
		</div>
	);
};

export default ArticleList;
