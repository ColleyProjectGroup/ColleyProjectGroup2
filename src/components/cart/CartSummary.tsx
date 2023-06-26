import styles from 'styles/components/cart/cartSummary.module.scss'
import { Cart } from 'types/index'

export const CartSummary = ({ total, delivery, products }: Cart) => {
  return (
    <div className={styles.container}>
      <div className={styles.total}>
        <div className={styles.totalSummary}>
          <h3>주문상품</h3>
          <div className={styles.contents}>
            <div className={styles.content}>
              <h4>총 상품금액</h4>
              {/* PRICE.toLocaleString()원 */}
              <span>{products}원</span>
            </div>
            <div className={styles.content}>
              <h4>총 배송비 </h4>
              <span>{delivery}원</span>
            </div>
          </div>
          <div className={styles.totalPrice}>
            <h4>결제예정금액</h4>
            <span>{total}원</span>
          </div>
        </div>
      </div>
      <div className={styles.buttonArea}>
        <a className={styles.orderAll}>전체상품주문</a>
        <a className={styles.orderSelected}>선택상품주문</a>
      </div>
    </div>
  )
}
