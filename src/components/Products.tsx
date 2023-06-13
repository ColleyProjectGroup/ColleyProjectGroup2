import React, { useEffect, useState } from 'react'
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
  tagFilter?: string[]
  limit?: number
  sortOption?: string | null
  getProductCount: (count: number) => void // 수정: 상품 개수를 매개변수로 받도록 수정
}

const Products = ({
  tagFilter = [],
  limit,
  sortOption,
  getProductCount
}: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = API_ENDPOINT

        const response = await adminInstance.get(query)
        let filteredProducts = response.data

        if (tagFilter.length > 0) {
          filteredProducts = filteredProducts.filter(
            (product: { tags: string | string[] }) =>
              tagFilter.every(tag => product.tags.includes(tag))
          )
        }

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

        if (limit) {
          filteredProducts = filteredProducts.slice(0, limit)
        }

        setProducts(filteredProducts)
        getProductCount(filteredProducts.length) // 수정: 상품 개수를 매개변수로 전달하여 호출
      } catch (error) {
        console.error('상품 조회 오류 발생', error)
      }
    }

    fetchProducts()
  }, [tagFilter, limit, sortOption, getProductCount])

  const calculateDiscountedPrice = (price: number, discountRate?: number) => {
    if (discountRate) {
      const discountAmount = price * (discountRate / 100)
      return price - discountAmount
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
