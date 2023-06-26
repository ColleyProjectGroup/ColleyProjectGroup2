import { Link, useLocation } from 'react-router-dom'
import styles from 'styles/components/mypage/mypageNav.module.scss'

export const MyPageNav = () => {
  return (
    <nav>
      <span className={styles.title}>My Page</span>
      <ul>
        <li>
          쇼핑 정보
          <div>
            <Link to="/">주문내역 조회</Link>
          </div>
        </li>
        <li>
          활동 정보
          <div>
            <Link to="/">나의 위시리스트</Link>
          </div>
        </li>
        <li>
          나의 정보
          <ul>
            <li>
              <Link to="/">회원정보 수정</Link>
            </li>
            <li>
              <Link to="/">비밀번호 변경</Link>
            </li>
            <li>
              <Link to="/">로그아웃</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
