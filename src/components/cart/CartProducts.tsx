import { CartItem, CartSummary } from 'components/cart/index'
import styles from 'styles/components/cart/cartProducts.module.scss'
import { CartContext } from 'contexts/index'
import { useState, useCallback, useContext } from 'react'
import { Cart } from '@/pages'
import { CartProduct } from 'types/index'
import { CheckedContext } from 'contexts/index'

export const CartProducts = () => {
  const { isChecked, setIsChecked } = useContext(CheckedContext)
  const { userCart } = useContext(CartContext)
  const calculated = userCart.reduce((acc: number, cur: CartProduct) => {
    return acc + cur.product.price * cur.quantity
  }, 0)
  const delivery = 3000

  const CheckChanged = () => {
    setIsChecked(true)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>장바구니 상품</div>
          {/* PRODUCTS QUANTITY */}
          <h4 className={styles.selected}>일반상품 ({userCart.length})</h4>
          {/* MAP */}
          {userCart.map(item => (
            <CartItem
              product={item.product}
              quantity={item.quantity}
              key={item.product.id}
            />
          ))}
          <div className={styles.summary}>
            <h5>[기본배송]</h5>
            <div>
              상품구매금액 {calculated.toLocaleString()} + 배송비{' '}
              {delivery.toLocaleString()}
            </div>
            <div>합계 : {(calculated + delivery).toLocaleString()}원</div>
          </div>
          <a onClick={CheckChanged}>전체선택</a>
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
