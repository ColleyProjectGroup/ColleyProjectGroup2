import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adminInstance } from 'api/index'
import { Footer, Products, Modal } from 'components/index'
import 'styles/layout/ProductDetail.scss'
import { Product, RouteParams } from 'types/index'
import { ModalProps } from 'types/index'
import { LoginContext, WishListContext, CartContext } from 'contexts/index'

export const ProductDetail = () => {
  const { id } = useParams<RouteParams>()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { userCart, setUserCart } = useContext(CartContext)
  const navigate = useNavigate()
  const { wishList, setWishList } = useContext(WishListContext)
  const { isLogined } = useContext(LoginContext)
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await adminInstance.get(`/products/${id}`)
        setProduct(response.data)
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
    if (isLogined) {
      navigate('/payment', {
        state: {
          //상품정보 데이터
          products: [
            {
              product: product,
              quantity: quantity
            }
          ]
        }
      })
    } else {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.')
      navigate('/signin')
    }
  }

  const handleAddToCart = () => {
    // 장바구니 기능
    const findProduct = userCart.find(item => item.product.id === product.id)
    if (findProduct) {
      findProduct.quantity += quantity
      const filter = userCart.filter(item => item.product.id !== product.id)
      setUserCart([...filter, findProduct])
    } else {
      setUserCart([...userCart, { product, quantity: quantity }])
    }
    setIsModalShow(true)
    setModalProps({
      title: '장바구니',
      content: '장바구니에 추가가 완료되었습니다.',
      isTwoButton: false,
      okButtonText: '확인',
      onClickOkButton: () => setIsModalShow(false)
    })
  }

  // 위시 리스트 저장 처리
  const onSaveWishList = (product: Product) => {
    const isExist = wishList.find(p => p.id === product.id)
    if (!isExist) {
      setWishList([...wishList, product])
      setIsModalShow(true)
      setModalProps({
        title: '관심상품 등록',
        content: '관심상품으로 등록되었습니다.',
        isTwoButton: false,
        okButtonText: '확인',
        onClickOkButton: () => setIsModalShow(false)
      })
    } else {
      setIsModalShow(true)
      setModalProps({
        title: '오류',
        content: '이미 관심상품으로 등록된 상품입니다.',
        isTwoButton: false,
        okButtonText: '확인',
        onClickOkButton: () => setIsModalShow(false)
      })
    }
  }

  const handleAddToWishlist = () => {
    if (isLogined) {
      onSaveWishList(product)
    } else {
      // 로그인 안내
      setIsModalShow(true)
      setModalProps({
        title: '관심상품 등록',
        content: '로그인이 필요한 서비스입니다.',
        isTwoButton: false,
        okButtonText: '확인',
        onClickOkButton: () => {
          setIsModalShow(false)
        }
      })
    }
  }

  return (
    <div className="product-detail">
      <div className="detailInner">
        <div className="image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
        <div className="info">
          <div className="title">{product.title}</div>
          <div className="price">
            <div className="infoInner">
              <div className="infoleft">
                <span className="originalPrice">소비자가</span>
              </div>
              <div>{product.price.toLocaleString()}원</div>
            </div>
            <div className="infoInner discount-price">
              <div className="infoleft">
                <span>판매가</span>
              </div>
              <div>{calculateDiscountPrice().toLocaleString()}원</div>
            </div>
            <div className="infoInner">
              <div className="infoleft">
                <span>배송방법</span>
              </div>
              <div className="infoleft">
                <span>국내 배송</span>
              </div>
            </div>
            <div className="infoInner">
              <div className="infoleft">
                <span>배송비</span>
              </div>
              <div>
                <span>3,000원</span>
              </div>
            </div>
            <div>
              <span>(최소주문수량 1개 이상)</span>
            </div>
          </div>
          <div className="quantity">
            <div className="quantityControl">
              <button onClick={handleDecreaseQuantity}>-</button>
              <input
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                disabled={true}
              />
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
          </div>
          <div className="totalPrice">
            <div>TOTAL:</div>
            <div>{calculateTotalPrice().toLocaleString()}원</div>
          </div>
          <div className="button--now">
            <button onClick={handleBuyNow}>바로 구매</button>
          </div>
          <div className="button--cart">
            <button onClick={handleAddToCart}>장바구니</button>
            <button onClick={handleAddToWishlist}>위시 리스트</button>
          </div>
        </div>
      </div>
      <div className="details">
        <div className="inner">
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

      {isModalShow && modalProps ? (
        <Modal
          isTwoButton={modalProps.isTwoButton}
          title={modalProps.title}
          content={modalProps.content}
          okButtonText={modalProps.okButtonText}
          onClickOkButton={modalProps.onClickOkButton}
          cancelButtonText={modalProps.cancelButtonText}
          onClickCancelButton={modalProps.onClickCancelButton}
        />
      ) : null}
    </div>
  )
}
