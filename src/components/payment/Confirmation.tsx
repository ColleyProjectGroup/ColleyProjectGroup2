import styles from 'src/styles/components/payment/Confirmation.module.scss'
import { useLocation } from 'react-router-dom'

export const Confirmation = (props: any) => {
  const receipt = useLocation().state

  return (
    <div className={styles.container}>
      <div className={styles.agree}>구매조건 확인 및 결제진행 동의</div>
      <div className={styles.check}>
        주문 내용을 확인하였으며 약관에 동의합니다.
      </div>
      <button
        className={styles.confirm}
        onClick={props.confirm}>
        {(
          receipt.prevPrice * (1 - receipt.discount / 100) +
          3000
        ).toLocaleString()}
        원 결제하기
      </button>
    </div>
  )
}
