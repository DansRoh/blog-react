import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import './index.css'
createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </HashRouter>,
)
