import { CartItem, CartSummary } from 'components/cart/index'
import styles from 'styles/components/cart/cartProducts.module.scss'
import { CartContext } from 'contexts/index'
import { useContext, useState } from 'react'
import { CartProduct } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'

export const CartProducts = () => {
  const { userCart } = useContext(CartContext)
  // 하나의 요소가 체크됐을 경우, 요소를 Set에 추가
  const [checkedItems, setCheckedItems] = useState(new Set())
  // 전체선택에 대한 상태값
  const [isAllChecked, setIsAllChecked] = useState(false)
  console.log(checkedItems)

  // 하나의 요소를 선택할 때의 상태관리 함수 => props(CartItem)
  const checkedItemHandler = (id: string, isChecked: boolean) => {
    if (isChecked) {
      checkedItems.add(id)
      console.log(checkedItems)
      setCheckedItems(checkedItems)
      // 선택됐던 것이 해제된경우
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id)
      console.log(checkedItems)
      setCheckedItems(checkedItems)
    }
  }
  const allCheckedHandler = ({ target }) => {
    if (target.checked) {
      setCheckedItems(new Set(userCart.map(({ product }) => product.id)))
      setIsAllChecked(true)
    } else {
      checkedItems.clear()
      setCheckedItems(checkedItems)
      setIsAllChecked(false)
    }
  }
  const calculated = userCart.reduce((acc: number, cur: CartProduct) => {
    const discounted = calculateDiscountedPrice(
      cur.product.price,
      cur.product.discountRate
    )
    return acc + discounted * cur.quantity
  }, 0)
  const delivery = 3000

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>장바구니 상품</div>
          <h4 className={styles.selected}>일반상품 ({userCart.length})</h4>
          {userCart.map(item => (
            <CartItem
              product={item.product}
              quantity={item.quantity}
              key={item.product.id}
              checkedItemHandler={checkedItemHandler}
              isAllChecked={isAllChecked}
            />
          ))}
          <div className={styles.summary}>
            <h5>[기본배송]</h5>
            <div>
              상품구매금액 {calculated.toLocaleString()} + 배송비{' '}
              {delivery.toLocaleString()}
            </div>
            <div>합계 : {(calculated + delivery).toLocaleString()}원</div>
          </div>
          <input
            type="checkbox"
            onClick={e => allCheckedHandler(e)}
          />
        </div>

        <CartSummary
          products={calculated.toLocaleString()}
          delivery={delivery.toLocaleString()}
          total={(calculated + delivery).toLocaleString()}
        />
      </div>
    </>
  )
}
