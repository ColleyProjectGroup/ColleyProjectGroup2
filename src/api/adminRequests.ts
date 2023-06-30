import { adminInstance, authInstance, baseInstance } from 'api/index'
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
              (order: TransactionDetail) =>
                order.user.email === customer.email &&
                (order.done || !order.isCanceled)
            )
            return {
              user: customer,
              totalTransaction: customerTransactions.length,
              totalTransactionPrice: customerTransactions.reduce(
                (acc, current) => {
                  if (current.product.discountRate) {
                    return (acc +=
                      current.product.price -
                      (current.product.price * current.product.discountRate) /
                        100)
                  }
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

// 관리자 - 대시보드 거래내역 조회
export const fetchAdminTransactions = async () => {
  const response = await adminInstance.get('products/transactions/all')
  return response.data
}

// 사용자 확인
export const checkIsAdmin = async () => {
  const response = await authInstance.post('/auth/me')
  return response.data
}

// 주문 취소/취소 철회
export const changeIsCanceled = async (
  detailId: string,
  isCanceled: boolean
) => {
  const response = await adminInstance.put(
    `/products/transactions/${detailId}`,
    {
      isCanceled: isCanceled
    }
  )
  return response.data
}

// 구매 확정 처리
export const adminOrderConfirm = async (detailId: string) => {
  const response = await adminInstance.put(
    `/products/transactions/${detailId}`,
    {
      done: true
    }
  )
  return response.data
}
