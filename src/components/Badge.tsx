import React, { useCallback, useContext } from 'react'
import { RecentlyList } from 'components/index'
import { RecentlyContext } from 'contexts/index'
import styled from 'styles/components/badge.module.scss'

export const Badge = React.memo(() => {
  const { recentlyViewedList } = useContext(RecentlyContext)
  const scrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <div className={styled.badge}>
      <div className={styled.cart}>
        <span>CART</span>
        <div className={styled['cart__count']}>0</div>
      </div>
      <RecentlyList products={recentlyViewedList} />
      <div
        className={styled.top}
        onClick={scrollTop}>
        <i className="material-symbols-outlined">expand_less</i>
        <span>TOP</span>
      </div>
    </div>
  )
})
