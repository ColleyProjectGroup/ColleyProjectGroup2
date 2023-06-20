import { useState, useCallback, useEffect } from 'react'
import { AdminSalesSkeleton, AdminSalesItem } from 'components/index'
import { fetchAdminTransactions } from 'api/index'
import { TransactionDetail } from 'types/index'
import styled from 'styles/pages/adminSales.module.scss'

export const AdminSales = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true) // 테스트
  const [search, setSearch] = useState<string>('')

  const [sales, setSales] = useState<TransactionDetail[]>([])
  const onChangeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value.trim())
    },
    []
  )

  useEffect(() => {
    setIsLoading(true)
    fetchTransactions()
  }, [])

  const fetchTransactions = useCallback(() => {
    fetchAdminTransactions()
      .then(res => setSales(res))
      .finally(() => setIsLoading(false))
  }, [])

  const onChangeOrderIsCanceled = useCallback(
    (id: string, isCanceled: boolean) => {
      console.log(id, isCanceled)
    },
    []
  )

  const onChangeOrderConfirm = useCallback((id: string) => {
    console.log(id)
  }, [])

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>주문 관리</h1>
      <input
        className={styled.search}
        type="text"
        placeholder="상품명 입력"
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
        sales.length > 0 &&
        sales.map(sale => (
          <AdminSalesItem
            detail={sale}
            onChangeOrderIsCanceled={onChangeOrderIsCanceled}
            onClickOrderConfirm={onChangeOrderConfirm}
          />
        ))}
    </section>
  )
}
