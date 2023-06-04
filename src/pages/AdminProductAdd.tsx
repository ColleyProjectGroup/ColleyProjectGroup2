import React from 'react'
import { ProductAddForm } from 'components'
import styled from 'styles/pages/adminProductAdd.module.scss'
import { Product } from 'types'

export const AdminProductAdd = () => {
  const onSumitAddForm = (product: Product) => {
    console.log(product)
  }

  const insertProduct = () => {
    // TODO : 상품 추가 API 호출
  }

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>상품 추가</h1>
      <ProductAddForm onSumit={onSumitAddForm} />
    </section>
  )
}
