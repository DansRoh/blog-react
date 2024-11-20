import { lazy } from 'react'

export interface RouteConfig {
  path: string
  element?: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element)
  children?: RouteConfig[]
  meta?: {
    title?: string
    requiresAuth?: boolean
    [key: string]: any
  }
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: lazy(() => import('@/pages/Home')),
    meta: {
      title: '首页'
    }
  }
]

export default routes