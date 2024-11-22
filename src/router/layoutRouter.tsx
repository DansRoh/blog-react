import { lazy } from 'react'
import { RouteConfig } from '.'
import { ReadOutlined, TagsOutlined } from '@ant-design/icons'

const layoutRouter: RouteConfig[] = [
  {
    path: 'article',
    element: lazy(() => import('@/pages/Article/List')),
    meta: {
      title: '文章管理',
      menuIcon: <ReadOutlined />
    }
  },
  {
    path: 'article',
    hideInMenu: true,
    children: [
      {
        path: 'detail',
        element: lazy(() => import('@/pages/Article/Detail')),
        meta: {
          title: '文章详情',
          hideInMenu: true
        }
      },
      {
        path: 'add',
        element: lazy(() => import('@/pages/Article/Add')),
        meta: {
          title: '新增文章',
          hideInMenu: true
        }
      },
    ]
  },
  {
    path: 'tags',
    element: lazy(() => import('@/pages/ArticleTags/List')),
    meta: {
      title: '标签管理',
      menuIcon: <TagsOutlined />
    }
  },
  {
    path: 'cate',
    element: lazy(() => import('@/pages/ArticleCate/List')),
    meta: {
      title: '分类管理',
      menuIcon: <TagsOutlined />
    }
  }
]

export default layoutRouter