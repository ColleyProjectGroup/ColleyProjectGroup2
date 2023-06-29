import React, { useMemo } from 'react'
import moment from 'moment'
import { AdminSalesItemProps } from 'types/index'
import styled from 'styles/components/admin/adminSalesItem.module.scss'

export const AdminSalesItem = React.memo(
  ({
    detail,
    onChangeOrderIsCanceled,
    onClickOrderConfirm
  }: AdminSalesItemProps) => {
    const paidDate = useMemo(() => {
      const date = moment(detail.timePaid).format('YYYY-MM-DD HH:mm')
      return date
    }, [detail])

    const paidPrice = useMemo(() => {
      if (detail.product.discountRate) {
        return (
          (detail.product.price * (100 - detail.product.discountRate)) / 100
        )
      } else {
        return detail.product.price
      }
    }, [detail])

    const handleOrderCancelClick = () => {
      onChangeOrderIsCanceled(detail.detailId, true)
    }

    const handleOrderCancelBackClick = () => {
      onChangeOrderIsCanceled(detail.detailId, false)
    }

    const handleOrderConfirmClick = () => {
      onClickOrderConfirm(detail.detailId)
    }

    return (
      <li className={styled['sale-item']}>
        <div className={styled['sale__date']}>{paidDate.toString()}</div>
        <div className={styled['sale__email']}>{detail.user.email}</div>
        <div className={styled['sale__product']}>{detail.product.title}</div>
        <div className={styled['sale__price']}>
          {paidPrice.toLocaleString()}원
        </div>
        <div className={styled['sale__status']}>
          {!detail.done && detail.isCanceled ? (
            <button
              className={styled['back']}
              onClick={handleOrderCancelBackClick}>
              취소철회
            </button>
          ) : !detail.done ? (
            <button
              className={styled['cancel']}
              onClick={handleOrderCancelClick}>
              주문취소
            </button>
          ) : null}
          {detail.done ? (
            <span>판매완료</span>
          ) : (
            <button
              className={styled['confirm']}
              onClick={handleOrderConfirmClick}>
              판매완료
            </button>
          )}
        </div>
      </li>
    )
  }
)
