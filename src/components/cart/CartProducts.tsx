import { CartItem, CartSummary } from 'components/cart/index'
import styles from 'styles/components/cart/cartProducts.module.scss'
import { CartContext, ClickedContext } from 'contexts/index'
import { useContext, useState } from 'react'
import { CartProduct } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'

export const CartProducts = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const { userCart } = useContext(CartContext)
  const calculated = userCart.reduce((acc: number, cur: CartProduct) => {
    const discounted = calculateDiscountedPrice(
      cur.product.price,
      cur.product.discountRate
    )
    return acc + discounted * cur.quantity
  }, 0)
  const delivery = 3000

  const buttonClicked = () => {
    setIsClicked(!isClicked)
  }
  return (
    <>
      <ClickedContext.Provider value={{ isClicked, setIsClicked }}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.heading}>장바구니 상품</div>
            <h4 className={styles.selected}>일반상품 ({userCart.length})</h4>
            {userCart.map(item => (
              <CartItem
                product={item.product}
                quantity={item.quantity}
                key={item.product.id}
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
            <a onClick={buttonClicked}>전체선택</a>
          </div>

          <CartSummary
            products={calculated.toLocaleString()}
            delivery={delivery.toLocaleString()}
            total={(calculated + delivery).toLocaleString()}
          />
        </div>
      </ClickedContext.Provider>
    </>
  )
}
