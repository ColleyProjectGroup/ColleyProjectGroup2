import { useEffect, useRef } from 'react'
import {
  loadPaymentWidget,
  PaymentWidgetInstance
} from '@tosspayments/payment-widget-sdk'
import styles from 'src/styles/components/payment/PaymentMethods.module.scss'
export const PaymentMethods = () => {
  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
  const customerKey = 'YbX2HuSlsC9uVJW6NMRMj'

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null) //인스턴스 저장 - useRef
  const price = 50_000

  useEffect(() => {
    ;(async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey) //인스턴스 생성

      paymentWidget.renderPaymentMethods('#payment-widget', price) //결제위젯 렌더링

      paymentWidgetRef.current = paymentWidget
    })()
  }, [])

  return (
    <div className={styles.container}>
      <h3>결제수단</h3>
      {/* <div className={styles.addAccout}>
        <span>+</span>
        <span>계좌추가</span>
      </div> */}
      <div id="payment-widget" />
    </div>
  )
}
