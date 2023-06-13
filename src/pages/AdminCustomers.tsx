import { useCallback, useEffect, useState, useMemo } from 'react'
import { adminFetchCustomers } from 'api/index'
import { CustomerInfo } from 'types/index'
import styled from 'styles/pages/adminCustomers.module.scss'
import { AdminCustomerItem } from '@/components/admin/AdminCustomerItem'

export const AdminCustomers = () => {
  const [customers, setCustomers] = useState<CustomerInfo[]>([])
  const [search, setSearch] = useState<string>('')

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.user.displayName.includes(search)
    )
  }, [customers, search])

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = useCallback(() => {
    adminFetchCustomers().then(
      customers => {
        setCustomers(customers)
      },
      error => {
        console.error(error)
      }
    )
  }, [])

  const onChangeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value.trim())
    },
    []
  )

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>고객 관리</h1>
      <input
        className={styled.search}
        type="text"
        placeholder="고객명 입력"
        value={search}
        onChange={onChangeSearch}
      />
      <div className={styled['customers']}>
        <div className={styled['customers__email']}>이메일</div>
        <div className={styled['customers__name']}>고객명</div>
        <div className={styled['customers__grade']}>등급</div>
        <div className={styled['customers__total-order']}>누적 주문수</div>
        <div className={styled['customers__total-price']}>누적 주문금액</div>
      </div>

      <ul>
        {filteredCustomers.map(customer => (
          <AdminCustomerItem
            user={customer.user}
            totalTransaction={customer.totalTransaction}
            totalTransactionPrice={customer.totalTransactionPrice}
          />
        ))}
      </ul>
    </section>
  )
}
