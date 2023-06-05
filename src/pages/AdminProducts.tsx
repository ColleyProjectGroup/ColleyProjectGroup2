import { useEffect, useState } from 'react'
import { ProductItem, ProductItemHeader } from 'components/index'
import styled from 'styles/pages/adminProducts.module.scss'
import { Link } from 'react-router-dom'
import { adminFetchProducts } from 'api/index'
import { Product } from 'types/index'

export const AdminProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([])
  useEffect(() => {
    adminFetchProducts().then(res => {
      setProducts(res)
    })
  }, [])

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>상품 관리</h1>
      <button className={`${styled.black} ${styled.add} ${styled.right}`}>
        <Link to="/admin/product-add">상품 추가</Link>
      </button>
      <ProductItemHeader />
      {products.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
          />
        )
      })}
    </section>
  )
}
