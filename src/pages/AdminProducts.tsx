import { useEffect, useState } from 'react'
import { AdminProductItem, AdminProductItemHeader } from 'components/index'
import styled from 'styles/pages/adminProducts.module.scss'
import { Link } from 'react-router-dom'
import { adminFetchProducts } from 'api/index'
import { Product } from 'types/index'
import { useOutsideClick } from 'hooks/index'

export const AdminProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([])
  const [shownMenuId, setShownMenuId] = useState<string | null>(null)

  useEffect(() => {
    adminFetchProducts().then(res => {
      setProducts(res)
    })
  }, [])

  // 바깥쪽 클릭 시 메뉴 hidden 처리
  useOutsideClick(() => {
    setShownMenuId(null)
  })

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>상품 관리</h1>
      <button className={`${styled.black} ${styled.add} ${styled.right}`}>
        <Link to="/admin/product-add">상품 추가</Link>
      </button>
      <AdminProductItemHeader />
      {products.map(product => {
        return (
          <AdminProductItem
            key={product.id}
            product={product}
            isMenuShow={shownMenuId === product.id}
            showMenu={() => {
              setShownMenuId(product.id ?? '')
            }}
            hideMenu={() => {
              setShownMenuId(null)
            }}
          />
        )
      })}
    </section>
  )
}
