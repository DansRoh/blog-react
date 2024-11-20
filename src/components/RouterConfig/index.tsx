import { createElement, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import routes, { RouteConfig } from '@/router/index'

const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path}>
          {renderRoutes(route.children)}
        </Route>
      )
    }
    
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <Suspense fallback={<div>加载中...</div>}>
            {route.element && createElement(route.element)}
          </Suspense>
        }
      />
    )
  })
}

const RouterConfig = () => {
  return <Routes>{renderRoutes(routes)}</Routes>
}

export default RouterConfig