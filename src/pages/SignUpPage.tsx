import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { postInfo } from 'api/signApi'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')

  const submitBodyInfo = (event: FormEvent) => {
    event.preventDefault()
    const bodyInfo = {
      email,
      password,
      displayName
    }
    postInfo(bodyInfo).then(res => {
      localStorage.setItem('token', res.accessToken)
      if (localStorage.token) {
        navigate('/')
      }
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
        <button type="submit">회원가입</button>
      </form>
    </div>
    /*
    const bodyInfo ={
      email,
      password,
      displayName
    }
    이 값을 자식 컴포넌트에서 props.bodyInfo.email 이런식으로 사용하면 될듯? 일단 이따 해보자
    */
  )
}
