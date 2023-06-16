import React, { useEffect, useState, useCallback } from 'react'
import { adminInstance } from '../api/axios'
import '../styles/layout/NewArrival.scss'

const API_ENDPOINT = '/products'
const PRODUCTS_CLASSNAME = 'Product'

interface Product {
  id: string
  thumbnail: string
  title: string
  price: number
  discountRate?: number
  tags: string[]
}

interface ProductsProps {
  tagFilter?: string[] // 상품 카테고리 태그
  limit?: number // 상품 렌더링 제한 수
  sortOption?: string | null // 상품 정렬 옵션
  getProductCount: (count: number) => void // 상품 개수
}

const Products = ({
  tagFilter = [],
  limit,
  sortOption,
  getProductCount
}: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = useCallback(async () => {
    try {
      const query = API_ENDPOINT

      const response = await adminInstance.get(query)
      let filteredProducts = response.data

      if (tagFilter.length > 0) {
        // 해당 태그를 포함하는 상품 필터링
        filteredProducts = filteredProducts.filter((product: Product) =>
          tagFilter.every(tag => product.tags.includes(tag))
        )
      }

      if (sortOption) {
        // 정렬 옵션이 존재할 경우
        filteredProducts.sort((a: Product, b: Product) => {
          if (sortOption === 'priceLow') {
            return a.price - b.price // 낮은 가격 순
          } else if (sortOption === 'priceHigh') {
            return b.price - a.price // 높은 가격 순
          } else if (sortOption === 'name') {
            return a.title.localeCompare(b.title, 'ko', {
              sensitivity: 'base'
            }) // 상품명을 기준으로 가나다 순으로 정렬
          } else {
            return 0
          }
        })
      }

      if (limit) {
        // 상품 제한 수량
        filteredProducts = filteredProducts.slice(0, limit)
      }

      setProducts(filteredProducts)
      getProductCount(filteredProducts.length)
      // 렌더링 상품 수 함수 호출
    } catch (error) {
      console.error('상품 조회 오류 발생', error)
    }
  }, [tagFilter, limit, sortOption, getProductCount])

  useEffect(() => {
    fetchProducts()
  }, [])

  const calculateDiscountedPrice = (price: number, discountRate?: number) => {
    if (discountRate) {
      const discountAmount = price * (discountRate / 100)
      return price - discountAmount
      // 할인가 계산
    }
    return price
  }

  return (
    <div className="Products">
      <div className="Inner">
        <div className={PRODUCTS_CLASSNAME}>
          {products.map(product => (
            <div key={product.id}>
              <div className="Image">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>
              <div className="Title">{product.title}</div>
              <div className="Price">
                {product.discountRate ? (
                  <>
                    <span className="OriginalPrice">
                      <del>{product.price.toLocaleString()}원</del>
                    </span>{' '}
                    <span className="DiscountedPrice">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Products }
