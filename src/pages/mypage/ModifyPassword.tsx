import styles from 'styles/pages/modifyPassword.module.scss'
import { InfoModify } from 'api/index'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { Modal } from 'components/index'
import { ModalProps } from 'types/index'

export const ModifyPassword = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)
  const [isValid, setIsValid] = useState<boolean>(false)

  //유효성 검사
  useEffect(() => {
    if (newPassword && oldPassword) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [newPassword, oldPassword])

  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    function handleOutside(e: Event) {
      // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        inputRef.current.blur()
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [inputRef])

  const oldValidCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value
    if (passwordValue.includes(' ')) {
      alert('띄어쓰기는 사용할 수 없습니다.')
    } else {
      setOldPassword(passwordValue)
    }
  }

  const newValidCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value
    if (passwordValue.includes(' ')) {
      alert('띄어쓰기는 사용할 수 없습니다.')
    } else {
      setNewPassword(passwordValue)
    }
  }

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
              minLength={8}
              onChange={oldValidCheck}
              placeholder="8자리 이상 입력해주세요"
            />
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.content}>새 비밀번호</div>
          <div className={styles.inputBox}>
            <input
              type="password"
              value={newPassword}
              minLength={8}
              onChange={newValidCheck}
              placeholder="8자리 이상 입력해주세요"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid}>
          변경
        </button>
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
