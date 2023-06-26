import React, { useCallback, useMemo, useState } from 'react'
import { Modal, MyOrderItem, MyOrderItemSkeleton } from 'components/index'
import Pagination from 'react-js-pagination'
import { TransactionDetail, ModalProps } from 'types/index'
import { confirmOrder, cancelOrder } from 'api/index'
import styled from 'styles/components/mypage/myOrderList.module.scss'

export const MyOrderList = React.memo(
  ({
    title,
    orders,
    onFetch,
    isLoading
  }: {
    title: string
    orders: TransactionDetail[]
    onFetch: () => void
    isLoading: boolean
  }) => {
    const [page, setPage] = useState<number>(1)
    const [isModalShow, setIsModalShow] = useState<boolean>(false)
    const [modalProps, setModalProps] = useState<ModalProps | null>(null)

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
      const indexOfLast = page * 5
      const indexOfFirst = indexOfLast - 5
      return list.slice(indexOfFirst, indexOfLast)
    }, [orders, page])

    const onClickConfirm = useCallback(
      (id: string) => {
        setIsModalShow(true)
        setModalProps({
          title: '구매확정',
          content: '상품을 구매확정 하시겠습니까?',
          isTwoButton: true,
          okButtonText: '확인',
          onClickOkButton: () => {
            confirmOrder(id).then(isSccess => {
              if (isSccess) {
                onFetch()
                setIsModalShow(false)
              }
            })
          },
          cancelButtonText: '취소',
          onClickCancelButton: () => {
            setIsModalShow(false)
          }
        })
      },
      [onFetch]
    )

    const onClickCancel = useCallback(
      (id: string) => {
        setIsModalShow(true)
        setModalProps({
          title: '주문취소',
          content:
            '상품 주문을 취소하시겠습니까? \n주문 취소 시 주문 금액은 주문하신 계좌로 환불됩니다.',
          isTwoButton: true,
          okButtonText: '확인',
          onClickOkButton: () => {
            cancelOrder(id).then(isSccess => {
              if (isSccess) {
                onFetch()
                setIsModalShow(false)
              }
            })
          },
          cancelButtonText: '취소',
          onClickCancelButton: () => {
            setIsModalShow(false)
          }
        })
      },
      [onFetch]
    )

    return (
      <div className={styled['orders']}>
        <h4>{title}</h4>
        <ul className={styled['list']}>
          {isLoading ? (
            <>
              <MyOrderItemSkeleton isLast={false} />
              <MyOrderItemSkeleton isLast={false} />
              <MyOrderItemSkeleton isLast={false} />
              <MyOrderItemSkeleton isLast={false} />
              <MyOrderItemSkeleton isLast={true} />
            </>
          ) : orders.length === 0 ? (
            <li className={styled['none']}>주문 내역이 없습니다.</li>
          ) : (
            pagedOrders.map((order, index) => (
              <MyOrderItem
                key={order.detailId}
                detail={order}
                isLast={index === pagedOrders.length - 1}
                onClickConfirm={onClickConfirm}
                onClickCancel={onClickCancel}
              />
            ))
          )}
        </ul>
        {orders.length !== 0 ? (
          <div className={'mypage-pagination'}>
            <Pagination
              activePage={page}
              itemsCountPerPage={5}
              totalItemsCount={orders.length}
              pageRangeDisplayed={5}
              prevPageText="〈"
              nextPageText="〉"
              firstPageText="〈〈"
              lastPageText="〉〉"
              onChange={setPage}
            />
          </div>
        ) : null}

        {isModalShow && modalProps ? (
          <Modal
            isTwoButton={modalProps.isTwoButton}
            title={modalProps.title}
            content={modalProps.content}
            okButtonText={modalProps.okButtonText}
            onClickOkButton={modalProps.onClickOkButton}
            cancelButtonText={modalProps.cancelButtonText}
            onClickCancelButton={modalProps.onClickCancelButton}
          />
        ) : null}
      </div>
    )
  }
)
