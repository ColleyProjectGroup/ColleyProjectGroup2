import styles from 'src/styles/components/payment/UserAddress.module.scss'
import { useContext } from 'react'
import { UsernameContext } from 'contexts/UsernameContext'
import { DaumPostCode } from 'components/payment/index'

export const UserAddress = () => {
  const { name, setName } = useContext(UsernameContext)
  return (
    <div className={styles.container}>
      <h3>배송지</h3>
      <label className={styles.receiver}>
        <span>받는사람</span>
        <input
          onChange={e => {
            setName(e.target.value)
            console.log(name)
          }}
        />
      </label>
      <DaumPostCode />
      <label className={styles.mobile}>
        <span>휴대전화</span>
        <input />
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
