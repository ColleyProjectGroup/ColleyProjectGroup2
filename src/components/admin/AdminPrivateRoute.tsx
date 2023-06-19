import { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate, useNavigation } from 'react-router-dom'
import { checkIsAdmin } from 'api/index'
import { AdminNav } from 'components/index'
import styled from 'styles/pages/admin.module.scss'

export const AdminPrivateRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(() => {
    checkIsAdmin()
      .then(isAdmin => {
        if (!isAdmin) {
          alert('관리자만 접근할 수 있습니다.')
          navigate('/sigiin')
        } else {
          setIsAdmin(isAdmin)
        }
      })
      .catch(err => {
        alert('관리자만 접근할 수 있습니다.')
        navigate('/sigiin')
      })
  }, [])

  return isAdmin ? (
    <div className={styled.admin}>
      <AdminNav />
      <Outlet />
    </div>
  ) : null
}
