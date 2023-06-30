import { useState, FormEvent, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { postInfo } from 'api/signApi'
import { LoginContext, LoginedUserContext } from 'contexts/index'
import { Modal } from 'components/index'
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
  const { setIsLogined } = useContext(LoginContext)
  const { setUserEmail } = useContext(LoginedUserContext)

  useEffect(() => {
    const token = localStorage.getItem(
      import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN
    )
    if (token) {
      navigate('/') // Redirect to the main page if the user is already logged in
    }
  }, [])

  //유효성 검사
  useEffect(() => {
    if (email && password && displayName) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [email, password, displayName])

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

  const emailSpacingCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value
    if (emailValue.includes(' ')) {
      alert('띄어쓰기는 사용할 수 없습니다.')
    } else {
      setEmail(emailValue)
    }
  }

  const emailValidCheck = () => {
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const testEmail = emailRegEx.test(email)
    if (testEmail) {
      return true
    } else {
      setIsModalShow(true)
      setModalProps({
        title: '로그인 오류',
        content: '유효한 형식의 이메일이 아닙니다.',
        isTwoButton: false,
        okButtonText: '확인',
        onClickOkButton: () => {
          setIsModalShow(false)
        }
      })
      return false
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

  const nameSpacingCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value
    if (nameValue.includes(' ')) {
      alert('띄어쓰기는 사용할 수 없습니다.')
    } else {
      setDisplayName(nameValue)
    }
  }

  const submitBodyInfo = (event: FormEvent) => {
    event.preventDefault()
    const bodyInfo = {
      email,
      password,
      displayName
    }
    if (emailValidCheck()) {
      postInfo(bodyInfo).then(
        res => {
          localStorage.setItem(
            import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN,
            res.accessToken
          )
          setUserEmail(res.user.email)
          setIsModalShow(true)
          setModalProps({
            title: '회원가입',
            content: '회원가입을 축하합니다.',
            isTwoButton: false,
            okButtonText: '확인',
            onClickOkButton: () => {
              setIsModalShow(false)
              setIsLogined(true)
              setUserEmail(res.user.email)
              navigate('/', { replace: true })
            }
          })
        },
        error => {
          const errorMessage = error.message
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
  }

  return (
    <div className={styles.signupform}>
      <span className={styles.title}>회원가입</span>
      <form onSubmit={submitBodyInfo}>
        <div className={styles.inputbox}>
          <div className={styles.text}>이메일</div>
          <input
            value={email}
            onChange={emailSpacingCheck}
            ref={inputRef}
            placeholder="이메일 형식으로 입력해주세요."
          />
        </div>
        <div className={styles.inputbox}>
          <div className={styles.text}>비밀번호</div>
          <input
            type="password"
            value={password}
            onChange={passwordSpacingCheck}
            ref={inputRef}
            placeholder="8자 이상 입력해주세요."
            minLength={8}
          />
        </div>
        <div className={styles.inputbox}>
          <div className={styles.text}>회원명</div>
          <input
            value={displayName}
            onChange={nameSpacingCheck}
            ref={inputRef}
            placeholder="20자 이내로 입력해주세요."
            maxLength={20}
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
