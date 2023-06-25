import { Outlet } from 'react-router-dom'
import { MyPageNav } from './MyPageNav'

export const MyPageRoute = () => {
  return (
    <div>
      <MyPageNav />
      <Outlet />
    </div>
  )
}
