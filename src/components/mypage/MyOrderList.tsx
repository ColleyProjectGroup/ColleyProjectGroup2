import React, { useMemo, useState } from 'react'
import { MyOrderItem } from 'components/index'
import Pagination from 'react-js-pagination'
import { TransactionDetail } from 'types/index'
import styled from 'styles/components/mypage/myOrderList.module.scss'

export const MyOrderList = React.memo(
  ({ orders }: { orders: TransactionDetail[] }) => {
    const [page, setPage] = useState<number>(1)

    const pagedOrders = useMemo(() => {
      if (orders.length === 0) {
        return []
      }

      const list = orders.sort((a, b) => {
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
    }, [orders, page])

    return (
      <div className={styled['orders']}>
        <h4>주문내역 조회</h4>
        <ul className={styled['list']}>
          {orders.length === 0 ? (
            <li className={styled['none']}>주문 내역이 없습니다.</li>
          ) : (
            pagedOrders.map((order, index) => (
              <MyOrderItem
                key={order.detailId}
                detail={order}
                isLast={index === pagedOrders.length - 1}
              />
            ))
          )}
        </ul>

        <div className={'mypage-pagination'}>
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={orders.length}
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
  }
)
