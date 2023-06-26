import React, { useCallback, useMemo, useState, useContext } from 'react'
import { MyWishrItem } from 'components/index'
import Pagination from 'react-js-pagination'
import { Product } from 'types/index'
import { WishListContext } from 'contexts/index'
import styled from 'styles/components/mypage/myWishList.module.scss'

export const MyWishList = React.memo(
  ({ wishList }: { wishList: Product[] }) => {
    const { setWishList } = useContext(WishListContext)
    const [page, setPage] = useState<number>(1)
    const [checkedList, setCheckedList] = useState<string[]>([])

    const pagedWishList = useMemo(() => {
      if (wishList.length === 0) {
        return []
      }

      const indexOfLast = page * 10
      const indexOfFirst = indexOfLast - 10
      return wishList.slice(indexOfFirst, indexOfLast)
    }, [wishList, page])

    const onChangeCheckedList = useCallback(
      (id: string) => {
        if (checkedList.includes(id)) {
          setCheckedList(crr => crr.filter(checkedId => checkedId !== id))
        } else {
          setCheckedList(crr => [...crr, id])
        }
      },
      [checkedList]
    )

    const onDeleteAllWishList = () => {
      setWishList([])
    }

    const onDeleteCheckedWishList = () => {
      const list = wishList.filter(product => !checkedList.includes(product.id))
      setWishList(list)
    }

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
                isChecked={checkedList.includes(product.id)}
                onChange={onChangeCheckedList}
              />
            ))
          )}
        </ul>

        {wishList.length !== 0 ? (
          <>
            <div className={styled['delete-buttons']}>
              <button
                className={styled.white}
                onClick={onDeleteAllWishList}>
                전체삭제
              </button>
              <button
                className={styled.white}
                onClick={onDeleteCheckedWishList}>
                선택삭제
              </button>
            </div>

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
          </>
        ) : null}
      </div>
    )
  }
)
