import { RouteConfig } from "@/router";

/** 如果path以/开头，去除/字符 */
export const formatPath = (path: any) => {
  return /^\//.test(path) ? path.substr(1) : path;
};

/**
 * 格式化路由，递归路由，获取绝对路径
 * @param {*} routeList 路由列表
 * @param {*} base 基础路径
 * @returns
 */
export const formatRoute = (routeList: RouteConfig[], base = '') => {
  const output: any[] = []
  routeList.forEach(item => {
    const { path, children, hideInMenu, ...rest } = item
    const formattedPath = formatPath(path)
    const absolutelyUrl = `${base}/${formattedPath}`

    if (hideInMenu) {
      return
    }

    if (children) {
      output.push({
        path: formattedPath,
        absolutelyUrl,
        ...rest,
        children: formatRoute(children, absolutelyUrl)
      })
    } else {
      output.push({
        path: formattedPath,
        absolutelyUrl,
        ...rest
      })
    }
  })

  return output
}