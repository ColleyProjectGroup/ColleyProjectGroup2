import React, { useState } from 'react'
import styled from 'styles/components/admin/productAddForm.module.scss'
import { ProductAddFormProps } from 'types'

export const ProductAddForm = ({ onSumit }: ProductAddFormProps) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [discountRate, setDiscountRate] = useState<number>(0)

  const handleSumitAddForm = e => {
    e.preventDefault()
    const product = {
      title,
      description,
      price,
      discountRate
    }
    onSumit(product)
  }
  return (
    <form
      className={styled['form-wrapper']}
      onSubmit={handleSumitAddForm}>
      <label>
        상품명
        <input
          value={title}
          type="text"
          placeholder="상품명 입력"
          onChange={e => setTitle(e.target.value)}
        />
      </label>
      <label>
        상품설명
        <textarea
          value={description}
          placeholder="상품설명 입력"
          onChange={e => setDescription(e.target.value)}
        />
      </label>
      <div className={styled['input-row']}>
        <label>
          가격
          <input
            value={price}
            type="number"
            placeholder="가격 입력"
            onChange={e => setPrice(Number(e.target.value))}
          />
        </label>
        <label>
          할인율
          <input
            value={discountRate}
            type="number"
            placeholder="할인율 입력"
            onChange={e => setDiscountRate(Number(e.target.value))}
          />
        </label>
      </div>
      {/* TODO: Tag */}
      {/* TODO: 이미지 추가 버튼들 */}
      <button className={styled['black']}>저장</button>
    </form>
  )
}
