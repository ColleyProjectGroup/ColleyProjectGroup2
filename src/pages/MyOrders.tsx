import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TransactionDetail } from 'types/index'
import { featchUserOrders } from 'api/index'
import { MyOrderSummary, MyOrderStatus, MyOrderList } from 'components/index'
import styled from 'styles/pages/myOrders.module.scss'

export const MyOrders = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [orders, setOrders] = useState<TransactionDetail[]>([])

  const fetchOrders = () => {
    setIsLoading(true)
    featchUserOrders()
      .then(res => {
        setOrders(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className={styled.container}>
      <div className={styled.path}>
        <Link to="/">홈</Link>
        <span> / MY PAGE</span>
      </div>
      <MyOrderSummary
        orders={orders}
        isLoading={isLoading}
      />
      <MyOrderStatus
        orders={orders}
        isLoading={isLoading}
      />
      <MyOrderList
        orders={orders}
        onFetch={fetchOrders}
        isLoading={isLoading}
      />
    </div>
  )
}
