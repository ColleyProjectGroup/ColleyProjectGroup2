import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductItemProps } from 'types/index'
import { convertTagColor } from 'utils/index'
import { AdminMoreButton } from 'components/index'

import styled from 'styles/components/admin/productItem.module.scss'

export const AdminProductItem = React.memo(
  ({
    product,
    isMenuShow,
    showMenu,
    hideMenu,
    onClickDelete,
    onChangeSaleStatus
  }: ProductItemProps) => {
    const handleToogleMenu = React.useCallback(() => {
      if (isMenuShow) {
        hideMenu()
      } else {
        showMenu(product.id ?? '')
      }
    }, [hideMenu, showMenu, isMenuShow, product])

    const navigate = useNavigate()

    const onClickProductEdit = React.useCallback(() => {
      if (isMenuShow) {
        hideMenu()
      }
      navigate('/admin/product-add', { state: product })
    }, [isMenuShow, hideMenu])

    const onClickChangeStatus = React.useCallback(() => {
      if (product.isSoldOut) {
        onChangeSaleStatus(product.id, false)
      } else {
        onChangeSaleStatus(product.id, true)
      }
    }, [])

    return (
      <div className={styled.wrapper}>
        <div className={styled.name}>{product.title}</div>
        <div className={styled.tags}>
          {product.tags.map(tag => {
            return (
              <span
                key={tag}
                style={{ backgroundColor: `${convertTagColor(tag)}` }}
                className={styled.tag}>
                {tag}
              </span>
            )
          })}
        </div>
        <div className={styled.price}>{product.price.toLocaleString()}원</div>
        <div className={styled.discount}>
          {product.discountRate === 0 || !product.discountRate
            ? '-'
            : `${product.discountRate}%`}
        </div>
        <div className={styled['sale-status']}>
          {product.isSoldOut ? (
            <span className={styled.soldout}>품절</span>
          ) : (
            <span className={styled.sale}>판매중</span>
          )}
        </div>
        <div className={styled.more}>
          <AdminMoreButton
            isShow={isMenuShow}
            onToggleMenu={handleToogleMenu}
            onClickEdit={onClickProductEdit}
            onClickDelete={onClickDelete}
            product={product}
            onClickChangeStatus={onClickChangeStatus}
          />
        </div>
      </div>
    )
  }
)
