import { useEffect, useRef, useState, useContext } from 'react'
import {
  loadPaymentWidget,
  PaymentWidgetInstance
} from '@tosspayments/payment-widget-sdk'
import { Modal } from '@/components'
import { Confirmation } from 'components/payment'
import styles from 'src/styles/components/payment/PaymentMethods.module.scss'
import { UsernameContext } from 'contexts/UsernameContext'
import { UseremailContext } from 'contexts/UseremailContext'

export const PaymentMethods = () => {
  const { name } = useContext(UsernameContext)
  const { email } = useContext(UseremailContext)
  const [modalOpen, setModalOpen] = useState(false)

  const clientKey = 'test_ck_P24xLea5zVAxXyyGMxb3QAMYNwW6'
  const customerKey = 'YbX2HuSlsC9uVJW6NMRMj'

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null) //인스턴스 저장 - useRef
  const price = 50_000 //결제정보 => 최종상품가격 연동

  useEffect(() => {
    ;(async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey) //인스턴스 생성

      paymentWidget.renderPaymentMethods('#payment-widget', price) //결제위젯 렌더링

      paymentWidgetRef.current = paymentWidget
    })()
  }, [])

  return (
    <div className={styles.container}>
      <div id="payment-widget" />
      <div
        className={styles.addAccout}
        onClick={() => {
          setModalOpen(!modalOpen)
          console.log(modalOpen)
        }}>
        <span>+</span>
        <span>계좌추가</span>
      </div>
      <Confirmation />
      {/* <Modal className={`${modalOpen ? '' : 'hidden'}`} /> */}
    </div>
  )
}
