import { useState, useCallback } from 'react'
import { ProductAddForm, AdminLoading } from 'components/index'
import styled from 'styles/pages/adminProductAdd.module.scss'
import { Product } from 'types/index'
import { adminInsertProduct } from 'api/index'

export const AdminProductAdd = () => {
  const [isLoading, setLoading] = useState<boolean>(false)

  const onSubmitAddForm = useCallback((product: Product) => {
    setLoading(true)
    handleInsertProduct(product)
  }, [])

  const handleInsertProduct = (product: Product) => {
    adminInsertProduct(product).then(res => {
      console.log(res)

      setLoading(false)
      history.back()
    })
  }

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>상품 추가</h1>
      <ProductAddForm onSubmit={onSubmitAddForm} />
      {isLoading && <AdminLoading />}
    </section>
  )
}
