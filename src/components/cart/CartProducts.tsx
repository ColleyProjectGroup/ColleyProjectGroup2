import { CartItem, CartSummary } from 'components/cart/index'
import styles from 'styles/components/cart/cartProducts.module.scss'
import { CartContext } from 'contexts/index'
import { useContext } from 'react'
import { Cart } from '@/pages'
import { Product } from 'types/index'

export const CartProducts = () => {
  const { userCart } = useContext(CartContext)
  const calculated = userCart.reduce((acc: number, cur: Product) => {
    return acc + cur.price
  }, 0)
  const delivery = 3000

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>장바구니 상품</div>
          {/* PRODUCTS QUANTITY */}
          <h4 className={styles.selected}>일반상품 ({userCart.length})</h4>
          {/* MAP */}
          {userCart.map(product => (
            <CartItem product={product} />
          ))}
          <div className={styles.summary}>
            <h5>[기본배송]</h5>
            <div>
              상품구매금액 {calculated.toLocaleString()} + 배송비{' '}
              {delivery.toLocaleString()}
            </div>
            <div>합계 : {(calculated + delivery).toLocaleString()}원</div>
          </div>
          <a>전체선택</a>
        </div>

        <CartSummary
          products={calculated.toLocaleString()}
          delivery={delivery.toLocaleString()}
          total={(calculated + delivery).toLocaleString()}
        />
      </div>
    </>
  )
}
