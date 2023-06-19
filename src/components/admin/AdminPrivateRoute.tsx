import { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { checkIsAdmin } from 'api/index'
import { AdminNav } from 'components/index'
import styled from 'styles/pages/admin.module.scss'

export const AdminPrivateRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const navigate = useNavigate()

  const moveSignIn = useCallback(() => {
    alert('관리자만 접근할 수 있습니다.')
    navigate('/signin')
  }, [navigate])

  useEffect(() => {
    checkIsAdmin()
      .then(isAdmin => {
        if (!isAdmin) {
          moveSignIn()
        } else {
          setIsAdmin(isAdmin)
        }
      })
      .catch(error => {
        console.log(error)
        moveSignIn()
      })
  }, [moveSignIn])

  return isAdmin ? (
    <div className={styled.admin}>
      <AdminNav />
      <Outlet />
    </div>
  ) : null
}
