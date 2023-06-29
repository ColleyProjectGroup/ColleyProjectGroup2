import React, { useMemo } from 'react'
import { TransactionDetail } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'
import styled from 'styles/components/mypage/myOrderSummary.module.scss'
import iconWon from '/public/ico_won.png'
import iconCoupon from '/public/ico_coupon.png'
import iconOrder from '/public/ico_orders.png'

export const MyOrderSummary = React.memo(
  ({
    orders,
    isLoading
  }: {
    orders: TransactionDetail[]
    isLoading: boolean
  }) => {
    // 총 주문 금액
    const totalOrderPrice = useMemo(() => {
      const totalPrice = orders
        .filter(order => !order.isCanceled)
        .reduce((total, order) => {
          total += calculateDiscountedPrice(
            order.product.price,
            order.product.discountRate
          )
          return total
        }, 0)
      return totalPrice
    }, [orders])

    // 적립금 (주문금액의 1%)
    const point = useMemo(() => {
      return Math.floor(totalOrderPrice * 0.01)
    }, [totalOrderPrice])

    return (
      <div className={styled.summary}>
        <div className={styled['summary__item']}>
          <img
            className={styled['summary__icon']}
            src={iconWon}
            alt="적립금"
          />
          {isLoading ? (
            <div className={styled['skeleton']}></div>
          ) : (
            <span className={styled['summary__content']}>
              {point.toLocaleString()}원
            </span>
          )}
          <span className={styled['summary__title']}>총적립금</span>
        </div>
        <div className={styled['summary__item']}>
          <img
            className={styled['summary__icon']}
            src={iconCoupon}
            alt="쿠폰"
          />
          {isLoading ? (
            <div className={styled['skeleton']}></div>
          ) : (
            <span className={styled['summary__content']}>0개</span>
          )}
          <span className={styled['summary__title']}>쿠폰</span>
        </div>
        <div className={styled['summary__item']}>
          <img
            className={styled['summary__icon']}
            src={iconOrder}
            alt="주문"
          />
          {isLoading ? (
            <div className={styled['skeleton']}></div>
          ) : (
            <span className={styled['summary__content']}>
              {totalOrderPrice.toLocaleString()}원 (
              {orders.filter(order => !order.isCanceled).length}회)
            </span>
          )}
          <span className={styled['summary__title']}>총주문</span>
        </div>
      </div>
    )
  }
)
