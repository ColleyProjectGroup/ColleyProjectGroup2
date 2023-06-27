import styles from 'src/styles/components/payment/UserAddress.module.scss'
import { useContext, useState } from 'react'
import { UsernameContext } from 'contexts/UsernameContext'
import { UseremailContext } from 'contexts/UseremailContext'
import { PhoneNumberContext } from 'contexts/PhoneNumberContext'
import { DaumPostCode } from 'components/payment/index'

export const UserAddress = () => {
  const { name, setName } = useContext(UsernameContext)
  const { setEmail } = useContext(UseremailContext)
  const { phoneNumber, setPhoneNumber } = useContext(PhoneNumberContext)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false)
  const [isValidName, setIsValidName] = useState(false)

  //USERNAME
  const nameCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (!(name.length < 2 || name.length > 5)) {
      setIsValidName(true)
    }
  }

  // PHONE NUMBER
  const numberCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.currentTarget.value.toString()
    if (phone === '' || /^[0-9\b]+$/.test(phone)) {
      setPhoneNumber(phone)
      setIsValidPhoneNumber(false)
    }
    if (phone.length === 11) {
      setIsValidPhoneNumber(true)
    }
  }
  // EMAIL
  const emailCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i
    const input = e.target.value
    const emailCheck = (username: string) => {
      return emailRegEx.test(username) //형식에 맞을 경우, true 리턴
    }
    if (emailCheck(input)) {
      setEmail(input)
      setIsValidEmail(true)
    } else {
      setIsValidEmail(false)
    }
  }

  return (
    <div className={styles.container}>
      <h3>배송지</h3>
      <label className={styles.receiver}>
        <span>받는사람</span>
        <input
          maxLength={5}
          className={isValidName ? styles.valid : styles.invalid}
          onChange={nameCheckHandler}
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
        <span>배송 요청사항</span>
        <input placeholder="선택 입력 사항입니다." />
      </label>
    </div>
  )
}
