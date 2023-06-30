import { useState, FormEvent, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getId } from 'api/index'
import { LoginContext, LoginedUserContext } from 'contexts/index'
import { useEffect } from 'react'
import { Modal } from 'components/index'
import { ModalProps } from 'types/index'
import styles from 'styles/pages/signin.module.scss'

export const SignInPage = () => {
  const navigate = useNavigate()
  const { setIsLogined } = useContext(LoginContext)
  const { setUserEmail } = useContext(LoginedUserContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false)
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)

  //유효성 검사
  useEffect(() => {
    if (email && password) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [email, password])

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

  useEffect(() => {
    const token = localStorage.getItem(
      import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN
    )
    if (token) {
      navigate('/') // Redirect to the main page if the user is already logged in
    }
  }, [])

  const emailSpacingCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value
    if (emailValue.includes(' ')) {
      alert('띄어쓰기는 사용할 수 없습니다.')
    } else {
      setEmail(emailValue)
    }
  }

  const passwordSpacingCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value
    if (passwordValue.includes(' ')) {
      alert('띄어쓰기는 사용할 수 없습니다.')
    } else {
      setPassword(passwordValue)
    }
  }

  const submitId = (event: FormEvent) => {
    event.preventDefault()
    const idInfo = {
      email,
      password
    }
    getId(idInfo).then(
      res => {
        setUserEmail(res.user.email)
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN,
          res.accessToken
        )
        const adminEmail = res.user.email
        if (adminEmail === import.meta.env.VITE_ADMIN_EMAIL) {
          location.replace('/admin')
          setIsLogined(true)
        } else {
          location.replace(document.referrer)
          setIsLogined(true)
        }
      },
      error => {
        const errorMessage = error.message
        if (
          errorMessage === '유효한 사용자가 아닙니다.' ||
          errorMessage === '이메일 혹은 비밀번호가 일치하지 않습니다.'
        ) {
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
            value={email}
            onChange={emailSpacingCheck}
            placeholder="abc123@naver.com"
            ref={inputRef}
          />
          <input
            type="password"
            value={password}
            onChange={passwordSpacingCheck}
            placeholder="비밀번호"
            ref={inputRef}
            minLength={8}
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
