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
      <div className={styles.thumbnail}>썸네일</div>
      <div className={styles.productInfo}>
        <div className={styles.name}>제품명</div>
        <div className={styles.price}>가격</div>
        <div className={styles.amount}>
          <button
            className={styles.down}
            onClick={minus}>
            -
          </button>
          <div className={styles.number}>{number}</div>
          <button
            className={styles.up}
            onClick={plus}>
            +
          </button>
        </div>
      </div>
      <div className={styles.sumPrice}>총 가격</div>
      <span className={styles.delete}>x</span>
    </div>
  )
}
