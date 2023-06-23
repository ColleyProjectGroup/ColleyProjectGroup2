import styled from 'styles/components/admin/adminSkeleton.module.scss'

export const AdminSalesSkeleton = () => {
  return (
    <div className={styled['skeleton-wrapper']}>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__sales-date']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__sales-email']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__sales-product']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__sales-price']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__sales-status']}`}></div>
    </div>
  )
}
