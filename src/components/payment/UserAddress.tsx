import styles from 'src/styles/components/payment/UserAddress.module.scss'
import { useContext } from 'react'
import { UsernameContext } from 'contexts/UsernameContext'
import { PhoneNumberContext } from 'contexts/PhoneNumberContext'

import { DaumPostCode } from 'components/payment/index'

export const UserAddress = () => {
  const { name, setName } = useContext(UsernameContext)
  const { phoneNumber, setPhoneNumber } = useContext(PhoneNumberContext)

  const numberCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.currentTarget.value.toString()
    // /^010-\d{4}-\d{4}$/
    // 010시작 추가?
    if (phone === '' || /^[0-9\b]+$/.test(phone)) {
      setPhoneNumber(phone)
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
        />
      </label>
      <DaumPostCode />
      <label className={styles.mobile}>
        <span>휴대전화</span>
        <input
          maxLength={11}
          type="text"
          value={phoneNumber}
          onChange={numberCheckHandler}
          placeholder="11자리 숫자를 입력해주세요."
        />
      </label>
      <label className={styles.email}>
        <span>이메일</span>
        <input />
      </label>
      <label>
        <input />
      </label>
    </div>
  )
}
