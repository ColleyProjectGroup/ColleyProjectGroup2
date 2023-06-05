import { ProductItemProps, Product } from 'types/index'
import styled from 'styles/components/admin/productItem.module.scss'
import { convertTagColor } from 'utils/index'

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className={styled.wrapper}>
      <div className={styled.name}>{product.title}</div>
      <div className={styled.tags}>
        {product.tags.map(tag => {
          console.log(convertTagColor(tag))
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
      <div className={styled.price}>{product.price}</div>
      <div className={styled.discount}>{product.discountRate}</div>
      <div className={styled.more}></div>
    </div>
  )
}
