import { adminInstance, baseInstance } from 'api/index'
import {
  ProductAddBody,
  Customer,
  TransactionDetail,
  CustomerInfo
} from 'types/index'
import axios from 'axios'

// 관리자 - 상품 추가
export const adminInsertProduct = async (product: ProductAddBody) => {
  const response = await adminInstance.post('/products', product)
  return response.data
}

// 관리자 - 상품 조회
export const adminFetchProducts = async () => {
  const response = await adminInstance.get('/products')
  return response.data
}

// 관리자 - 상품 삭제
export const adminDeleteProduct = async (productId: string) => {
  const response = await adminInstance.delete(`/products/${productId}`)
  return response.data
}

// 관리자 - 상품 상세 조회
export const adminGetProductDetail = async (productId: string) => {
  const response = await baseInstance.get(`/products/${productId}`)
  return response.data
}

// 관리자 - 상품 판매 상태 변경
export const adminChangeProductSaleStatus = async (
  productId: string,
  isSoldOut: boolean
) => {
  const response = await adminInstance.put(`/products/${productId}`, {
    isSoldOut: isSoldOut
  })
  return response.data
}

// 관리자 - 상품 수정
export const adminEditProduct = async (product: ProductAddBody) => {
  const response = await adminInstance.put(`/products/${product.id}`, product)
  return response.data
}

// 관리자 - 사용자 목록 조회
export const adminFetchCustomers = async () => {
  const response = await axios
    .all([
      await adminInstance.get('auth/users'),
      await adminInstance.get('products/transactions/all')
    ])
    .then(
      axios.spread((res1, res2) => {
        const customers = res1.data as Customer[]
        const orders = res2.data as TransactionDetail[]

        const customerInfos: CustomerInfo[] = customers.map(
          (customer: Customer) => {
            const customerTransactions = orders.filter(
              (order: TransactionDetail) => order.user.email === customer.email
            )
            return {
              user: customer,
              totalTransaction: customerTransactions.length,
              totalTransactionPrice: customerTransactions.reduce(
                (acc, current) => {
                  return (acc += current.product.price)
                },
                0
              )
            }
          }
        )

        return customerInfos
      })
    )
  return response
}
