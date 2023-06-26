import { CartItem, CartSummary } from 'components/cart/index'
import styles from 'styles/components/cart/cartProducts.module.scss'
import { CartContext } from 'contexts/index'
import { useContext } from 'react'

export const CartProducts = () => {
  const { userCart } = useContext(CartContext)
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>장바구니 상품</div>
          {/* PRODUCTS QUANTITY */}
          <h4 className={styles.selected}>일반상품{}</h4>
          {/* MAP */}
          {userCart.map(product => (
            <CartItem
              product={product}
              key={product.id}
            />
          ))}
          <div className={styles.summary}>
            <h5>[기본배송]</h5>
            <div>
              상품구매금액 {} + 배송비 {}
            </div>
            <div>합계 : {}원</div>
          </div>
          <a>전체선택</a>
        </div>
        <CartSummary />
      </div>
    </>
  )
}
