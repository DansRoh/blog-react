import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate, } from 'react-router-dom'
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout as AntdLayout, Menu, theme } from 'antd';
import layoutRouter from '@/router/layoutRouter';
import { RouteConfig } from '@/router';
import { formatRoute } from '@/utils/common';
const { Header, Content, Footer, Sider } = AntdLayout;

type MenuItem = Required<MenuProps>['items'][number];

interface FormattedRouteConfig extends RouteConfig {
  absolutelyUrl: string
}

const genMenuItems = (routerConfig: RouteConfig[]) => {
  const formattedRouterConfig: FormattedRouteConfig[] = formatRoute(routerConfig)

  return formattedRouterConfig.map(item => {
    if (item.children) {
      genMenuItems(item.children)
    }
    if (item.meta?.hideInMenu && item.hideInMenu) {
      return null
    }
    return getItem(item.meta?.title, item.absolutelyUrl, item.meta?.menuIcon)
  }).filter(item => item !== null)
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['/'])
  const navigator = useNavigate()
  const { pathname } = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setSelectedKeys([pathname || '/'])
  }, [pathname])

  const menuItems = useMemo(() => genMenuItems(layoutRouter), [layoutRouter])


  const handleMenuChange = (v: any) => {
    const { key } = v
    navigator(key)
  }

  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={selectedKeys} onSelect={handleMenuChange} mode="inline" items={menuItems} />
      </Sider>
      <AntdLayout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[]}>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              height: 'calc(100vh - 150px)',
              overflowY: 'scroll',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        </Footer>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;