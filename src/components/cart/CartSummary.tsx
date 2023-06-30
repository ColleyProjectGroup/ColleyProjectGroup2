import styles from 'styles/components/cart/cartSummary.module.scss'
import { CartProduct } from 'types/index'
import { useNavigate } from 'react-router-dom'
import { CartContext, LoginContext } from 'contexts/index'
import { useContext, useCallback } from 'react'

export const CartSummary = ({
  total,
  filtered
}: {
  total: number
  filtered: CartProduct[]
}) => {
  const navigate = useNavigate()
  const { userCart } = useContext(CartContext)
  const { isLogined } = useContext(LoginContext)
  console.log(isLogined)
  const orderAllHandler = () => {
    if (!isLogined) {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.')
      navigate('/signin')
    }

    const itemsInCart = userCart.length !== 0

    if (isLogined && itemsInCart) {
      navigate('/payment', {
        state: {
          //장바구니 내 상품정보 데이터
          products: [...userCart]
        }
      })
    }
    if (isLogined && !itemsInCart) {
      alert('장바구니에 상품을 추가 후 다시 시도해주세요.')
    }
  }

  const orderSelectedHandler = useCallback(() => {
    if (!isLogined) {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.')
      navigate('/signin')
    }

    const filteredItemsInCart = filtered.length !== 0

    if (isLogined && filteredItemsInCart) {
      navigate('/payment', {
        state: {
          //상품정보 데이터
          products: [...filtered]
        }
      })
    }
    if (isLogined && !filteredItemsInCart) {
      alert('장바구니에 상품을 선택 후 다시 시도해주세요.')
    }
  }, [filtered, isLogined, navigate])

  const delivery = 3000

  return (
    <div className={styles.container}>
      <div className={styles.total}>
        <div className={styles.totalSummary}>
          <h3>선택상품</h3>
          <div className={styles.contents}>
            <div className={styles.content}>
              <h4>총 상품금액</h4>
              <span>{total.toLocaleString()}원</span>
            </div>
            <div className={styles.content}>
              <h4>총 배송비 </h4>
              <span>{delivery.toLocaleString()}원</span>
            </div>
          </div>
          <div className={styles.totalPrice}>
            <h4>결제예정금액</h4>
            <span>{(total + delivery).toLocaleString()}원</span>
          </div>
        </div>
      </div>
      <div className={styles.buttonArea}>
        <a
          className={styles.orderAll}
          onClick={orderAllHandler}>
          전체상품주문
        </a>
        <a
          className={styles.orderSelected}
          onClick={orderSelectedHandler}>
          선택상품주문
        </a>
      </div>
    </div>
  )
}
