import { useState, FormEvent, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getId } from 'api/signApi'
import { LoginContext } from 'contexts/LoginContext'
import { useEffect } from 'react'
import { Modal } from 'components/Modal'
import { ModalProps } from 'types/ModalProps.type'
import styles from 'styles/pages/signin.module.scss'

export const SignInPage = () => {
  const navigate = useNavigate()
  const { isLogined, setIsLogined } = useContext(LoginContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false)
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)
  const [onFocusEmail, setOnFocusEmail] = useState<boolean>(false)
  const [onFocusPassword, setOnFocusPassword] = useState<boolean>(false)

  //유효성 검사
  useEffect(() => {
    if (email && password) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [email, password])

  const searchRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    function handleOutside(e: Event) {
      // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        if (onFocusEmail) {
          setOnFocusEmail(false)
        }
        if (onFocusPassword) {
          setOnFocusPassword(false)
        }
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [searchRef, onFocusEmail, onFocusPassword])

  const submitId = (event: FormEvent) => {
    event.preventDefault()
    const idInfo = {
      email,
      password
    }
    getId(idInfo).then(
      res => {
        event.preventDefault()
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN,
          res.accessToken
        )
        const adminEmail = res.user.email
        if (adminEmail === import.meta.env.VITE_ADMIN_EMAIL) {
          navigate('/admin')
          setIsLogined(!isLogined)
        } else {
          navigate('/')
          setIsLogined(!isLogined)
        }
      },
      error => {
        const errorMessage = error.response.data
        if (errorMessage === '유효한 사용자가 아닙니다.') {
          setIsModalShow(true)
          setModalProps({
            title: '로그인 오류',
            content: errorMessage,
            isTwoButton: false,
            okButtonText: '확인',
            onClickOkButton: () => {
              setIsModalShow(false)
            }
          })
          console.log(error.response.data)
        }
      }
    )
  }

  return (
    <div>
      <div className={styles.loginForm}>
        <div className={styles.title}>LOGIN</div>
        <form onSubmit={submitId}>
          <input
            className={onFocusEmail ? styles.inputFocus : styles.inputBlur}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onClick={() => {
              setOnFocusEmail(!onFocusEmail)
            }}
            placeholder="이메일"
            ref={searchRef}
          />
          <input
            className={onFocusPassword ? styles.inputFocus : styles.inputBlur}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onClick={() => {
              setOnFocusPassword(!onFocusPassword)
            }}
            placeholder="비밀번호"
            ref={searchRef}
          />
          <button
            type="submit"
            disabled={!isValid}>
            로그인
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
    </div>
  )
}
