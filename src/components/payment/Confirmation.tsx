import styles from 'src/styles/components/payment/Confirmation.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { CartProduct } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'
import { transactPayment } from 'api/paymentRequests'
import { CartContext } from 'contexts/index'
import { useState, useContext, useEffect } from 'react'
import { Modal } from 'components/index'
import { ModalProps } from '@/types'

export const Confirmation = (props: any) => {
  const navigate = useNavigate()
  const { setUserCart } = useContext(CartContext)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)
  const [isModalShow, setIsModalShow] = useState<boolean>(false)

  const receipt = useLocation().state.products
  console.log(receipt)
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

  // productId: string // 거래할 제품 ID (필수!) receipt.product.id
  // accountId: string // 결제할 사용자 계좌 ID (필수!) - props.selected
  const paymentHandler = (pro: string, acc: string) => {
    transactPayment({ productId: pro, accountId: acc })
  }

  useEffect(() => {
    if (isModalShow) {
      setModalProps({
        title: '결제완료',
        isTwoButton: false,
        content: '결제가 완료되었습니다.',
        okButtonText: '확인',
        onClickOkButton: () => {
          navigate('/success')
        }
      })
    }
  }, [isModalShow, navigate])

  return (
    <div className={styles.container}>
      <div className={styles.agree}>구매조건 확인 및 결제진행 동의</div>
      <div className={styles.check}>
        주문 내용을 확인하였으며 약관에 동의합니다.
      </div>
      <button
        className={styles.confirm}
        onClick={() => {
          receipt.map((item: CartProduct) => {
            paymentHandler(item.product.id, props.selected)
          })
          setIsModalShow(true)
          setUserCart([])
        }}>
        {(total - (total - discountedPrice) + delivery).toLocaleString()}원
        결제하기
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
