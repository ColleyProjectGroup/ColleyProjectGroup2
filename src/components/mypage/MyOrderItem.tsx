import React from 'react'
import { TransactionDetail } from 'types/index'
import styled from 'styles/components/mypage/myOrderItem.module.scss'

export const MyOrderItem = React.memo(
  ({ detail }: { detail: TransactionDetail }) => {
    return (
      <li className={styled['order']}>
        <span>{detail.timePaid}</span>
        <img
          src={detail.product.thumbnail || ''}
          alt=""
        />
        <p>{detail.product.title}</p>
        <span>{detail.product.price.toLocaleString()}원</span>
      </li>
    )
  }
)
