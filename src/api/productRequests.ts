import { baseInstance } from 'api/axios'

export const fetchAllProducts = async () => {
  const res = await baseInstance.post('/products/search', {
    searchText: '',
    searchTags: []
  })
  return res.data
}
