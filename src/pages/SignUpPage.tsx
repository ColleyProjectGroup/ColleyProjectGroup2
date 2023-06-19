import { useState, FormEvent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { postInfo } from 'api/signApi'
import { LoginContext } from '@/contexts/LoginContext'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const { isLogined, setIsLogined } = useContext(LoginContext)

  const submitBodyInfo = (event: FormEvent) => {
    event.preventDefault()
    const bodyInfo = {
      email,
      password,
      displayName
    }
    postInfo(bodyInfo).then(res => {
      localStorage.setItem(
        import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN,
        res.accessToken
      )
      console.log(res.accessToken)
      navigate('/')
    })
  }

  return (
    <div>
      <form onSubmit={submitBodyInfo}>
        <div className="inputbox">
          <div>이메일</div>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="inputbox">
          <div>비밀번호</div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="inputbox">
          <div>이름</div>
          <input
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            setIsLogined(!isLogined)
          }}>
          회원가입
        </button>
      </form>
    </div>
  )
}
