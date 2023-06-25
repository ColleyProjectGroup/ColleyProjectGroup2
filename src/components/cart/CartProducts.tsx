import { CartItem, CartSummary } from 'components/cart/index'
import styles from 'styles/components/cart/cartProducts.module.scss'
export const CartProducts = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>장바구니 상품</div>
          {/* PRODUCTS QUANTITY */}
          <h4 className={styles.selected}>일반상품{}</h4>
          {/* MAP */}
          <CartItem />
          <div className={styles.summary}></div>
        </div>
        <CartSummary />
      </div>
    </>
  )
}
