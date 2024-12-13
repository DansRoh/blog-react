import {Button, Form, Input, message, Modal, Popconfirm, Table} from 'antd';
import { usePagination } from 'ahooks';
import {delArticleCate, getArticleCatePage, postArticleCate, updateArticleCate} from '@/api/article';
import { columns } from './config';
import {useMemo, useState} from 'react';

const { TextArea } = Input;

const ArticleCateList = () => {
	const { data, loading, pagination, refresh } = usePagination(getArticleCatePage);
	const [open, setOpen] = useState(false);
	const [editId, setEditId] = useState<string | number | null>(null)
	const [form] = Form.useForm();

	const handleClick = (id: string, record: any) => {
		form.setFieldsValue({name: record.name, description: record.description});
		setEditId(id)
		setOpen(true);
	}

	const handDel = async (id: string | number) => {
		await delArticleCate(id)
		message.success('删除成功')
		refresh()
	}

  const _columns = useMemo(() => {
    return columns?.concat({
      title: '操作',
      key: 'action',
      render: (record) => {
        return (
					<>
						<Button onClick={() => handleClick(record.id, record)} type='link'>编辑</Button>
						<Popconfirm title={'确认删除一条数据？'} onConfirm={() => handDel(record.id)}>
							<Button type={'link'}>删除</Button>
						</Popconfirm>
					</>
				)
      }
    })
  }, [columns])

	const handleCancel = () => {
		setOpen(false);
		form.resetFields();
	}

	const submit = async () => {
		const res = await form.validateFields()
		if (editId) {
			 await updateArticleCate(editId, res)
			setEditId(null)
		} else {
			await postArticleCate(res)
		}

		setOpen(false);
		form.resetFields();
		refresh()
		message.success('添加成功')
	}
	return (
		<div>
			<Button type="primary" onClick={() => setOpen(true)}>
				新建
			</Button>
			<Table
				dataSource={data?.list}
        loading={loading}
        columns={_columns}
				rowKey={'id'}
				pagination={{
					current: pagination.current,
					pageSize: pagination.pageSize,
					total: pagination.total,
					onChange: pagination.onChange,
					onShowSizeChange: pagination.onChange
				}}
			></Table>
			<Modal title={editId? '编辑分类' : '新增分类'} open={open} onOk={submit} onCancel={handleCancel}>
				<Form form={form}>
					<Form.Item label={'分类名'} name={'name'} rules={[{required:true}]}>
						<Input />
					</Form.Item>
					<Form.Item label={'描述'} name={'description'}>
						<TextArea></TextArea>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ArticleCateList;
