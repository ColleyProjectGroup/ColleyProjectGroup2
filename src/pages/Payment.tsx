import {
  ProductInfo,
  UserAddress,
  PriceInfo,
  PaymentMethods
} from 'components/payment/index'
import {
  UsernameContext,
  PhoneNumberContext,
  UseremailContext,
  BankContext,
  AccountNumberContext
} from 'contexts/index'

import { useContext, useState } from 'react'
import styles from 'styles/components/payment/Payment.module.scss'

export const Payment = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('010')
  const [bank, setBank] = useState('004')
  const [accountNumber, setAccountNumber] = useState('')

  return (
    <BankContext.Provider value={{ bank, setBank }}>
      <PhoneNumberContext.Provider value={{ phoneNumber, setPhoneNumber }}>
        <AccountNumberContext.Provider
          value={{ accountNumber, setAccountNumber }}>
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
        </AccountNumberContext.Provider>
      </PhoneNumberContext.Provider>
    </BankContext.Provider>
  )
}
