import { useState, FormEvent, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getId } from 'api/signApi'
import { LoginContext, LoginedUserContext } from 'contexts/index'
import { useEffect } from 'react'
import { Modal } from 'components/Modal'
import { ModalProps } from 'types/ModalProps.type'
import styles from 'styles/pages/signin.module.scss'

export const SignInPage = () => {
  const navigate = useNavigate()
  const { isLogined, setIsLogined } = useContext(LoginContext)
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

  const submitId = (event: FormEvent) => {
    event.preventDefault()
    const idInfo = {
      email,
      password
    }
    getId(idInfo).then(
      res => {
        event.preventDefault()
        setUserEmail(res.user.email)
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN,
          res.accessToken
        )
        const adminEmail = res.user.email
        if (adminEmail === import.meta.env.VITE_ADMIN_EMAIL) {
          navigate('/admin')
          setIsLogined(!isLogined)
        } else {
          //navigate('/', { replace: true })
          location.replace(document.referrer)
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
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일"
            ref={inputRef}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="비밀번호"
            ref={inputRef}
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
