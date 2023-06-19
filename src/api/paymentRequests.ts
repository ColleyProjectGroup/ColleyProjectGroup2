import { authInstance } from '@/api'
import { CreateRequest, RemoveRequest } from '@/types/BankAccounts.interface'

//선택 가능한 은행 목록 조회
export const getBankLists = async () => {
  console.log('Banks')
  const res = await authInstance.get('/account/banks')
  console.log(res.data)
  return res.data
}

//계좌 목록 및 잔액 조회 - Exception Handling***
export const getAccounts = async () => {
  console.log('Accounts')
  const res = await authInstance.get('/account')
  console.log(res.data)
  return res.data
}

//계좌 연결 - Exception Handling***
export const createAccount = async (request: CreateRequest) => {
  console.log('CREATE ACCOUNT')
  const res = await authInstance.post('/account')
  console.log(res.data)
  return res.data
}

//계좌 해지
export const removeAccount = async (request: RemoveRequest) => {
  console.log('clicked')
  const res = await authInstance.post('/account')
  console.log(res.data)
  return res.data
}
