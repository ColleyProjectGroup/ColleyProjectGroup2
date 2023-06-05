import { adminInstance } from 'api'
import { Product } from 'types'

export const adminInsertProduct = async (product: Product) => {
  const response = await adminInstance.post('/products', product)
  return response.data
}
