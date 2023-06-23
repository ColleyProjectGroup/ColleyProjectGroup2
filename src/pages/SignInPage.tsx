import { useState, FormEvent, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getId } from 'api/signApi'
import { LoginContext, LoginedUserContext } from 'contexts/index'

export const SignInPage = () => {
  const navigate = useNavigate()
  const { isLogined, setIsLogined } = useContext(LoginContext)
  const { setUserEmail } = useContext(LoginedUserContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const submitId = (event: FormEvent) => {
    event.preventDefault()
    const idInfo = {
      email,
      password
    }
    getId(idInfo).then(res => {
      event.preventDefault()
      setUserEmail(res.user.email)
      localStorage.setItem(
        import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN,
        res.accessToken
      )
      const adminEmail = res.user.email
      if (adminEmail === import.meta.env.VITE_ADMIN_EMAIL) {
        navigate('/admin')
      } else {
        navigate('/')
      }
    })
  }

  return (
    <div>
      <form onSubmit={submitId}>
        <div className="loginInput">
          <div>이메일:</div>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="loginInput">
          <div>비밀번호:</div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            setIsLogined(!isLogined)
          }}>
          로그인
        </button>
      </form>
    </div>
  )
}
