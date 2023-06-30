import React from 'react'
import { Link } from 'react-router-dom'
import { BestProductProps } from 'types/index'
import { calculateDiscountedPrice } from 'utils/index'
import 'styles/layout/BestSeller.scss'
import noImage from 'public/no-photo.png'

export const BestProduct = React.memo(
  ({ product, onSaveProductRecently }: BestProductProps) => {
    return (
      <div
        key={product.id}
        className="product">
        <Link
          to={`/products/${product.id}`}
          onClick={() => {
            onSaveProductRecently(product)
          }}>
          <div className="image">
            <img
              src={product.thumbnail || noImage}
              alt={product.title}
            />
          </div>
          <div className="title">{product.title}</div>
          <div className="price">
            {product.discountRate ? (
              <>
                <span className="originalPrice">
                  <del>{product.price.toLocaleString()}원</del>
                </span>
                <span className="discountedPrice">
                  {calculateDiscountedPrice(
                    product.price,
                    product.discountRate
                  ).toLocaleString()}
                  원
                </span>
              </>
            ) : (
              <>{product.price.toLocaleString()}원</>
            )}
          </div>
          <div className="product__tags">
            {product.tags.includes('NEW') ? (
              <div className="product__new">NEW</div>
            ) : null}
            {product.tags.includes('BEST') ? (
              <div className="product__best">HOT</div>
            ) : null}
          </div>
        </Link>
      </div>
    )
  }
)
