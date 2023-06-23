import React from 'react'
import styled from 'styles/components/mypage/myOrderSummary.module.scss'

export const MyOrderSummary = () => {
  return (
    <div className={styled.summary}>
      <div className={styled['summary__item']}>
        <img
          className={styled['summary__icon']}
          src="/public/images/ico_won.png"
          alt="적립금"
        />
        <span className={styled['summary__content']}>0원</span>
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
        <span className={styled['summary__content']}>0원(0회)</span>
        <span className={styled['summary__title']}>총주문</span>
      </div>
    </div>
  )
}
