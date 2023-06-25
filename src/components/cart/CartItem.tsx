import styles from 'styles/components/cart/cartItem.module.scss'
import { useState } from 'react'

export const CartItem = () => {
  const [number, setNumber] = useState(1)

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
        src=""
        className={styles.thumbnail}
      />
      <div className={styles.productInfo}>
        <div className={styles.name}>제품명</div>
        <div className={styles.price}>가격</div>
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
