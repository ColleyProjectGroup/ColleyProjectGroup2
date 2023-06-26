import React from 'react'
import styled from 'styles/components/mypage/myOrderItem.module.scss'

export const MyOrderItemSkeleton = React.memo(
  ({ isLast }: { isLast: boolean }) => {
    return (
      <li className={`${styled['order']} ${isLast ? styled['last'] : null} `}>
        <span className={`${styled.timestamp} ${styled.skeleton}`}></span>
        <div className={`${styled.thumb} ${styled.skeleton}`} />
        <p className={styled.skeleton}></p>
        <span className={`${styled.price} ${styled.skeleton}`}></span>

        <div className={`${styled.status} ${styled.skeleton}`}></div>
      </li>
    )
  }
)
