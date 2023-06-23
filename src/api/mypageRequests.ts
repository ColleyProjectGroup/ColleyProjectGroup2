import { authInstance } from 'api/index'

export const featchUserOrders = async () => {
  const res = await authInstance.get('products/transactions/details')
  return res.data
}
