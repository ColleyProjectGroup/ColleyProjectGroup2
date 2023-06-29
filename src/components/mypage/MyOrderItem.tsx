import React, { useMemo } from 'react'
import moment from 'moment'
import { MyOrderItemProps } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'
import styled from 'styles/components/mypage/myOrderItem.module.scss'
import { Link } from 'react-router-dom'
import noImage from 'public/no-photo.png'

export const MyOrderItem = React.memo(
  ({ detail, isLast, onClickConfirm, onClickCancel }: MyOrderItemProps) => {
    const paidDate = useMemo(() => {
      const date = moment(detail.timePaid).format('YYYY-MM-DD HH:mm')
      return date
    }, [detail])

    const paidPrice = useMemo(
      () =>
        calculateDiscountedPrice(
          detail.product.price,
          detail.product.discountRate
        ),
      [detail]
    )

    const handleClickConfirmOrder = () => {
      onClickConfirm(detail.detailId)
    }

    const handleClickCancelOrder = () => {
      onClickCancel(detail.detailId)
    }

    return (
      <li className={`${styled['order']} ${isLast ? styled['last'] : null} `}>
        <Link to={`/products/${detail.product.productId}`}>
          <span className={styled['timestamp']}>{paidDate}</span>
          <img
            src={detail.product.thumbnail || noImage}
            alt=""
          />
          <p>{detail.product.title}</p>
          <span className={styled.price}>{paidPrice.toLocaleString()}원</span>
        </Link>
        <div className={styled['status']}>
          {detail.done && !detail.isCanceled ? (
            <span className={styled['confirm']}>구매확정 완료</span>
          ) : detail.isCanceled ? (
            <span className={styled['cancel']}>주문취소 완료</span>
          ) : (
            <>
              <button
                className={styled['white']}
                onClick={handleClickCancelOrder}>
                주문취소
              </button>
              <button
                className={styled['black']}
                onClick={handleClickConfirmOrder}>
                구매확정
              </button>
            </>
          )}
        </div>
      </li>
    )
  }
)
