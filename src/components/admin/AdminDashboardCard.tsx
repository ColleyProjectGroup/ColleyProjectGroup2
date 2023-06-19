import { AdminDashboardCardProps } from 'types/index'
import React from 'react'
import styled from 'styles/components/admin/adminCard.module.scss'

export const AdminDashboardCard = React.memo(
  ({ title, value, unitStr, isLoading }: AdminDashboardCardProps) => {
    return (
      <div className={styled.card}>
        <h4>{title}</h4>
        <div className={styled['card__content']}>
          {isLoading ? (
            <div className={styled.skeleton}></div>
          ) : (
            <span className={styled.value}>{value}</span>
          )}

          <span className={styled.unit}>{unitStr}</span>
        </div>
      </div>
    )
  }
)
