import { baseInstance, authInstance } from 'api/axios'
import { BodyInfo, IdInfo, RequestBody } from 'types/index'

export const postInfo = async (bodyInfo: BodyInfo) => {
  const res = await baseInstance.post('/auth/signup', bodyInfo)
  return res.data
}

export const getId = async (idInfo: IdInfo) => {
  const res = await baseInstance.post('/auth/login', idInfo)
  return res.data
}

export const logOut = async () => {
  const res = await authInstance.post('/auth/logout')
  return res.data
}

export const InfoModify = async (RequestBody: RequestBody) => {
  const res = await authInstance.put('/auth/user', RequestBody)
  return res.data
}
