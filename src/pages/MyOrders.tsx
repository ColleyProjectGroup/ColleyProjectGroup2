import React from 'react'
import { Link } from 'react-router-dom'
import { MyOrderSummary } from 'components/index'
import styled from 'styles/pages/myOrders.module.scss'

export const MyOrders = () => {
  return (
    <div className={styled.container}>
      <div className={styled.path}>
        <Link to="/">홈</Link>
        <span> / MY PAGE</span>
      </div>
      <MyOrderSummary />
    </div>
  )
}
