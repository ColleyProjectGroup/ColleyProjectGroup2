import { useState, useCallback } from 'react'
import styled from 'styles/pages/adminSales.module.scss'

export const AdminSales = () => {
  const [search, setSearch] = useState<string>('')
  const onChangeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value.trim())
    },
    []
  )
  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>주문 관리</h1>
      <input
        className={styled.search}
        type="text"
        placeholder="상품명 입력"
        value={search}
        onChange={onChangeSearch}
      />

      <div className={styled['sales']}>
        <div className={styled['sales__date']}>주문일</div>
        <div className={styled['sales__email']}>주문자</div>
        <div className={styled['sales__product']}>주문 상품</div>
        <div className={styled['sales__status']}>주문 상태</div>
      </div>
    </section>
  )
}
