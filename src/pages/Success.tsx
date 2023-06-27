import styles from 'styles/pages/success.module.scss'
import { ProductInfo, PriceInfo } from 'components/payment/index'
import { useLocation } from 'react-router-dom'

export const Success = () => {
  const info = useLocation().state

  return (
    <div className={styles.container}>
      <h2>결제 상세</h2>
      <div className={styles.product}>
        <ProductInfo />
      </div>
      <div className={styles.price}>
        <PriceInfo />
      </div>
      <h4 className={styles.heading}>배송정보</h4>
      <div className={styles.delivery}>
        <div className={styles.wrapper}>
          <span className={styles.title}>받는사람</span>
          <span className={styles.info}>{info.name}</span>
        </div>
        <div className={styles.wrapper}>
          <span className={styles.title}>주소</span>
          <span className={styles.info}>
            {info.address} / {info.addressDetail}
          </span>
        </div>
        <div className={styles.wrapper}>
          <span className={styles.title}>휴대전화</span>
          <span className={styles.info}>{info.phoneNumber}</span>
        </div>
        <div className={styles.wrapper}>
          <span className={styles.title}>이메일</span>
          <span className={styles.info}>{info.email}</span>
        </div>
      </div>
      {/* BUTTON */}
      <div className={styles.buttonArea}>
        <a
          className={styles.home}
          href="/">
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
