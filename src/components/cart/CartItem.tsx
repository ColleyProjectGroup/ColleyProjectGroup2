import styles from 'styles/components/cart/cartItem.module.scss'
import { useState, useContext, useEffect } from 'react'
import { CartContext } from 'contexts/index'
import { Product, CartProduct } from 'types/index'

export const CartItem = ({ product, quantity }: CartProduct) => {
  const [number, setNumber] = useState(quantity)
  const { userCart, setUserCart } = useContext(CartContext)

  const filter = userCart.filter(item => item.product.id !== product.id)

  const plus = () => {
    setNumber(number + 1)
    // 로컬스토리지 동기화
    setUserCart([...filter, { product: product, quantity: number + 1 }])
  }

  const minus = () => {
    if (number === 1) {
      return
    } else {
      setNumber(number - 1)
      setUserCart([...filter, { product: product, quantity: number - 1 }])
    }
  }

  const sumPrice = number * product.price
  const deleteList = () => {
    setUserCart(userCart.filter(p => p.product.id !== product.id))
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
