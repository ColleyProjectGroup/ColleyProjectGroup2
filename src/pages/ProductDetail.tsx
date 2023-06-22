import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { adminInstance } from '../api/axios'
import { Footer } from '@/components'
import { Products } from '../components/Products'
import '../styles/layout/ProductDetail.scss'
import { Product, RouteParams } from '../types/Products.interface'

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
        console.error('상품을 불러오는 중에 오류가 발생했습니다.', error)
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <div>로딩 중...</div>
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    const nonNegativeValue = value < 1 ? 1 : value
    setQuantity(nonNegativeValue)
  }

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
  }

  const calculateDiscountPrice = () => {
    if (product.discountRate) {
      const discountRate = product.discountRate / 100
      return product.price * (1 - discountRate)
    }
    return product.price
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
          <div className="Price">
            <div className="infoInner">
              <div className="infoleft">
                <span className="OriginalPrice">소비자가:</span>
              </div>
              <div>{product.price.toLocaleString()}원</div>
            </div>
            <div className="infoInner DiscountedPrice">
              <div className="infoleft">
                <span>판매가:</span>
              </div>
              <div>{calculateDiscountPrice().toLocaleString()}원</div>
            </div>
            <div className="infoInner">
              <div className="infoleft">
                <span>배송방법:</span>
              </div>
              <div className="infoleft">
                <span>국내 배송</span>
              </div>
            </div>
            <div className="infoInner">
              <div className="infoleft">
                <span>배송비:</span>
              </div>
              <div>
                <span>3,000원</span>
              </div>
            </div>
            <div>
              <span>(최소주문수량 1개 이상)</span>
            </div>
          </div>
          <div className="Quantity">
            <div className="QantityTitle">
              <label htmlFor="quantity">{product.title}</label>
            </div>
            <div className="QuantityControl">
              <button onClick={handleDecreaseQuantity}>-</button>
              <input
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
          </div>
          <div className="TotalPrice">
            <div>TOTAL:</div>
            <div>{calculateTotalPrice().toLocaleString()}원</div>
          </div>
          <div className="Buttons1">
            <button onClick={handleBuyNow}>바로 구매</button>
          </div>
          <div className="Buttons2">
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
      <div>
        <div className="etcProducts">
          <h2>YOU MAY ALSO LIKE</h2>
          <h3>함께 구매하면 좋을 관련 상품</h3>
        </div>
        <Products
          tagFilter={product.tags}
          limit={4}
        />
      </div>
      <Footer />
    </div>
  )
}

export { ProductDetail }
