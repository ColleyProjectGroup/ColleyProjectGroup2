import { AdminDashboardCardProps } from 'types/index'
import styled from 'styles/components/admin/adminCard.module.scss'

export const AdminDashboardCard = ({
  title,
  value,
  unitStr
}: AdminDashboardCardProps) => {
  return (
    <div className={styled.card}>
      <h4>{title}</h4>
      <div className={styled['card__content']}>
        <span className={styled.value}>{value}</span>
        <span className={styled.unit}>{unitStr}</span>
      </div>
    </div>
  )
}
