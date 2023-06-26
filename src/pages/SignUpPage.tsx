import { useState, FormEvent, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { postInfo } from 'api/signApi'
import { LoginContext, LoginedUserContext } from 'contexts/index'
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
  const { isLogined, setIsLogined } = useContext(LoginContext)
  const { setUserEmail } = useContext(LoginedUserContext)

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
            navigate('/', { replace: true })
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

    postInfo(bodyInfo).then(res => {
      setUserEmail(res.user.email)
      localStorage.setItem(
        import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN,
        res.accessToken
      )
      console.log(res.accessToken)
      navigate('/')
    })
  }

  return (
    <div className={styles.signupform}>
      <span className={styles.title}>회원가입</span>
      <form onSubmit={submitBodyInfo}>
        <div className={styles.inputbox}>
          <div className={styles.text}>이메일</div>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            ref={inputRef}
          />
        </div>
        <div className={styles.inputbox}>
          <div className={styles.text}>비밀번호</div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            ref={inputRef}
          />
        </div>
        <div className={styles.inputbox}>
          <div className={styles.text}>이름</div>
          <input
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            ref={inputRef}
          />
        </div>
        <button
          type="submit"
          disabled={!isValid}
          onClick={() => {
            setIsLogined(!isLogined)
            navigate('/')
          }}>
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
