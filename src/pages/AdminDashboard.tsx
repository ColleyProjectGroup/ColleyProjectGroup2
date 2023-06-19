import styled from 'styles/pages/adminDashboard.module.scss'
import { fetchAdminTransactions } from 'api/index'
import { TransactionDetail } from 'types/index'
import { AdminDashboardCard } from 'components/index'
import { useCallback, useEffect, useState, useMemo } from 'react'

export const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [today] = useState<Date>(new Date())
  const [transactions, setTransactions] = useState<TransactionDetail[]>([])

  // 월 판매량
  const transactionsByMonth = useMemo(() => {
    return transactions.filter(transactions => {
      const date = new Date(transactions.timePaid)
      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() == today.getFullYear()
      )
    })
  }, [transactions, today])

  // 월 매출
  const totalSalesByMonth = useMemo(() => {
    return transactionsByMonth.reduce((total, transaction) => {
      if (transaction.product.discountRate) {
        total +=
          transaction.product.price -
          (transaction.product.price * transaction.product.discountRate) / 100
      } else {
        total += transaction.product.price
      }
      return total
    }, 0)
  }, [transactionsByMonth])

  // 일 판매량
  const transactionsByDate = useMemo(() => {
    return transactionsByMonth.filter(transactions => {
      const date = new Date(transactions.timePaid)
      return date.getDate() === today.getDate()
    })
  }, [transactionsByMonth, today])

  // 일 매출
  const totalSalesByDate = useMemo(() => {
    const totalPrice = transactionsByDate.reduce((total, transaction) => {
      if (transaction.product.discountRate) {
        total +=
          transaction.product.price -
          (transaction.product.price * transaction.product.discountRate) / 100
      } else {
        total += transaction.product.price
      }
      return total
    }, 0)
    // 로딩 해제
    setIsLoading(false)
    return totalPrice
  }, [transactionsByDate])

  useEffect(() => {
    setIsLoading(true)
    fetchTransactions()
  }, [today])

  const fetchTransactions = useCallback(() => {
    fetchAdminTransactions().then(res => {
      setTransactions(res)
    })
  }, [])

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>Dashboard</h1>
      <h2 className={styled['row-title']}>
        {today.getMonth() + 1}월 매출 통계
      </h2>
      <div className={styled.row}>
        <AdminDashboardCard
          title="월 판매량"
          value={transactionsByMonth.length.toLocaleString()}
          unitStr="건"
          isLoading={isLoading}
        />
        <AdminDashboardCard
          title="월 매출"
          value={totalSalesByMonth.toLocaleString()}
          unitStr="원"
          isLoading={isLoading}
        />
      </div>
      <h2 className={styled['row-title']}>
        {today.getMonth() + 1}월 {today.getDate()}일 매출 통계
      </h2>
      <div className={styled.row}>
        <AdminDashboardCard
          title="일 판매량"
          value={transactionsByDate.length.toLocaleString()}
          unitStr="건"
          isLoading={isLoading}
        />
        <AdminDashboardCard
          title="일 매출"
          value={totalSalesByDate.toLocaleString()}
          unitStr="원"
          isLoading={isLoading}
        />
      </div>
    </section>
  )
}
