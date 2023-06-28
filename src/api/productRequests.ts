import { baseInstance } from 'api/axios'

export const fetchAllProducts = async () => {
  const res = await baseInstance.post('/products/search', {
    searchText: '',
    searchTags: []
  })
  return res.data
}

export const getPorductDetail = async (id: string) => {
  const res = await baseInstance.get(`/products/${id}`)
  return res.data
}
