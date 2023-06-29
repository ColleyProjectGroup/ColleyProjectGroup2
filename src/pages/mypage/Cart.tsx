import { CartHeader, CartFooter, CartProducts } from 'components/cart/index'
import styles from 'styles/components/cart/cart.module.scss'

export const Cart = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <CartHeader />
        <CartProducts />
        <CartFooter />
      </div>
    </>
  )
}
