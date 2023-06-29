import styles from 'styles/pages/modifyPassword.module.scss'
import { InfoModify } from 'api/index'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Modal } from 'components/index'
import { ModalProps } from 'types/index'

export const ModifyPassword = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)

  const Modify = () => {
    event?.preventDefault()
    const password = {
      newPassword,
      oldPassword
    }
    InfoModify(password).then(() => {
      setIsModalShow(true)
      setModalProps({
        title: '비밀번호 변경',
        content: '비밀번호 변경이 완료되었습니다.',
        isTwoButton: false,
        okButtonText: '확인',
        onClickOkButton: () => {
          setIsModalShow(false)
          navigate('/mypage')
        }
      })
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

      {isModalShow && modalProps ? (
        <Modal
          isTwoButton={modalProps.isTwoButton}
          title={modalProps.title}
          content={modalProps.content}
          okButtonText={modalProps.okButtonText}
          onClickOkButton={modalProps.onClickOkButton}
        />
      ) : null}
    </div>
  )
}
