import { lazy } from 'react'
import layoutRouter from './layoutRouter'

export interface RouteConfig {
  hideInMenu?: boolean
  path: string
  element?: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element) | React.FC
  children?: RouteConfig[]
  meta?: {
    // 菜单标题
    title?: string
    // 菜单图标
    menuIcon?: React.ReactNode
    // 是否需要登录
    requiresAuth?: boolean
    // 是否在菜单中隐藏
    hideInMenu?: boolean
    [key: string]: any
  }
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: lazy(() => import('@/components/Layout')),
    meta: {
      title: '首页'
    },
    children: layoutRouter
  },
  {
    path: 'login',
    element: lazy(() => import('@/pages/Login')),
    meta: {
      title: '登录'
    }
  }
]

export default routes