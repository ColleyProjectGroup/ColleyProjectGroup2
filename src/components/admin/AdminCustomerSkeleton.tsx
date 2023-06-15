import styled from 'src/styles/components/admin/adminSkeleton.module.scss'

export const AdminCustomerSkeleton = () => {
  return (
    <div className={styled['skeleton-wrapper']}>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__email']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__name']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__grade']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__total-order']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__total-price']}`}></div>
    </div>
  )
}
