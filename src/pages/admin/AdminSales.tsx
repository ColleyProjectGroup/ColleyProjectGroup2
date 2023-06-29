import { useState, useCallback, useEffect, useMemo } from 'react'
import { AdminSalesSkeleton, AdminSalesItem } from 'components/index'
import {
  fetchAdminTransactions,
  changeIsCanceled,
  adminOrderConfirm
} from 'api/index'
import { TransactionDetail } from 'types/index'
import styled from 'styles/pages/adminSales.module.scss'
import Pagination from 'react-js-pagination'

export const AdminSales = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [sales, setSales] = useState<TransactionDetail[]>([])
  const onChangeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value.trim())
    },
    []
  )

  const filteredSales = useMemo(() => {
    if (sales.length === 0) {
      return []
    }

    const list = sales
      .filter(sale => sale.user.email.includes(search))
      .sort((a, b) => {
        if (a.timePaid < b.timePaid) {
          return 1
        }
        if (a.timePaid > b.timePaid) {
          return -1
        }
        return 0
      })
    const indexOfLast = page * 10
    const indexOfFirst = indexOfLast - 10
    return list.slice(indexOfFirst, indexOfLast)
  }, [sales, search, page])

  const totalSalesCount = useMemo(() => {
    return sales.filter(sale => sale.user.email.includes(search)).length
  }, [sales, search])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = () => {
    setIsLoading(true)
    fetchAdminTransactions()
      .then(res => setSales(res))
      .finally(() => setIsLoading(false))
  }

  const onChangeOrderIsCanceled = useCallback(
    (id: string, isCanceled: boolean) => {
      changeIsCanceled(id, isCanceled).then(isSuccess => {
        if (isSuccess) {
          fetchTransactions()
        }
      })
    },
    []
  )

  const onChangeOrderConfirm = useCallback((id: string) => {
    adminOrderConfirm(id).then(isSuccess => {
      if (isSuccess) {
        fetchTransactions()
      }
    })
  }, [])

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>주문 관리</h1>
      <input
        className={styled.search}
        type="text"
        placeholder="고객 아이디 입력"
        value={search}
        onChange={onChangeSearch}
      />

      <div className={styled['sales']}>
        <div className={styled['sales__date']}>주문일</div>
        <div className={styled['sales__email']}>고객 아이디</div>
        <div className={styled['sales__product']}>주문 상품</div>
        <div className={styled['sales__price']}>주문 금액</div>
        <div className={styled['sales__status']}>주문 상태</div>
      </div>

      {isLoading && (
        <>
          <AdminSalesSkeleton />
          <AdminSalesSkeleton />
          <AdminSalesSkeleton />
          <AdminSalesSkeleton />
          <AdminSalesSkeleton />
          <AdminSalesSkeleton />
          <AdminSalesSkeleton />
          <AdminSalesSkeleton />
          <AdminSalesSkeleton />
          <AdminSalesSkeleton />
        </>
      )}

      {!isLoading &&
        filteredSales.length > 0 &&
        filteredSales.map(sale => (
          <AdminSalesItem
            key={sale.detailId}
            detail={sale}
            onChangeOrderIsCanceled={onChangeOrderIsCanceled}
            onClickOrderConfirm={onChangeOrderConfirm}
          />
        ))}
      {filteredSales.length > 0 ? (
        <div className={'pagination-wrapper'}>
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalSalesCount}
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
