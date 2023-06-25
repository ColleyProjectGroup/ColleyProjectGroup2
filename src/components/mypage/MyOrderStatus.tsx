import React, { useMemo } from 'react'
import { TransactionDetail } from 'types/index'
import styled from 'styles/components/mypage/myOrderStatus.module.scss'

export const MyOrderStatus = React.memo(
  ({
    orders,
    isLoading
  }: {
    orders: TransactionDetail[]
    isLoading: boolean
  }) => {
    const doneCount = useMemo(() => {
      return orders.filter(order => order.done).length
    }, [orders])

    const shippingCount = useMemo(() => {
      return orders.filter(order => !order.done && !order.isCanceled).length
    }, [orders])

    return (
      <div className={styled['status']}>
        <h4>나의 주문처리 현황</h4>
        <div className={styled['status__step']}>
          <div className={styled['status__item']}>
            {isLoading ? (
              <div className={styled['skeleton']}></div>
            ) : (
              <span className={styled['status__content']}>0</span>
            )}
            <h6>입금전</h6>
          </div>
          <div className={styled['status__item']}>
            {isLoading ? (
              <div className={styled['skeleton']}></div>
            ) : (
              <span className={styled['status__content']}>
                {shippingCount.toLocaleString()}
              </span>
            )}
            <h6>배송중</h6>
          </div>
          <div className={styled['status__item']}>
            {isLoading ? (
              <div className={styled['skeleton']}></div>
            ) : (
              <span className={styled['status__content']}>
                {doneCount.toLocaleString()}
              </span>
            )}
            <h6>구매완료</h6>
          </div>
        </div>
      </div>
    )
  }
)
