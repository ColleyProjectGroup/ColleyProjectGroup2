import React, { useMemo } from 'react'
import { CustomerInfo } from 'types/index'
import styled from 'styles/components/admin/customerItem.module.scss'

export const AdminCustomerItem = React.memo(
  ({ user, totalTransaction, totalTransactionPrice }: CustomerInfo) => {
    const customerGrade = useMemo(() => {
      // 회원등급 (누적금액)
      // 브론즈(0~10만) > 실버(10만~20만) > 골드(20만~50만) > 플래티넘(50만~100만) > 다이아몬드(100만~)
      if (totalTransactionPrice < 100000) {
        return '브론즈'
      } else if (
        totalTransactionPrice >= 100000 &&
        totalTransactionPrice < 200000
      ) {
        return '실버'
      } else if (
        totalTransactionPrice >= 200000 &&
        totalTransactionPrice < 500000
      ) {
        return '골드'
      } else if (
        totalTransactionPrice >= 500000 &&
        totalTransactionPrice < 1000000
      ) {
        return '플래티넘'
      } else if (totalTransactionPrice >= 1000000) {
        return '다이아몬드'
      }
      return '-'
    }, [totalTransactionPrice])

    const gradeColor = useMemo(() => {
      switch (customerGrade) {
        case '실버':
          return 'grade--silver'
          break
        case '골드':
          return 'grade--gold'
          break
        case '플래티넘':
          return 'grade--platinum'
          break
        case '다이아몬드':
          return 'grade--diamond'
          break
        default:
          return 'grade--bronze'
          break
      }
    }, [customerGrade])

    return (
      <li className={styled['customer']}>
        <div className={styled['customer__email']}>{user.email}</div>
        <div className={styled['customer__name']}>{user.displayName}</div>
        <div className={styled['customer__grade']}>
          <span className={styled[gradeColor]}>{customerGrade}</span>
        </div>
        <div className={styled['customer__total-order']}>
          {totalTransaction.toLocaleString()}건
        </div>
        <div className={styled['customer__total-price']}>
          {totalTransactionPrice.toLocaleString()}원
        </div>
      </li>
    )
  }
)
