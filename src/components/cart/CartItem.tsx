import styles from 'styles/components/cart/cartItem.module.scss'

export const CartItem = () => {
  return (
    <div className={styles.itemBox}>
      <input type="checkbox" />
      <div className={styles.thumbnail}>으악</div>
      <div className={styles.productInfo}>
        <div className={styles.name}>으악2</div>
        <div className={styles.price}>으악3</div>
        <div className={styles.amount}>으악4</div>
      </div>
      <div className={styles.sumPrice}>으악5</div>
      <span className={styles.delete}>으악6</span>
    </div>
  )
}
