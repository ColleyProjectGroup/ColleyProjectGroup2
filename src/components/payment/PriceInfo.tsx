import styles from 'src/styles/components/payment/PriceInfo.module.scss'
import { useLocation } from 'react-router-dom'
import { CartProduct } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'

export const PriceInfo = () => {
  const receipt = useLocation().state.products
  const total = receipt.reduce((acc: number, cur: CartProduct) => {
    return acc + cur.product.price * cur.quantity
  }, 0)
  const discountedPrice = receipt.reduce((acc: number, cur: CartProduct) => {
    const discounted = calculateDiscountedPrice(
      cur.product.price,
      cur.product.discountRate
    )
    return acc + discounted * cur.quantity
  }, 0)
  const delivery = 3000

  return (
    <>
      <div className={styles.container}>
        <h3>결제 정보</h3>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <span>주문상품</span>
            <span className={styles.numbers}>{total.toLocaleString()}원</span>
          </div>
          <div className={styles.block}>
            <span>배송비</span>
            <span className={styles.numbers}>+3,000원</span>
          </div>
          <div className={styles.block}>
            <span>할인/부가결제</span>
            <span className={styles.discount}>
              {(total - discountedPrice).toLocaleString()}
              <span>원</span>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.sum}>
        <span className={styles.total}>최종 결제 금액</span>
        <span className={styles.totalprice}>
          {(total - (total - discountedPrice) + delivery).toLocaleString()}원
        </span>
      </div>
    </>
  )
}
