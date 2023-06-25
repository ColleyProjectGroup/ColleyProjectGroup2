import styles from 'src/styles/components/payment/PriceInfo.module.scss'
import { useLocation } from 'react-router-dom'

export const PriceInfo = () => {
  const receipt = useLocation().state
  return (
    <>
      <div className={styles.container}>
        <h3>결제 정보</h3>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <span>주문상품</span>
            <span className={styles.numbers}>
              {receipt.prevPrice.toLocaleString()}원
            </span>
          </div>
          <div className={styles.block}>
            <span>배송비</span>
            <span className={styles.numbers}>+3,000원</span>
          </div>
          <div className={styles.block}>
            <span>할인/부가결제</span>
            <span className={styles.discount}>
              -
              {(
                receipt.prevPrice -
                receipt.prevPrice * (1 - receipt.discount / 100)
              ).toLocaleString()}
              <span>원</span>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.sum}>
        <span className={styles.total}>최종 결제 금액</span>
        <span className={styles.totalprice}>
          {(
            receipt.prevPrice * (1 - receipt.discount / 100) +
            3000
          ).toLocaleString()}
          원
        </span>
      </div>
    </>
  )
}
