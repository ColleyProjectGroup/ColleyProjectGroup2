import styled from 'styles/components/admin/adminSkeleton.module.scss'

export const AdminProductsSkeleton = () => {
  return (
    <div className={styled['skeleton-wrapper']}>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__product-title']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__product-tag']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__product-price']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__product-discount']}`}></div>
      <div
        className={`${styled['skeleton']} ${styled['skeleton__product-status']}`}></div>
    </div>
  )
}
