import styles from 'styles/pages/modifyPassword.module.scss'
import { InfoModify } from 'api/signApi'
import { useState } from 'react'

export const ModifyPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const Modify = () => {
    const password = {
      newPassword,
      oldPassword
    }
    InfoModify(password).then(res => {
      console.log(res)
    })
  }

  return (
    <div className={styles.container}>
      <form
        onSubmit={Modify}
        className={styles.wrapper}>
        <h2>비밀번호 변경</h2>
        <div className={styles.box}>
          <div className={styles.content}>기존 비밀번호</div>
          <div className={styles.inputBox}>
            <input
              type="password"
              value={oldPassword}
              onChange={e => {
                setOldPassword(e.target.value)
              }}
            />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.content}>새 비밀번호</div>
          <div className={styles.inputBox}>
            <input
              type="password"
              value={newPassword}
              onChange={e => {
                setNewPassword(e.target.value)
              }}
            />
          </div>
        </div>
        <button type="submit">변경</button>
      </form>
    </div>
  )
}
