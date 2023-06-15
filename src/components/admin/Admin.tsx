import { Outlet } from 'react-router-dom'
import { AdminNav } from './AdminNav'
import styled from 'styles/pages/admin.module.scss'

export const Admin = () => {
  return (
    <div className={styled.admin}>
      <AdminNav />
      <Outlet />
    </div>
  )
}
