import styles from 'styles/components/cart/cartItem.module.scss'
import { useState, useContext, useEffect } from 'react'
import { CartContext } from 'contexts/index'
import { Product } from 'types/index'

export const CartItem = ({ product }: { product: Product }) => {
  const [number, setNumber] = useState(1)
  const { userCart, setUserCart } = useContext(CartContext)

  const plus = () => {
    setNumber(number + 1)
  }

  const minus = () => {
    if (number === 1) {
      setNumber(number)
    } else {
      setNumber(number - 1)
    }
  }

  const sumPrice = number * product.price
  const deleteList = () => {
    setUserCart(userCart.filter(p => p !== product))
  }

  return (
    <div className={styles.itemBox}>
      <input type="checkbox" />
      <img
        src={product.thumbnail}
        className={styles.thumbnail}
      />
      <div className={styles.productInfo}>
        <div className={styles.name}>{product.title}</div>
        <div className={styles.price}>{product.price.toLocaleString()}원</div>
        <div className={styles.amount}>
          <div
            className={styles.down}
            onClick={minus}>
            -
          </div>
          <div className={styles.number}>{number}</div>
          <div
            className={styles.up}
            onClick={plus}>
            +
          </div>
        </div>
      </div>
      <div className={styles.sumPrice}>{sumPrice.toLocaleString()}원</div>
      <span
        className={`material-icons ${styles['delete']}`}
        onClick={deleteList}>
        close
      </span>
    </div>
  )
}
