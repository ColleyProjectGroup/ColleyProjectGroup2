import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { adminInstance } from '../api/axios'
import { Footer } from '@/components'
import '../styles/layout/ProductDetail.scss'

interface Product {
  id: number
  thumbnail: string
  title: string
  price: number
  discountRate?: number // 할인율을 나타내는 필드
  photo: string
  // Add other fields for product information
}

interface RouteParams {
  id: string
  [key: string]: string | undefined
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<RouteParams>()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await adminInstance.get(`/products/${id}`)
        setProduct(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching product', error)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    const nonNegativeValue = value < 1 ? 1 : value
    setQuantity(nonNegativeValue)
  }

  const calculateDiscountPrice = () => {
    if (product.discountRate) {
      const discountRate = product.discountRate / 100
      return product.price * (1 - discountRate)
    }
    return null
  }

  const calculateTotalPrice = () => {
    const discountPrice = calculateDiscountPrice()
    const price = discountPrice !== null ? discountPrice : product.price
    return price * quantity
  }

  const handleBuyNow = () => {
    // 구매하기 기능
  }

  const handleAddToCart = () => {
    // 장바구니 기능
  }

  const handleAddToWishlist = () => {
    // 위시 리스트 기능
  }

  return (
    <div className="ProductDetail">
      <div className="Inner">
        <div className="Image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
        <div className="Info">
          <div className="Title">{product.title}</div>
          {product.discountRate && (
            <div className="Price">
              <span className="OriginalPrice">
                소비자가: <s>{product.price.toLocaleString()}원</s>
              </span>
              <br />
              <span className="DiscountedPrice">
                할인가: {calculateDiscountPrice()?.toLocaleString()}원
              </span>
              <br />
              <span>국내·해외배송 : 국내 배송</span> <br />
              <span>배송방법 : 택배</span> <br />
              <span>배송비 : 3,000원</span>
            </div>
          )}
          {!product.discountRate && (
            <div className="Price">
              소비자가: {product.price.toLocaleString()}원
            </div>
          )}
          <div className="Quantity">
            <label htmlFor="quantity">주문수량:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="TotalPrice">
            TOTAL (QUANTITY): {calculateTotalPrice().toLocaleString()}원
          </div>
          <div className="Buttons">
            <button onClick={handleBuyNow}>바로 구매</button>
            <button onClick={handleAddToCart}>장바구니</button>
            <button onClick={handleAddToWishlist}>위시 리스트</button>
          </div>
        </div>
      </div>
      <div className="Details">
        <div className="Inner">
          <img
            src={product.photo}
            alt={product.title}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export { ProductDetail }
