import styled from 'styles/pages/admin.module.scss'

export const AdminLoading = () => {
  return (
    <div className={styled['loading']}>
      <div className={styled['loading__overlay']}></div>
      <div className={styled['loading__message']}>Loading...</div>
    </div>
  )
}
