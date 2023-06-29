import styles from 'src/styles/components/payment/Confirmation.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { CartProduct } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'
import { transactPayment } from 'api/paymentRequests'
import {
  CartContext,
  UseremailContext,
  UsernameContext,
  UserAddressContext,
  PhoneNumberContext,
  AddressDetailContext
} from 'contexts/index'
import { useState, useContext, useEffect } from 'react'
import { Modal } from 'components/index'
import { ModalProps } from '@/types'
import { Bank } from 'types/index'

export const Confirmation = ({
  accountData,
  selected
}: {
  accountData: Bank[]
  selected: string
}) => {
  const navigate = useNavigate()
  const { setUserCart } = useContext(CartContext)
  const { address } = useContext(UserAddressContext)
  const { name } = useContext(UsernameContext)
  const { phoneNumber } = useContext(PhoneNumberContext)
  const { email } = useContext(UseremailContext)
  const { addressDetail } = useContext(AddressDetailContext)

  const [modalProps, setModalProps] = useState<ModalProps | null>(null)
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  //receipt - 개별 상품 or 장바구니 상품 정보
  const receipt = useLocation().state.products
  const total = receipt.reduce((acc: number, cur: CartProduct) => {
    return acc + cur.product.price * cur.quantity
  }, 0)
  const discountedPrice = receipt.reduce((acc: number, cur: CartProduct) => {
    const discounted = calculateDiscountedPrice(
      cur.product.price,
      cur.product.discountRate
    )
    return acc + discounted * cur.quantity
  }, 0)
  const delivery = 3000

  const paymentHandler = (pro: string, acc: string) => {
    transactPayment({ productId: pro, accountId: acc })
  }
  // console.log(receipt)
  useEffect(() => {
    if (isModalShow) {
      setModalProps({
        title: '결제완료',
        isTwoButton: false,
        content: '결제가 완료되었습니다.',
        okButtonText: '확인',
        onClickOkButton: () => {
          navigate('/success', {
            state: {
              //상품정보 데이터
              products: [...receipt],
              address: address,
              name: name,
              email: email,
              phoneNumber: phoneNumber,
              addressDetail: addressDetail
            }
          })
        }
      })
    }
  }, [
    isModalShow,
    navigate,
    receipt,
    address,
    addressDetail,
    phoneNumber,
    name,
    email
  ])
  const validateAndPay = () => {
    //계좌정보 / 사용자명 / 이메일 / 주소 / 휴대전화
    if (selected && name && email && address && phoneNumber) {
      // 계좌 목록 중 선택된 계좌를 찾아 '상품가격' 과 '선택된 계좌의 자산'을 비교
      const accountBalance = accountData.find(
        account => account.id === selected
      )?.balance
      if ((accountBalance as number) > total) {
        receipt.map((item: CartProduct) => {
          paymentHandler(item.product.id, selected)
        })
        setIsModalShow(true)
        setUserCart([])
      }
      if ((accountBalance as number) < total) {
        alert('계좌의 잔액이 부족합니다.')
      }
    } else {
      alert('필수입력정보를 다시 확인해주세요.')
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.agree}>구매조건 확인 및 결제진행 동의</div>
      <div className={styles.check}>
        주문 내용을 확인하였으며 약관에 동의합니다.
      </div>
      <button
        className={styles.confirm}
        onClick={validateAndPay}>
        <span>
          {(total - (total - discountedPrice) + delivery).toLocaleString()}
        </span>
        원 결제하기
      </button>
      {/* MODAL */}
      {isModalShow && modalProps ? (
        <Modal
          isTwoButton={modalProps.isTwoButton}
          title={modalProps.title}
          okButtonText={modalProps.okButtonText}
          onClickOkButton={modalProps.onClickOkButton}
          content={modalProps.content}
        />
      ) : null}
    </div>
  )
}
