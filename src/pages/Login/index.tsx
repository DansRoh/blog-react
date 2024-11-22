import { Input, Form, Button, message } from 'antd'
import styles from './index.module.styl'
import { login } from '@/api/login'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    const data = await login(values)
    localStorage.setItem('token', data.access_token)
    message.success('登录成功')
    navigate('/')
  }

  return (
    <div className={styles.login}>
      <Form onFinish={onFinish} className={styles.form} form={form}>
        <Form.Item label="昵称" name="nickname">
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
