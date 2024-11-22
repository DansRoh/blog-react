import { del, get, post, put } from '@/utils/request'

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
