import { adminInstance } from 'api/index'
import { Product } from 'types/index'

export const adminInsertProduct = async (product: Product) => {
  const response = await adminInstance.post('/products', product)
  return response.data
}

export const adminFetchProducts = async () => {
  const response = await adminInstance.get('/products')
  return response.data
}
