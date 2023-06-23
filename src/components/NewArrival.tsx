import React, { useEffect, useState, useContext } from 'react'
import { adminInstance } from '../api/axios'
import '../styles/layout/NewArrival.scss'
import { Link } from 'react-router-dom'
import { RecentlyContext } from 'contexts/index'
import { Product } from 'types/index'

const NewArrival = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await adminInstance.get('/products')

        const filteredProducts = response.data.filter(
          (product: { tags: string | string[] }) => product.tags.includes('NEW')
        )
        setNewProducts(filteredProducts)
      } catch (error) {
        console.error('Error fetching products', error)
      }
    }

    fetchProducts()
  }, [])

  const calculateDiscountedPrice = (price: number, discountRate?: number) => {
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
    <div className="NewArrival">
      <div className="Inner">
        <h2 className="Title">NEW ARRIVAL</h2>
        <h3 className="SubTitle">콜리에 새롭게 들어온 제품을 소개합니다.</h3>
        <div className="Products">
          {newProducts.map(product => (
            <div key={product.id}>
              <Link
                to={`/products/${product.id}`}
                onClick={() => onSaveProductRecently(product)}>
                <div className="Image">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div>
                <div className="Title">{product.title}</div>
              </Link>
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

export { NewArrival }
