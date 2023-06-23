import React, { useMemo } from 'react'
import moment from 'moment'
import { TransactionDetail } from 'types/index'
import styled from 'styles/components/mypage/myOrderItem.module.scss'
import { Link } from 'react-router-dom'

export const MyOrderItem = React.memo(
  ({ detail, isLast }: { detail: TransactionDetail; isLast: boolean }) => {
    const paidDate = useMemo(() => {
      const date = moment(detail.timePaid).format('YYYY-MM-DD HH:mm')
      return date
    }, [detail])

    return (
      <li className={`${styled['order']} ${isLast ? styled['last'] : null} `}>
        <Link to={`/products/${detail.product.productId}`}>
          <span className={styled['timestamp']}>{paidDate}</span>
          <img
            src={detail.product.thumbnail || ''}
            alt=""
          />
          <p>{detail.product.title}</p>
          <span className={styled.price}>
            {detail.product.price.toLocaleString()}원
          </span>
        </Link>
        <button className={styled['black']}>구매확정</button>
      </li>
    )
  }
)
