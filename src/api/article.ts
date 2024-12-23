import {del, get, patch, post, put} from '@/utils/request'

// 获取文章列表
export const getArticleList = (params: any) => get('/article', params)

// 添加文章
export const addArticle = (params: any) => post('/article', params)

// 更新文章
export const updateArticle = (params: any) => put('/article', params)

// 删除文章
export const deleteArticle = (id: any) => del(`/article/${id}`)

// 分页获取标签列表
export const getArticleTagPage = (params: any) => get('/article-tag', params)

// 获取标签列表
export const getArticleTagList = () => get('/article-tag/list')

// 分页获取标签分类
export const getArticleCatePage = (params: any) => get('/article-cate', params)

// 获取标签分类列表
export const getArticleCateList = () => get('/article-cate/list')

// 新增分类
export const postArticleCate = (params: any) => post('/article-cate', params)

// 编辑分类
export const updateArticleCate = (id: string | number, params: any) => patch(`/article-cate/${id}`, params)

// 新增标签
export const postArticleTag = (params: any) => post('/article-tag', params)
// 修改标签
export const updateArticleTag = (id: string | number, params: any) => patch(`/article-tag/${id}`, params)

// 删除标签
export const delArticleTag = (id: string | number) => del(`/article-tag/${id}`)

// 删除分类
export const delArticleCate = (id: string | number) => del(`/article-cate/${id}`)

// 发布
export const publicArticle = (id: number) => get(`/article/public/${id}`)