import { Link, useLocation } from 'react-router-dom'
import styles from 'styles/components/mypage/mypageNav.module.scss'

export const MyPageNav = () => {
  return (
    <nav>
      <h1>My Page</h1>
      <ul>
        <li>
          쇼핑 정보
          <span>주문내역 조회</span>
        </li>
        <li>
          활동 정보
          <span>나의 위시리스트</span>
        </li>
        <li>
          나의 정보
          <ul>
            <li>회원정보 수정</li>
            <li>비밀번호 변경</li>
            <li>로그아웃</li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
