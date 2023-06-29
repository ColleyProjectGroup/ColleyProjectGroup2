import { useNavigate, Link } from 'react-router-dom'
import { logOut } from 'api/index'
import { useContext } from 'react'
import styles from 'styles/components/mypage/mypageNav.module.scss'
import { LoginContext, LoginedUserContext, CartContext } from 'contexts/index'
import { CommonError } from 'types/index'

export const MyPageNav = () => {
  const { setIsLogined } = useContext(LoginContext)
  const { setUserEmail } = useContext(LoginedUserContext)
  const { setUserCart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setUserEmail('')
    setUserCart([])
    localStorage.removeItem(import.meta.env.VITE_STORAGE_KEY_ACCESSTOKEN)
    setIsLogined(false)
    navigate('/')
  }

  const logOutId = () => {
    logOut()
      .then(isSuccess => {
        if (isSuccess) {
          handleLogout()
          alert('로그아웃되었습니다.')
        }
      })
      .catch((error: CommonError) => {
        if (error.status === 401) {
          navigate('/')
        }
      })
  }

  return (
    <nav>
      <span className={styles.title}>My Page</span>
      <ul>
        <li className={styles.subtitle}>
          쇼핑 정보
          <div>
            <Link to="/mypage/order">주문내역 조회</Link>
          </div>
        </li>
        <li className={styles.subtitle}>
          활동 정보
          <div>
            <Link to="/mypage/wishlist">나의 위시리스트</Link>
          </div>
        </li>
        <li className={styles.myInfo}>
          나의 정보
          <ul>
            <li>
              <Link to="/mypage/password">비밀번호 변경</Link>
            </li>
            <li>
              <a
                className={styles.logout}
                onClick={logOutId}>
                로그아웃
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
