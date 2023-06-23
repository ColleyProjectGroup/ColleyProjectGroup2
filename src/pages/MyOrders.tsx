import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TransactionDetail } from 'types/index'
import { featchUserOrders } from 'api/index'
import { MyOrderSummary, MyOrderStatus, MyOrderList } from 'components/index'
import styled from 'styles/pages/myOrders.module.scss'

export const MyOrders = () => {
  const [orders, setOrders] = useState<TransactionDetail[]>([])

  const fetchOrders = () => {
    featchUserOrders().then(res => {
      setOrders(res)
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
      <MyOrderSummary orders={orders} />
      <MyOrderStatus orders={orders} />
      <MyOrderList orders={orders} />
    </div>
  )
}
