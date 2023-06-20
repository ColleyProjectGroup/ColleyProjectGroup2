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
import { PhoneNumberContext } from 'contexts/PhoneNumberContext'
import { ModalProps } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation'
import { getBankLists, getAccounts, createAccount } from '@/api/paymentRequests'

export const PaymentMethods = () => {
  const { name } = useContext(UsernameContext)
  const { email } = useContext(UseremailContext)
  const { phoneNumber } = useContext(PhoneNumberContext)

  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)

  const modalCancelHandler = () => {
    setIsModalShow(false)
  }

  const modalOpenHandler = () => {
    if (phoneNumber.length === 11) {
      setIsModalShow(true)
      setModalProps({
        title: '계좌 추가',
        isTwoButton: true,
        okButtonText: '추가',
        onClickOkButton: () => {
          createAccount({
            bankCode: '088',
            accountNumber: '123456789012',
            phoneNumber: '01012345678',
            signature: true
          })
        },
        cancelButtonText: '취소',
        onClickCancelButton: modalCancelHandler
      })
    } else {
      alert('휴대전화번호를 정확히 입력해주세요.')
    }
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

  SwiperCore.use([Navigation])

  return (
    <div className={styles.container}>
      <div id="payment-widget" />
      <Swiper
        modules={Navigation}
        navigation={true}
        spaceBetween={500}
        centeredSlides={true}
        slidesPerView={1}>
        <SwiperSlide>
          <div
            className={styles.addAccout}
            onClick={modalOpenHandler}>
            <span>+</span>
            <span>계좌추가</span>
          </div>
          <span className={styles.addAccoutText}>
            계좌를 추가하지 않을 시 결제가 진행되지 않습니다.
          </span>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.addAccout}>
            <span>KB</span>
            <span>123123123123123</span>
            <span>3,000,000</span>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          {' '}
          <div className={styles.addAccout}>
            <span>KB</span>
            <span>123123123123123</span>
            <span>3,000,000</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <div className={styles.addAccout}>
            <span>KB</span>
            <span>123123123123123</span>
            <span>3,000,000</span>
          </div>
        </SwiperSlide> */}
      </Swiper>

      <Confirmation />
      {phoneNumber.length === 11 && isModalShow && modalProps ? (
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
