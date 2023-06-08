import React from 'react'
import { ProductItemProps } from 'types/index'
import { convertTagColor } from 'utils/index'
import { AdminMoreButton } from 'components/index'
import styled from 'styles/components/admin/productItem.module.scss'

export const AdminProductItem = React.memo(
  ({ product, isMenuShow, showMenu, hideMenu }: ProductItemProps) => {
    const handleToogleMenu = React.useCallback(() => {
      if (isMenuShow) {
        hideMenu()
      } else {
        showMenu(product.id ?? '')
      }
    }, [hideMenu, showMenu, isMenuShow, product])

    const onClickProductEdit = React.useCallback(() => {
      if (isMenuShow) {
        hideMenu()
      }
    }, [isMenuShow, hideMenu])

    const onClickProductDelete = React.useCallback(() => {
      if (isMenuShow) {
        hideMenu()
      }
    }, [isMenuShow, hideMenu])

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
        <div className={styled.more}>
          <AdminMoreButton
            isShow={isMenuShow}
            onToggleMenu={handleToogleMenu}
            onClickEdit={onClickProductEdit}
            onClickDelete={onClickProductDelete}
          />
        </div>
      </div>
    )
  }
)
