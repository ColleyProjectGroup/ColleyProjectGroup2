import styles from 'styles/components/cart/cartItem.module.scss'
import { useState, useContext, useEffect, useCallback } from 'react'
import { CartContext } from 'contexts/index'
import { calculateDiscountedPrice } from 'utils/index'
import { CartProduct } from 'types/index'

export const CartItem = ({
  product,
  quantity,
  checkedItemHandler,
  isAllChecked
}: CartProduct) => {
  const [number, setNumber] = useState(quantity)
  const { userCart, setUserCart } = useContext(CartContext)
  const [checked, setChecked] = useState<boolean>(false)
  // checkHandler - 개별 상품에서 체크 상태관리
  // checkedItemHandler - 상위컴포넌트(=CartProducts)에서 개별 상품 체크 상태관리
  const checkHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked)
    checkedItemHandler?.(product.id as string, target.checked as boolean)
  }

  const filter = userCart.filter(item => item.product.id !== product.id)

  const plus = () => {
    setNumber(number + 1)
    // 로컬스토리지 동기화
    setUserCart([...filter, { product: product, quantity: number + 1 }])
  }

  const allCheckHandler = useCallback(
    () => setChecked(isAllChecked as boolean),
    [setChecked, isAllChecked]
  )
  useEffect(() => allCheckHandler(), [isAllChecked, allCheckHandler])

  const minus = () => {
    if (number === 1) {
      return
    } else {
      setNumber(number - 1)
      setUserCart([...filter, { product: product, quantity: number - 1 }])
    }
  }
  const discounted = calculateDiscountedPrice(
    product.price,
    product.discountRate
  )
  const sumPrice = number * discounted

  const deleteList = () => {
    setUserCart(userCart.filter(p => p.product.id !== product.id))
  }

  return (
    <div className={styles.itemBox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => checkHandler(e)}
      />
      <img
        src={product.thumbnail}
        className={styles.thumbnail}
      />
      <div className={styles.productInfo}>
        <div className={styles.name}>{product.title}</div>
        <div className={styles.price}>{discounted.toLocaleString()}원</div>
        <div className={styles.amount}>
          <div
            className={styles.down}
            onClick={minus}>
            -
          </div>
          <div className={styles.number}>{number}</div>
          <div
            className={styles.up}
            onClick={plus}>
            +
          </div>
        </div>
      </div>
      <div className={styles.sumPrice}>{sumPrice.toLocaleString()}원</div>
      <span
        className={`material-icons ${styles['delete']}`}
        onClick={deleteList}>
        close
      </span>
    </div>
  )
}
