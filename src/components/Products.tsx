import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { adminInstance } from '../api/axios'
import '../styles/layout/NewArrival.scss'
import { ProductsProps, Product } from 'types/index'
import { Link } from 'react-router-dom'
import { RecentlyContext } from 'contexts/index'

const API_ENDPOINT = '/products'

const Products = ({
  tagFilter = [],
  limit,
  sortOption,
  getProductCount,
  keyword
}: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const location = useLocation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = API_ENDPOINT + location.search
        const response = await adminInstance.get(query)
        let filteredProducts: Product[] = response.data

        if (tagFilter.length > 0) {
          filteredProducts = filteredProducts.filter((product: Product) =>
            tagFilter.every(tag => product.tags.includes(tag))
          )
        }

        filteredProducts = filteredProducts.filter(
          (product: Product) => !product.isSoldOut
        )

        if (sortOption) {
          filteredProducts.sort((a: Product, b: Product) => {
            if (sortOption === 'priceLow') {
              return a.price - b.price
            } else if (sortOption === 'priceHigh') {
              return b.price - a.price
            } else if (sortOption === 'name') {
              return a.title.localeCompare(b.title, 'ko', {
                sensitivity: 'base'
              })
            } else {
              return 0
            }
          })
        }

        let searchedProducts: Product[] = filteredProducts

        if (keyword) {
          const keywordLowerCase = keyword.toLowerCase() // 키워드를 소문자로 변환
          searchedProducts = response.data.filter((product: Product) =>
            product.title.toLowerCase().includes(keywordLowerCase)
          )
        }

        if (limit) {
          searchedProducts = searchedProducts.slice(0, limit)
        }

        setProducts(searchedProducts)
        getProductCount(searchedProducts.length)
      } catch (error) {
        console.error('상품을 가져오는 중 오류 발생', error)
      }
    }

    fetchProducts()
  }, [limit, sortOption, getProductCount, location.search, keyword])

  const calculateDiscountedPrice = (
    price: number,
    discountRate?: number
  ): number => {
    if (discountRate) {
      const discountAmount = price * (discountRate / 100)
      return price - discountAmount
    }
    return price
  }

  // 최근 본 상품 세션 저장 처리
  const { recentlyViewedList, setRecentlyViewedList } =
    useContext(RecentlyContext)

  const onSaveProductRecently = (product: Product) => {
    const isExist = recentlyViewedList.find(p => p.id === product.id)
    if (!isExist) {
      setRecentlyViewedList([...recentlyViewedList, product])
    } else {
      const removeList = recentlyViewedList.filter(p => p.id !== product.id)
      setRecentlyViewedList([...removeList, product])
    }
  }

  return (
    <div className="products">
      <div className="inner">
        <div className="product">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id}>
                <Link
                  to={`/products/${product.id}`}
                  onClick={() => {
                    onSaveProductRecently(product)
                  }}>
                  <div className="image">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </div>
                  <div className="title">{product.title}</div>
                  <div className="price">
                    {product.discountRate ? (
                      <>
                        <span className="originalPrice">
                          <del>{product.price.toLocaleString()}원</del>
                        </span>{' '}
                        <span className="discountedPrice">
                          {calculateDiscountedPrice(
                            product.price,
                            product.discountRate
                          ).toLocaleString()}
                          원
                        </span>
                      </>
                    ) : (
                      <>{product.price.toLocaleString()}원</>
                    )}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="NoProducts">상품이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export { Products }
export type { ProductsProps }
