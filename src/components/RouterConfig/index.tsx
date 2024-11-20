import { RouteConfig } from '@/router';
import React, { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const RenderRouter = (props: any) => {
  const { routers = [] } = props;
  const routeLoop = (routerList: RouteConfig[]) => {
    if (routerList && routerList.length > 0) {
      const output: React.ReactElement[] = [];
      routerList.forEach((item, index) => {
        const { element: Com, children, ...routeProps } = item as any;
        const thisRouteProps = { ...routeProps };
        const childrenRoutes = children && routeLoop(children);

        if (Com) {
          thisRouteProps.element = (
            <Suspense fallback={<div>加载中...</div>}>
              <Com />
            </Suspense>
          );
        }

        output.push(
          <Route key={`${item.path}_${index}`} {...thisRouteProps}>
            {childrenRoutes}
          </Route>,
        );
      });
      return output;
    }
    return null;
  };

  return <Routes>{routeLoop(routers)}</Routes>;
};

const areEqual = () => {
  return false;
};

export default memo(RenderRouter, areEqual);
