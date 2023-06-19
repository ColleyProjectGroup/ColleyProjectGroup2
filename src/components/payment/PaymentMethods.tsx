import { useEffect, useRef, useState, useContext } from 'react'
import {
  loadPaymentWidget,
  PaymentWidgetInstance
} from '@tosspayments/payment-widget-sdk'
import { Modal } from '@/components'
import { Confirmation, BankSelection } from 'components/payment'
import styles from 'src/styles/components/payment/PaymentMethods.module.scss'
import { UsernameContext } from 'contexts/UsernameContext'
import { UseremailContext } from 'contexts/UseremailContext'
import { ModalProps } from '@/types'
import { getBankLists, getAccounts } from '@/api/paymentRequests'

export const PaymentMethods = () => {
  const { name } = useContext(UsernameContext)
  const { email } = useContext(UseremailContext)
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)

  const modalCancelHandler = () => {
    setIsModalShow(false)
  }

  const modalOpenHandler = () => {
    setIsModalShow(true)
    setModalProps({
      title: '계좌 추가',
      // content: ``,
      isTwoButton: true,
      okButtonText: '추가',
      onClickOkButton: getAccounts,
      cancelButtonText: '취소',
      onClickCancelButton: modalCancelHandler
    })
  }

  const clientKey = 'test_ck_P24xLea5zVAxXyyGMxb3QAMYNwW6'
  const customerKey = 'YbX2HuSlsC9uVJW6NMRMj'

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null) //인스턴스 저장 - useRef
  const price = 50_000 //결제정보 => 최종상품가격 연동

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
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
        onClick={modalOpenHandler}>
        <span>+</span>
        <span>계좌추가</span>
      </div>
      <span className={styles.addAccoutText}>
        계좌를 추가하지 않을 시 결제가 진행되지 않습니다.
      </span>
      <Confirmation />
      {isModalShow && modalProps ? (
        <Modal
          isTwoButton={modalProps.isTwoButton}
          title={modalProps.title}
          okButtonText={modalProps.okButtonText}
          onClickOkButton={modalProps.onClickOkButton}
          cancelButtonText={modalProps.cancelButtonText}
          onClickCancelButton={modalProps.onClickCancelButton}>
          <BankSelection />
        </Modal>
      ) : null}
    </div>
  )
}
