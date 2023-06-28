import { authInstance } from '@/api'
import { CreateRequest, RemoveRequest, Transaction } from 'types/index'

//선택 가능한 은행 목록 조회
export const getBankLists = async () => {
  const res = await authInstance.get('/account/banks')
  return res.data
}

//계좌 목록 및 잔액 조회
export const getAccounts = async () => {
  try {
    const res = await authInstance.get('/account')
    return res.data.accounts
  } catch (error) {
    console.error()
  }
}

//계좌 연결
export const createAccount = async (request: CreateRequest) => {
  try {
    const res = await authInstance.post('/account', request)
    return res.data
  } catch (error) {
    console.error()
  }
}

//계좌 해지
export const removeAccount = async (req: RemoveRequest) => {
  try {
    const res = await authInstance.delete('/account', { data: req })
    return res.data
  } catch (error) {
    console.error()
  }
}
//결제
export const transactPayment = async (req: Transaction): Promise<any> => {
  try {
    const res = await authInstance.post('/products/buy', req)
    return res
  } catch (error) {
    console.error()
  }
}
