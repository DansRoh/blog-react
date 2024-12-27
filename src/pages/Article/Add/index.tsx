import { Input, Form, Button, Flex, message, Select } from 'antd';
import MDEditor from '@uiw/react-md-editor';

import { useNavigate } from 'react-router-dom';
import { addArticle, getArticleCateList, getArticleTagList } from '@/api/article';
import { useRequest } from 'ahooks';

const ArticleAdd = () => {
	const navigate = useNavigate();

	const { data: cateList } = useRequest(getArticleCateList);
	const { data: tagList } = useRequest(getArticleTagList);

	const handleSubmit = async (values: any) => {
		await addArticle(values);
		message.success('添加成功');
		navigate(-1);
	};

	return (
		<div>
			<Form onFinish={handleSubmit}>
				<Form.Item
					label="标题"
					name="title"
					rules={[{ required: true, message: '请输入标题' }]}
					wrapperCol={{ span: 8 }}
				>
					<Input />
				</Form.Item>
				<Form.Item label="描述" name="description" wrapperCol={{ span: 8 }}>
					<Input />
				</Form.Item>
				<Form.Item
					label="分类"
					name="categoryIds"
					rules={[{ required: true, message: '请输入分类' }]}
					wrapperCol={{ span: 8 }}
				>
					<Select mode={'multiple'} options={cateList} fieldNames={{ label: 'name', value: 'id' }} />
				</Form.Item>
				<Form.Item
					label="标签"
					name="tagIds"
					rules={[{ required: true, message: '请输入标签' }]}
					wrapperCol={{ span: 8 }}
				>
					<Select mode={'multiple'} options={tagList} fieldNames={{ label: 'name', value: 'id' }} />
				</Form.Item>
				<Form.Item label={'封面'} name={'cover'}>
					<Input />
				</Form.Item>
				<Form.Item
					label="内容"
					name="content"
					rules={[{ required: true, message: '请输入内容' }]}
					wrapperCol={{ span: 18 }}
				>
					<MDEditor data-color-mode="light" style={{ minHeight: 400 }} />
				</Form.Item>
				<Form.Item wrapperCol={{ span: 24 }}>
					<Flex gap={16} justify="center">
						<Button type="default" onClick={() => navigate(-1)}>
							取消
						</Button>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
					</Flex>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ArticleAdd;
