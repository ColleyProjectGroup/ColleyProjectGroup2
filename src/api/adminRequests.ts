import { adminInstance, baseInstance } from 'api/index'
import { ProductAddBody } from 'types/index'

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
