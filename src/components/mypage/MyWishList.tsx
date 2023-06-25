import React, { useMemo, useState } from 'react'
import { MyWishrItem } from 'components/index'
import Pagination from 'react-js-pagination'
import { Product } from 'types/index'
import styled from 'styles/components/mypage/myWishList.module.scss'

export const MyWishList = React.memo(
  ({ wishList }: { wishList: Product[] }) => {
    const [page, setPage] = useState<number>(1)

    const pagedWishList = useMemo(() => {
      if (wishList.length === 0) {
        return []
      }

      const indexOfLast = page * 10
      const indexOfFirst = indexOfLast - 10
      return wishList.slice(indexOfFirst, indexOfLast)
    }, [wishList, page])

    return (
      <div className={styled['wishList']}>
        <ul className={styled['list']}>
          {wishList.length === 0 ? (
            <li className={styled['none']}>관심상품 내역이 없습니다.</li>
          ) : (
            pagedWishList.map((product, index) => (
              <MyWishrItem
                key={product.id}
                product={product}
                isLast={index === pagedWishList.length - 1}
              />
            ))
          )}
        </ul>
        {wishList.length !== 0 ? (
          <div className={'mypage-pagination'}>
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={wishList.length}
              pageRangeDisplayed={5}
              prevPageText="〈"
              nextPageText="〉"
              firstPageText="〈〈"
              lastPageText="〉〉"
              onChange={setPage}
            />
          </div>
        ) : null}
      </div>
    )
  }
)
