import { authInstance } from '@/api'
import {
  CreateRequest,
  RemoveRequest,
  AccountsRequest,
  Bank
} from '@/types/BankAccounts.interface'

//선택 가능한 은행 목록 조회
export const getBankLists = async () => {
  console.log('GET BANK LISTS')
  const res = await authInstance.get('/account/banks')
  console.log(res.data)
  return res.data
}

//계좌 목록 및 잔액 조회 - Exception Handling***
export const getAccounts = async () => {
  console.log('GET ACCOUNTS')
  const res = await authInstance.get('/account')
  console.log(res.data.accounts)
  return res.data.accounts
}

//계좌 연결 - Exception Handling***
export const createAccount = async (request: CreateRequest) => {
  console.log('CREATE ACCOUNT')
  const res = await authInstance.post('/account', request)
  console.log(res.data)
  return res.data
}

//계좌 해지
export const removeAccount = async (request: RemoveRequest) => {
  console.log('REMOVE ACCOUNT')
  const res = await authInstance.post('/account', request)
  console.log(res.data)
  return res.data
}
