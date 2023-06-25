import { authInstance } from 'api/index'

export const featchUserOrders = async () => {
  const res = await authInstance.get('products/transactions/details')
  return res.data
}

export const confirmOrder = async (orderId: string) => {
  const res = await authInstance.post('products/ok', {
    detailId: orderId
  })
  return res.data
}

export const cancelOrder = async (orderId: string) => {
  const res = await authInstance.post('products/cancel', {
    detailId: orderId
  })
  return res.data
}
