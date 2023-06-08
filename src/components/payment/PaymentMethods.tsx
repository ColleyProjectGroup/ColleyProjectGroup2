import styles from 'src/styles/components/payment/PaymentMethods.module.scss'
export const PaymentMethods = () => {
  return (
    <div className={styles.container}>
      <h3>결제수단</h3>
      <div className={styles.addAccout}>
        <span>+</span>
        <span>계좌추가</span>
      </div>
    </div>
  )
}
