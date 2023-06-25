import styles from 'styles/components/cart/cartSummary.module.scss'

export const CartSummary = () => {
  return (
    <div className={styles.container}>
      <div className={styles.total}>
        <div className={styles.totalSummary}>
          <h3>주문상품</h3>
          <div className={styles.contents}>
            <div className={styles.content}>
              <h4>TOTAL</h4>
              <span>PRICE1</span>
            </div>
            <div className={styles.content}>
              <h4>DELIVERY</h4>
              <span>PRICE2</span>
            </div>
          </div>
          <div className={styles.totalPrice}></div>
        </div>
      </div>
    </div>
  )
}
