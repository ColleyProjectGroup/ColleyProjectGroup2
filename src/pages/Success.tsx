import styles from 'styles/pages/success.module.scss'
import { ProductInfo, PriceInfo } from 'components/payment/index'

export const Success = () => {
  return (
    <div className={styles.container}>
      <h2>결제 상세</h2>
      <div className={styles.product}>
        <ProductInfo />
      </div>
      <div className={styles.price}>
        <PriceInfo />
      </div>
      <div className={styles.buttonArea}>
        <a
          className={styles.home}
          href="/home">
          HOME
        </a>
        <a
          className={styles.orders}
          href="/mypage">
          MYPAGE
        </a>
      </div>
    </div>
  )
}
