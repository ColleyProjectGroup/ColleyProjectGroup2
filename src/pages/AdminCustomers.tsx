import { useCallback, useEffect, useState, useMemo } from 'react'
import { adminFetchCustomers } from 'api/index'
import { CustomerInfo } from 'types/index'
import { AdminCustomerItem, AdminCustomerSkeleton } from 'components/index'
import styled from 'styles/pages/adminCustomers.module.scss'
import Pagination from 'react-js-pagination'

export const AdminCustomers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [customers, setCustomers] = useState<CustomerInfo[]>([])
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)

  const filteredCustomers = useMemo(() => {
    if (customers.length === 0) {
      return []
    }

    const list = customers
      .filter(customer => customer.user.displayName.includes(search))
      .sort((a, b) => {
        if (a.user.displayName < b.user.displayName) {
          return 1
        }
        if (a.user.displayName > b.user.displayName) {
          return -1
        }
        return 0
      })
    const indexOfLast = page * 10
    const indexOfFirst = indexOfLast - 10
    return list.slice(indexOfFirst, indexOfLast)
  }, [customers, search, page])

  const totalCustomerCount = useMemo(() => {
    return customers.filter(customer =>
      customer.user.displayName.includes(search)
    ).length
  }, [customers, search])

  const onChangeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value.trim())
    },
    []
  )

  const fetchCustomers = useCallback(() => {
    adminFetchCustomers()
      .then(
        customers => {
          setCustomers(customers)
        },
        error => {
          console.error(error)
        }
      )
      .finally(() => {
        const hideSkeletons = setTimeout(() => {
          setIsLoading(false)
          clearTimeout(hideSkeletons)
        }, 500)
      })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetchCustomers()
  }, [fetchCustomers])

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

      {
        // 고객 리스트
        !isLoading && (
          <ul>
            {filteredCustomers.map(customer => (
              <AdminCustomerItem
                user={customer.user}
                totalTransaction={customer.totalTransaction}
                totalTransactionPrice={customer.totalTransactionPrice}
              />
            ))}
          </ul>
        )
      }

      {
        // 스켈레톤 로딩
        isLoading && (
          <>
            <AdminCustomerSkeleton />
            <AdminCustomerSkeleton />
            <AdminCustomerSkeleton />
            <AdminCustomerSkeleton />
            <AdminCustomerSkeleton />
            <AdminCustomerSkeleton />
            <AdminCustomerSkeleton />
            <AdminCustomerSkeleton />
            <AdminCustomerSkeleton />
            <AdminCustomerSkeleton />
          </>
        )
      }

      {filteredCustomers.length > 0 ? (
        <div className={'pagination-wrapper'}>
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalCustomerCount}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={setPage}
          />
        </div>
      ) : null}
    </section>
  )
}
