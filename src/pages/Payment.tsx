import {
  ProductInfo,
  UserAddress,
  PriceInfo,
  PaymentMethods
} from 'components/payment/index'
import { UsernameContext } from 'contexts/UsernameContext'
import { UseremailContext } from 'contexts/UseremailContext'
import { PhoneNumberContext } from 'contexts/PhoneNumberContext'
import { BankContext } from 'contexts/BankContext'
import { AccountNumberContext } from 'contexts/AccountNumberContext'

import { useState } from 'react'
import styles from 'styles/components/payment/Payment.module.scss'

export const Payment = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('010')
  const [bank, setBank] = useState('')
  const [accountNumber, setAccountNumber] = useState('')

  return (
    <AccountNumberContext.Provider value={{ accountNumber, setAccountNumber }}>
      <BankContext.Provider value={{ bank, setBank }}>
        <PhoneNumberContext.Provider value={{ phoneNumber, setPhoneNumber }}>
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
        </PhoneNumberContext.Provider>
      </BankContext.Provider>
    </AccountNumberContext.Provider>
  )
}
