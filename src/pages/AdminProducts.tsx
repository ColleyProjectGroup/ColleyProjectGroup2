import { ProductItemHeader } from 'components/index'
import styled from 'styles/pages/adminProducts.module.scss'
import { Link } from 'react-router-dom'

export const AdminProducts = () => {
  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>상품 관리</h1>
      <button className={`${styled.black} ${styled.add} ${styled.right}`}>
        <Link to="/admin/product-add">상품 추가</Link>
      </button>

      {/* Product List Section */}
      <ProductItemHeader />
    </section>
  )
}
