import { useEffect, useRef } from 'react'
import {
  loadPaymentWidget,
  PaymentWidgetInstance
} from '@tosspayments/payment-widget-sdk'
import { Confirmation } from 'components/payment'
import styles from 'src/styles/components/payment/PaymentMethods.module.scss'
export const PaymentMethods = () => {
  const clientKey = 'test_ck_P24xLea5zVAxXyyGMxb3QAMYNwW6'
  const customerKey = 'YbX2HuSlsC9uVJW6NMRMj'

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null) //인스턴스 저장 - useRef
  const price = 50_000

  const pay = async () => {
    const paymentWidget = paymentWidgetRef.current

    try {
      await paymentWidget?.requestPayment({
        orderId: '213asda21', //상품 주문번호 연동
        orderName: '토스 티셔츠 외 2건', //상품명 연동
        customerName: '김토스', //사용자 입력 정보
        customerEmail: 'customer123@gmail.com', //사용자 입력 정보
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    ;(async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey) //인스턴스 생성

      paymentWidget.renderPaymentMethods('#payment-widget', price) //결제위젯 렌더링

      paymentWidgetRef.current = paymentWidget
    })()
  }, [])

  return (
    <div className={styles.container}>
      {/* <h3>결제수단</h3> */}
      {/* <div className={styles.addAccout}>
        <span>+</span>
        <span>계좌추가</span>
      </div> */}
      <div id="payment-widget" />
      <Confirmation confirm={pay} />
    </div>
  )
}
