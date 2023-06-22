import React, { useState } from 'react'
import Pagination from 'react-js-pagination'
import styled from 'styles/components/mypage/myOrderList.module.scss'

export const MyOrderList = () => {
  const [page, setPage] = useState<number>(1)

  return (
    <div className={styled['orders']}>
      <h4>주문내역 조회</h4>
      <ul className={styled['list']}>
        <li className={styled['none']}>주문 내역이 없습니다.</li>
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
}
