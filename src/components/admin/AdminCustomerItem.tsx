import { CustomerInfo } from 'types/index'
import styled from 'styles/components/admin/CustomerItem.module.scss'
import { useMemo } from 'react'

export const AdminCustomerItem = ({
  user,
  totalTransaction,
  totalTransactionPrice
}: CustomerInfo) => {
  const customerGrade = useMemo(() => {
    // 브론즈 > 실버 > 골드 > 플래티넘 > 다이아몬드
  }, [user, totalTransactionPrice])

  return (
    <li className={styled['customer']}>
      <div className={styled['customer__email']}>{user.email}</div>
      <div className={styled['customer__name']}>{user.displayName}</div>
      <div className={styled['customer__grade']}>{'실버'}</div>
      <div className={styled['customer__total-order']}>
        {totalTransaction.toLocaleString()}건
      </div>
      <div className={styled['customer__total-price']}>
        {totalTransactionPrice.toLocaleString()}원
      </div>
    </li>
  )
}
