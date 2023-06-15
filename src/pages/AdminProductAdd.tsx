import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ProductAddForm, AdminLoading } from 'components/index'
import styled from 'styles/pages/adminProductAdd.module.scss'
import { ProductAddBody, ProductResponse } from 'types/index'
import {
  adminInsertProduct,
  adminGetProductDetail,
  adminEditProduct
} from 'api/index'

export const AdminProductAdd = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const product = useLocation().state as ProductResponse

  const [isAddMode] = useState<boolean>(!product)
  const [editProduct, setEditProduct] = useState<ProductResponse | null>(null)

  useEffect(() => {
    if (product) {
      setLoading(true)
      adminGetProductDetail(product.id)
        .then(
          res => {
            setEditProduct(res)
          },
          error => {
            console.log('error', error)
          }
        )
        .finally(() => {
          setLoading(false)
        })
    }
  }, [product])

  const onSubmitAddForm = useCallback((product: ProductAddBody) => {
    setLoading(true)
    handleInsertProduct(product)
  }, [])

  const handleInsertProduct = (product: ProductAddBody) => {
    if (isAddMode) {
      adminInsertProduct(product).then(res => {
        console.log(res)

        setLoading(false)
        history.back()
      })
    } else {
      adminEditProduct(product).then(res => {
        console.log(res)

        setLoading(false)
        history.back()
      })
    }
  }

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>
        {isAddMode ? '상품 추가' : '상품 수정'}
      </h1>
      <ProductAddForm
        onSubmit={onSubmitAddForm}
        product={editProduct}
      />
      {isLoading && <AdminLoading />}
    </section>
  )
}
