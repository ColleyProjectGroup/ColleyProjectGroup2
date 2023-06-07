import styled from 'styles/components/admin/productItemHeader.module.scss'

export const AdminProductItemHeader = () => {
  return (
    <div className={styled.wrapper}>
      <div className={styled.name}>상품명</div>
      <div className={styled.tag}>태그</div>
      <div className={styled.price}>가격</div>
      <div className={styled.discount}>할인율</div>
    </div>
  )
}
