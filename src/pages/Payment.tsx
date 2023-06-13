import {
  ProductInfo,
  UserAddress,
  PriceInfo,
  PaymentMethods
} from 'components/payment/index'
import { UsernameContext } from 'contexts/UsernameContext'
import { useState } from 'react'
import styles from 'styles/components/payment/Payment.module.scss'

export const Payment = () => {
  const [name, setName] = useState('')

  return (
    <UsernameContext.Provider value={{ name, setName }}>
      <div className={styles.container}>
        <ProductInfo />
        <UserAddress />
        <PriceInfo />
        <PaymentMethods />
      </div>
    </UsernameContext.Provider>
  )
}
