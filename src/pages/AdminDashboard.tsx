import styled from 'styles/pages/adminDashboard.module.scss'
import { fetchAdminTransactions } from 'api/index'
import { useCallback, useEffect } from 'react'

export const AdminDashboard = () => {
  useEffect(() => {
    fetchTransactions()
  }, [])
  console.log()
  const fetchTransactions = useCallback(() => {
    fetchAdminTransactions().then(res => {
      console.log(res)
    })
  }, [])

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>Dashboard</h1>
    </section>
  )
}
