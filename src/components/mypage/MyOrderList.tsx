import React, { useEffect, useState } from 'react'
import { MyOrderItem } from 'components/index'
import { featchUserOrders } from 'api/index'
import Pagination from 'react-js-pagination'
import styled from 'styles/components/mypage/myOrderList.module.scss'
import { TransactionDetail } from '@/types'

export const MyOrderList = React.memo(() => {
  const [page, setPage] = useState<number>(1)
  const [orders, setOrders] = useState<TransactionDetail[]>([])

  const fetchOrders = () => {
    featchUserOrders().then(res => {
      setOrders(res)
    })
  }

  useEffect(() => {
    fetchOrders()
  })

  return (
    <div className={styled['orders']}>
      <h4>주문내역 조회</h4>
      <ul className={styled['list']}>
        {orders.length === 0 ? (
          <li className={styled['none']}>주문 내역이 없습니다.</li>
        ) : (
          orders.map(order => <MyOrderItem detail={order} />)
        )}
      </ul>

      <div className={'mypage-pagination'}>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={50}
          pageRangeDisplayed={5}
          prevPageText="〈"
          nextPageText="〉"
          firstPageText="〈〈"
          lastPageText="〉〉"
          onChange={setPage}
        />
      </div>
    </div>
  )
})
