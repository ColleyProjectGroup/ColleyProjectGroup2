import { CartItem, CartSummary } from 'components/cart/index'
import styles from 'styles/components/cart/cartProducts.module.scss'
import { CartContext, CheckedContext } from 'contexts/index'
import { useCallback, useContext, useState, useEffect, useMemo } from 'react'
import { CartProduct } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'

export const CartProducts = () => {
  const { userCart } = useContext(CartContext)
  // 하나의 요소가 체크됐을 경우, 요소를 Set에 추가
  const [checkedItems, setCheckedItems] = useState(new Set<string>())
  const [filtered, setFiltered] = useState<CartProduct[]>([])

  // 하나의 요소를 선택할 때의 상태관리 함수 => props(CartItem)
  const checkedItemHandler = (id: string, isChecked: boolean): void => {
    if (isChecked) {
      setCheckedItems(new Set([...checkedItems, id]))
      // 선택됐던 것이 해제된경우
    } else if (!isChecked && checkedItems.has(id)) {
      const newCheckedItems = Array.from(checkedItems).filter(
        checkedItem => checkedItem !== id
      )
      setCheckedItems(new Set([...newCheckedItems]))
    }
  }

  //전체선택 기능
  const allCheckedHandler = useCallback(() => {
    // 현재 선택된 상품 set size와 원래 장바구니 목록 사이즈 비교
    if (checkedItems.size !== userCart.length) {
      setCheckedItems(new Set(userCart.map(({ product }) => product.id)))
    } else {
      setCheckedItems(new Set()) // 전체선택 해제 시 빈 set
    }
  }, [checkedItems, userCart])

  useEffect(() => {
    setFiltered(userCart.filter(item => checkedItems.has(item.product.id)))
  }, [userCart, checkedItems])

  //총액 계산
  const total = useMemo(() => {
    return filtered.reduce((acc: number, cur: CartProduct) => {
      const discounted = calculateDiscountedPrice(
        cur.product.price,
        cur.product.discountRate
      )
      return acc + discounted * cur.quantity
    }, 0)
  }, [filtered])

  const delivery = 3000

  return (
    <>
      <CheckedContext.Provider value={{ checkedItems, setCheckedItems }}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.heading}>장바구니 상품</div>
            <h4 className={styles.selected}>일반상품 ({userCart.length})</h4>
            {/* 장바구니 내 개별 아이템 */}
            {userCart.map(item => (
              <CartItem
                product={item.product}
                quantity={item.quantity}
                key={item.product.id}
                checkedItemHandler={checkedItemHandler}
                isChecked={checkedItems.has(item.product.id)} // 선택된 상품 set에 포함되어 있으면 true
              />
            ))}
            <div className={styles.summary}>
              <h5>[기본배송]</h5>
              <div>
                상품구매금액 {total.toLocaleString()} + 배송비{' '}
                {delivery.toLocaleString()}
              </div>
              <div>합계 : {(total + delivery).toLocaleString()}원</div>
            </div>
            <label className={styles.pseudo}>
              전체선택
              <input
                type="checkbox"
                onClick={allCheckedHandler}
              />
            </label>
          </div>

          <CartSummary
            total={total}
            filtered={filtered}
          />
        </div>
      </CheckedContext.Provider>
    </>
  )
}
