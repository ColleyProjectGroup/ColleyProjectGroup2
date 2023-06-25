import { CartItem, CartSummary } from 'components/cart/index'
import styles from 'styles/components/cart/cartProducts.module.scss'
export const CartProducts = () => {
  return (
    <>
      <div className={styles.container}>
        <CartItem />
        <CartSummary />
      </div>
    </>
  )
}
