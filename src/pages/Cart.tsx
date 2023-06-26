import { CartHeader, CartFooter, CartProducts } from 'components/cart/index'
import styles from 'styles/components/cart/cart.module.scss'
import { CheckedContext } from 'contexts/index'
import { useState } from 'react'

export const Cart = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  return (
    <>
      <div className={styles.wrapper}>
        <CheckedContext.Provider value={{ isChecked, setIsChecked }}>
          <CartHeader />
          <CartProducts />
          <CartFooter />
        </CheckedContext.Provider>
      </div>
    </>
  )
}
