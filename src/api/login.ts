import { post } from '@/utils/request'

export const login = (data: any) => post('/auth/login', data)
