import { useEffect, useRef, useState, useContext, useCallback } from 'react'
import {
  loadPaymentWidget,
  PaymentWidgetInstance
} from '@tosspayments/payment-widget-sdk'
import { Modal } from '@/components'
import { Confirmation, BankSelection } from 'components/payment'
import styles from 'src/styles/components/payment/PaymentMethods.module.scss'
import {
  UsernameContext,
  UseremailContext,
  PhoneNumberContext,
  BankContext,
  AccountNumberContext
} from 'contexts/index'

import { ModalProps } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation'
import { Bank } from '@/types/BankAccounts.interface'
import {
  removeAccount,
  getAccounts,
  createAccount
} from '@/api/paymentRequests'

export const PaymentMethods = () => {
  const { name } = useContext(UsernameContext)
  const { email } = useContext(UseremailContext)
  // ###결제완료 요청시 함께 전송 데이터
  const { phoneNumber } = useContext(PhoneNumberContext)
  const { bank } = useContext(BankContext)
  const { accountNumber } = useContext(AccountNumberContext)

  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)
  const [accountData, setAccountData] = useState<Bank[]>([])

  SwiperCore.use([Navigation])

  //MODAL HANDLERS
  const modalCancelHandler = () => {
    setIsModalShow(false)
  }
  const modalOpenHandler = useCallback(() => {
    if (phoneNumber.length === 11) {
      setIsModalShow(true)
    } else {
      alert('휴대전화번호를 정확히 입력해주세요.')
    }
  }, [phoneNumber])

  // ACCOUNTS FUNCTIONS
  const createAndRender = useCallback(async () => {
    await createAccount({
      bankCode: bank, //BankSelection => options (useContext)
      accountNumber: accountNumber, //BankSelection => input (useContext)
      phoneNumber: phoneNumber,
      signature: true
    })
    await getAccounts().then(response => {
      setAccountData(response)
    })
  }, [bank, accountNumber, phoneNumber])

  const removeAndRender = async (val: string) => {
    await removeAccount({
      accountId: val,
      signature: true
    })
    await getAccounts().then(response => {
      setAccountData(response)
    })
  }

  // ######TOSS PAYMENTS WIDGET
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
  // INITIAL ACCOUNTS RENDER
  useEffect(() => {
    getAccounts().then(response => {
      setAccountData(response)
    })
  }, [])

  useEffect(() => {
    if (phoneNumber.length === 11) {
      setModalProps({
        title: '계좌 추가',
        isTwoButton: true,
        okButtonText: '추가',
        onClickOkButton: () => {
          // *********ACCOUNT NUMBER VALIDATION REQUIRED*********
          createAndRender()
        },
        cancelButtonText: '취소',
        onClickCancelButton: modalCancelHandler
      })
    }
  }, [bank, accountNumber, phoneNumber])

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
        {/* 생성된 계좌 */}
        {accountData.map(item => (
          <SwiperSlide key={item.id}>
            <div className={styles.addAccout}>
              <span>
                {item.bankName}
                {item.accountNumber}
                <a
                  onClick={() => {
                    removeAndRender(item.id)
                  }}>
                  ✖
                </a>
              </span>
              <span>{item.balance}</span>
            </div>
          </SwiperSlide>
        ))}
        {/* 선택계좌 FOCUS COLOR? */}
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
