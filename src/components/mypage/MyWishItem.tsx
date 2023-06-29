import React, { useMemo, useContext } from 'react'
import { MyWishItemProps } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'
import styled from 'styles/components/mypage/myWishItem.module.scss'
import { Link } from 'react-router-dom'
import { WishListContext } from 'contexts/index'
import noImage from 'public/no-photo.png'

export const MyWishrItem = React.memo(
  ({ product, isLast, isChecked, onChange }: MyWishItemProps) => {
    const { wishList, setWishList } = useContext(WishListContext)

    const productPrice = useMemo(
      () =>
        calculateDiscountedPrice(product.price, product.discountRate ?? null),
      [product]
    )

    const handleDeleteWishItem = () => {
      setWishList(wishList.filter(item => item.id !== product.id))
    }

    const handleCheckedChange = () => {
      onChange(product.id)
    }

    return (
      <li className={`${styled['product']} ${isLast ? styled['last'] : null} `}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckedChange}
        />
        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail || noImage}
            alt=""
          />
          <div className={styled['product__info']}>
            <p>{product.title}</p>
            <span className={styled['price']}>
              {productPrice.toLocaleString()}원
            </span>
          </div>
        </Link>
        <span
          className={`material-symbols-rounded ${styled['delete']}`}
          onClick={handleDeleteWishItem}>
          close
        </span>
      </li>
    )
  }
)
