import { baseInstance } from 'api/axios'
import { BodyInfo, IdInfo } from 'types/index'

export const postInfo = async (bodyInfo: BodyInfo) => {
  const res = await baseInstance.post('/auth/signup', bodyInfo)
  return res.data
}

export const getId = async (idInfo: IdInfo) => {
  const res = await baseInstance.post('/auth/login', idInfo)
  return res.data
}
