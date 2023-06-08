import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { AdminProductItem, AdminProductItemHeader } from 'components/index'
import styled from 'styles/pages/adminProducts.module.scss'
import { Link } from 'react-router-dom'
import { adminFetchProducts } from 'api/index'
import { Product } from 'types/index'
import { useOutsideClick } from 'hooks/index'

export const AdminProducts = () => {
  const [search, setSearch] = useState<string>('')
  const [products, setProducts] = useState<Array<Product>>([])
  const [shownMenuId, setShownMenuId] = useState<string | null>(null)
  const filteredProducts = useMemo(
    () => products.filter(product => product.title.includes(search)),
    [products, search]
  )
  const addButtonRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    adminFetchProducts().then(res => {
      setProducts(res)
    })
  }, [])

  // 바깥쪽 클릭 시 메뉴 hidden 처리
  useOutsideClick(addButtonRef, () => {
    setShownMenuId(null)
  })

  const handleShow = useCallback((id: string) => {
    setShownMenuId(id)
  }, [])

  const handleHide = useCallback(() => {
    setShownMenuId('')
  }, [])

  const onChangeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value.trim())
    },
    []
  )

  return (
    <section className={styled['admin-content-wrapper']}>
      <h1 className={styled['admin-title']}>상품 관리</h1>
      <Link to="/admin/product-add">
        <button
          className={`${styled.black} ${styled.add} ${styled.right}`}
          ref={addButtonRef}>
          상품 추가
        </button>
      </Link>
      <input
        className={styled.search}
        type="text"
        placeholder="상품명 입력"
        value={search}
        onChange={onChangeSearch}
      />
      <AdminProductItemHeader />
      {filteredProducts.map(product => {
        const isMenuShow = shownMenuId === product.id
        return (
          <AdminProductItem
            key={product.id}
            product={product}
            isMenuShow={isMenuShow}
            showMenu={handleShow}
            hideMenu={handleHide}
          />
        )
      })}
    </section>
  )
}
