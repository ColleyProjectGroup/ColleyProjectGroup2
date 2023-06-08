import React, { useState } from 'react'
import { ProductItemProps } from 'types/index'
import { convertTagColor } from 'utils/index'
import { AdminMoreButton, Modal } from 'components/index'
import { adminDeleteProduct } from 'api/index'

import styled from 'styles/components/admin/productItem.module.scss'

export const AdminProductItem = React.memo(
  ({ product, isMenuShow, showMenu, hideMenu }: ProductItemProps) => {
    const [isModalShow, setIsModalShow] = useState<boolean>(false)

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
      // 삭제 확인 모달
      setIsModalShow(true)
    }, [isMenuShow, hideMenu])

    const onClickDeleteModalOk = React.useCallback(() => {
      setIsModalShow(false)
      // 삭제 API 호출
    }, [])

    const onClickDeleteModalCancel = React.useCallback(() => {
      setIsModalShow(false)
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
        <div className={styled.more}>
          <AdminMoreButton
            isShow={isMenuShow}
            onToggleMenu={handleToogleMenu}
            onClickEdit={onClickProductEdit}
            onClickDelete={onClickProductDelete}
          />
        </div>

        {isModalShow ? (
          <Modal
            isTwoButton={true}
            title={'상품 삭제'}
            content={`${product.title} 상품을 삭제하시겠습니까?`}
            okButtonText={'삭제'}
            onClickOkButton={onClickDeleteModalOk}
            cancelButtonText="취소"
            onClickCancelButton={onClickDeleteModalCancel}
          />
        ) : null}
      </div>
    )
  }
)
