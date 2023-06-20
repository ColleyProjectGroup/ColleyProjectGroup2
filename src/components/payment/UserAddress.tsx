import styles from 'src/styles/components/payment/UserAddress.module.scss'
import { useContext, useState } from 'react'
import { UsernameContext } from 'contexts/UsernameContext'
import { UseremailContext } from 'contexts/UseremailContext'
import { PhoneNumberContext } from 'contexts/PhoneNumberContext'

import { DaumPostCode } from 'components/payment/index'

export const UserAddress = () => {
  const { name, setName } = useContext(UsernameContext)
  const { email, setEmail } = useContext(UseremailContext)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false)

  const { phoneNumber, setPhoneNumber } = useContext(PhoneNumberContext)

  const numberCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.currentTarget.value.toString()
    // /^010-\d{4}-\d{4}$/
    // 010시작 추가?
    if (phone === '' || /^[0-9\b]+$/.test(phone)) {
      setPhoneNumber(phone)
      setIsValidPhoneNumber(false)
    }
    if (phone.length === 11) {
      setIsValidPhoneNumber(true)
    }
  }

  const emailCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i

    const emailCheck = (username: any) => {
      return emailRegEx.test(username) //형식에 맞을 경우, true 리턴
    }
    if (emailCheck(e.target.value)) {
      setEmail(e.target.value)
      setIsValidEmail(true)
    } else {
      setIsValidEmail(false)
      console.log('state => input border color 변경 ')
    }
  }
  return (
    <div className={styles.container}>
      <h3>배송지</h3>
      <label className={styles.receiver}>
        <span>받는사람</span>
        <input
          onChange={e => {
            setName(e.target.value)
          }}
          required
        />
      </label>
      <DaumPostCode />
      <label className={styles.mobile}>
        <span>휴대전화</span>
        <input
          maxLength={11}
          className={isValidPhoneNumber ? styles.valid : styles.invalid}
          value={phoneNumber}
          onChange={numberCheckHandler}
          placeholder="11자리 숫자를 입력해주세요."
          required
        />
      </label>
      <label className={styles.email}>
        <span>이메일</span>
        <input
          className={isValidEmail ? styles.valid : styles.invalid}
          placeholder="abc@naver.com"
          onChange={emailCheckHandler}
          required
        />
      </label>
      <label>
        <input />
      </label>
    </div>
  )
}
