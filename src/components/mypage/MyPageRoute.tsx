import { Outlet } from 'react-router-dom'
import { MyPageNav } from 'components/mypage/index'
import { Header } from 'components/index'

export const MyPageRoute = () => {
  return (
    <div>
      <Header />
      <MyPageNav />
      <Outlet />
    </div>
  )
}
