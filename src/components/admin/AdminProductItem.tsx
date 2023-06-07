import { ProductItemProps } from 'types/index'
import { convertTagColor } from 'utils/index'
import { AdminMoreButton } from 'components/index'
import styled from 'styles/components/admin/productItem.module.scss'

export const AdminProductItem = ({
  product,
  isMenuShow,
  showMenu,
  hideMenu
}: ProductItemProps) => {
  const handleToogleMenu = () => {
    if (isMenuShow) {
      hideMenu()
    } else {
      showMenu()
    }
  }

  const onClickProductEdit = () => {
    if (isMenuShow) {
      hideMenu()
    }
  }

  const onClickProductDelete = () => {
    if (isMenuShow) {
      hideMenu()
    }
  }

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
