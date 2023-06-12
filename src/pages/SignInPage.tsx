import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getId } from 'api/signApi'

export const SignInPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const submitId = (event: FormEvent) => {
    event.preventDefault()
    const idInfo = {
      email,
      password
    }
    getId(idInfo).then(res => {
      localStorage.setItem('token', res.accessToken)
      const adminEmail = res.user.email
      if (adminEmail === 'team2master@gmail.com') {
        navigate('/admin')
      } else if (localStorage.token) {
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
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}
