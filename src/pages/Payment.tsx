import {
  ProductInfo,
  UserAddress,
  PriceInfo,
  PaymentMethods
} from 'components/payment/index'
import { UsernameContext } from 'contexts/UsernameContext'
import { UseremailContext } from 'contexts/UseremailContext'

import { useState } from 'react'
import styles from 'styles/components/payment/Payment.module.scss'

export const Payment = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <UseremailContext.Provider value={{ email, setEmail }}>
      <UsernameContext.Provider value={{ name, setName }}>
        <div className={styles.container}>
          <ProductInfo />
          <UserAddress />
          <PriceInfo />
          <PaymentMethods />
        </div>
      </UsernameContext.Provider>
    </UseremailContext.Provider>
  )
}
