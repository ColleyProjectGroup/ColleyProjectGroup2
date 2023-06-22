import { useState, FormEvent, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { postInfo } from 'api/signApi'
import { LoginContext } from '@/contexts/LoginContext'
import { Modal } from 'components/Modal'
import { ModalProps } from 'types/ModalProps.type'
import styles from 'styles/pages/signup.module.scss'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(false)
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)
  const [onFocusEmail, setOnFocusEmail] = useState<boolean>(false)
  const [onFocusPassword, setOnFocusPassword] = useState<boolean>(false)
  const [onFocusDisplayName, setOnFocusDisplayName] = useState<boolean>(false)
  const { isLogined, setIsLogined } = useContext(LoginContext)

  //유효성 검사
  useEffect(() => {
    if (email && password && displayName) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [email, password, displayName])

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
        if (onFocusDisplayName) {
          setOnFocusDisplayName(false)
        }
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [searchRef, onFocusEmail, onFocusPassword, onFocusDisplayName])

  const submitBodyInfo = (event: FormEvent) => {
    event.preventDefault()
    const bodyInfo = {
      email,
      password,
      displayName
    }
    postInfo(bodyInfo).then(
      res => {
        localStorage.setItem(
          import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN,
          res.accessToken
        )
        setIsModalShow(true)
        setModalProps({
          title: '회원가입',
          content: '회원가입을 축하합니다.',
          isTwoButton: false,
          okButtonText: '확인',
          onClickOkButton: () => {
            setIsModalShow(false)
            setIsLogined(!isLogined)
            navigate('/')
          }
        })
      },
      error => {
        const errorMessage = error.response.data
        if (
          errorMessage === '유효한 이메일이 아닙니다.' ||
          errorMessage === '유효한 사용자 이름이 아닙니다.' ||
          errorMessage === '유효한 비밀번호가 아닙니다.' ||
          errorMessage === '이미 존재하는 사용자입니다.'
        ) {
          setIsModalShow(true)
          setModalProps({
            title: '회원가입 오류',
            content: errorMessage,
            isTwoButton: false,
            okButtonText: '확인',
            onClickOkButton: () => {
              setIsModalShow(false)
            }
          })
        }
        console.log(errorMessage)
      }
    )
  }

  return (
    <div className={styles.signupform}>
      <span className={styles.title}>회원가입</span>
      <form onSubmit={submitBodyInfo}>
        <div className={styles.inputbox}>
          <div className={styles.text}>이메일</div>
          <input
            className={onFocusEmail ? styles.inputFocus : styles.inputBlur}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onClick={() => {
              setOnFocusEmail(true)
            }}
            ref={searchRef}
          />
        </div>
        <div className={styles.inputbox}>
          <div className={styles.text}>비밀번호</div>
          <input
            className={onFocusPassword ? styles.inputFocus : styles.inputBlur}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onClick={() => {
              setOnFocusPassword(true)
            }}
            ref={searchRef}
          />
        </div>
        <div className={styles.inputbox}>
          <div className={styles.text}>이름</div>
          <input
            className={
              onFocusDisplayName ? styles.inputFocus : styles.inputBlur
            }
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            onClick={() => {
              setOnFocusDisplayName(true)
            }}
            ref={searchRef}
          />
        </div>
        <button
          type="submit"
          disabled={!isValid}>
          회원가입
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
