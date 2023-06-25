import { CartItem, CartSummary } from 'components/cart/index'
import styles from 'styles/components/cart/cartProducts.module.scss'
export const CartProducts = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* MAP */}
          <CartItem />
          <div className={styles.summary}></div>
        </div>
        <CartSummary />
      </div>
    </>
  )
}
