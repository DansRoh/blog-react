import {delArticleTag, getArticleTagPage, postArticleTag, updateArticleTag} from "@/api/article";
import { usePagination } from "ahooks";
import {Button, Form, Input, message, Modal, Popconfirm, Table} from "antd";
import { columns } from "./config";
import {useMemo, useState} from "react";
const TagsList = () => {
  const { data, loading, pagination, refresh } = usePagination(getArticleTagPage);
  const [editId, setEditId] = useState<string | number | null>(null)
  const [open, setOpen] = useState(false)

  const [form] = Form.useForm()

  const handleEdit = (record:any) => {
    setEditId(record.id)
    form.setFieldsValue({name: record.name, description: record.description})
    setOpen(true)
  }

  const handleDel = async (id: string | number) => {
    await delArticleTag(id)
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
            <Button type='link' onClick={() => {handleEdit(record)}}>编辑</Button>
            <Popconfirm title={'确认删除一条数据？'} onConfirm={() => handleDel(record.id)}>
              <Button type={'link'}>删除</Button>
            </Popconfirm>
          </>
        )
      }
    })
  }, [columns])

  const submit = async () => {
    const res = await form.validateFields()
    if (editId) {
      await updateArticleTag(editId, res)
    } else {
      await postArticleTag(res)
    }
    message.success('添加成功')
    setOpen(false)
    setEditId(null)
    form.resetFields()
    refresh()
  }

  const handleCancel = () => {
    setEditId(null);
    form.resetFields();
    setOpen(false);
  }

  return (
    <div>
      <Button type={'primary'} onClick={() => setOpen(true)}>新增</Button>
      <Table
        rowKey={'id'}
        dataSource={data?.list}
        loading={loading}
        columns={_columns}
        pagination={{
          ...pagination,
          onChange: pagination.onChange,
          onShowSizeChange: pagination.onChange
        }}
      ></Table>
      <Modal title={editId ? '编辑' : '新增'} open={open} onOk={submit} onCancel={handleCancel}>
        <Form form={form}>
          <Form.Item label={'标签名'} name={'name'} rules={[{required:true}]}>
            <Input />
          </Form.Item>
          <Form.Item label={'描述'} name={'description'}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TagsList
