import React, { useCallback, useContext } from 'react'
import { RecentlyList } from 'components/index'
import { RecentlyContext, CartContext } from 'contexts/index'
import styled from 'styles/components/badge.module.scss'

export const Badge = React.memo(() => {
  const { recentlyViewedList } = useContext(RecentlyContext)
  const { userCart } = useContext(CartContext)

  const scrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <div className={styled.badge}>
      <div className={styled.cart}>
        <a href="/cart">CART</a>
        <div className={styled['cart__count']}>{userCart.length}</div>
      </div>
      {recentlyViewedList.length !== 0 ? (
        <RecentlyList products={recentlyViewedList} />
      ) : null}
      <div
        className={styled.top}
        onClick={scrollTop}>
        <i className="material-symbols-outlined">expand_less</i>
        <span>TOP</span>
      </div>
    </div>
  )
})
