import styles from 'styles/components/cart/cartItem.module.scss'
import { useState, useContext } from 'react'
import { CartContext } from 'contexts/index'
import { Product } from 'types/index'

export const CartItem = ({ product }: { product: Product }) => {
  const [number, setNumber] = useState(1)
  const { userCart } = useContext(CartContext)

  console.log(userCart)

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

  return (
    <div className={styles.itemBox}>
      <input type="checkbox" />
      <img
        src={product.thumbnail}
        className={styles.thumbnail}
      />
      <div className={styles.productInfo}>
        <div className={styles.name}>{product.title}</div>
        <div className={styles.price}>{product.price}</div>
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
      <div className={styles.sumPrice}>총 가격</div>
      <span className={styles.delete}>x</span>
    </div>
  )
}
