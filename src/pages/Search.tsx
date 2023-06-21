import React from 'react'
import { useLocation } from 'react-router-dom'
import { getProductsByKeyword } from '../api/productApi'
import { Product } from '../types'
import { Footer } from '../components'
import '../styles/layout/ProductSearch.scss'

const SearchResult = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const keyword = queryParams.get('keyword') || ''

  const [products, setProducts] = React.useState<Product[]>([])

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsByKeyword(keyword)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [keyword])

  return (
    <div className="SearchResult">
      <h2 className="Title">검색 결과: "{keyword}"</h2>
      <div className="ProductList">
        {products.length > 0 ? (
          products.map(product => (
            <div
              className="Product"
              key={product.id}>
              <img
                src={product.image}
                alt={product.name}
              />
              <h3 className="ProductName">{product.name}</h3>
              <p className="ProductPrice">{product.price}원</p>
            </div>
          ))
        ) : (
          <p className="NoResults">검색 결과가 없습니다.</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export { SearchResult }
