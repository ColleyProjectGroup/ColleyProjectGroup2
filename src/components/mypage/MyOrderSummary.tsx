import React, { useMemo } from 'react'
import { TransactionDetail } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'
import styled from 'styles/components/mypage/myOrderSummary.module.scss'

export const MyOrderSummary = React.memo(
  ({ orders }: { orders: TransactionDetail[] }) => {
    // 총 주문 금액
    const totalOrderPrice = useMemo(() => {
      const totalPrice = orders.reduce((total, order) => {
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
      return totalOrderPrice * 0.01
    }, [totalOrderPrice])

    return (
      <div className={styled.summary}>
        <div className={styled['summary__item']}>
          <img
            className={styled['summary__icon']}
            src="/public/images/ico_won.png"
            alt="적립금"
          />
          <span className={styled['summary__content']}>
            {point.toLocaleString()}원
          </span>
          <span className={styled['summary__title']}>총적립금</span>
        </div>
        <div className={styled['summary__item']}>
          <img
            className={styled['summary__icon']}
            src="/public/images/ico_coupon.png"
            alt="쿠폰"
          />
          <span className={styled['summary__content']}>0개</span>
          <span className={styled['summary__title']}>쿠폰</span>
        </div>
        <div className={styled['summary__item']}>
          <img
            className={styled['summary__icon']}
            src="/public/images/ico_orders.png"
            alt="주문"
          />
          <span className={styled['summary__content']}>
            {totalOrderPrice.toLocaleString()}원 ({orders.length}회)
          </span>
          <span className={styled['summary__title']}>총주문</span>
        </div>
      </div>
    )
  }
)
