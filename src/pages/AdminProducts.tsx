import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import {
  AdminProductItem,
  AdminProductItemHeader,
  Modal,
  AdminProductsSkeleton
} from 'components/index'
import styled from 'styles/pages/adminProducts.module.scss'
import { Link } from 'react-router-dom'
import {
  adminFetchProducts,
  adminDeleteProduct,
  adminChangeProductSaleStatus
} from 'api/index'
import { ProductResponse, ModalProps } from 'types/index'
import { useOutsideClick } from 'hooks/index'
import Pagination from 'react-js-pagination'
import 'styles/common.scss'

export const AdminProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [products, setProducts] = useState<Array<ProductResponse>>([])
  const [shownMenuId, setShownMenuId] = useState<string | null>(null)
  const [isModalShow, setIsModalShow] = useState<boolean>(false)
  const [deleteProduct, setDeleteProduct] = useState<ProductResponse | null>(
    null
  )
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)
  const [isError, setError] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const filteredProducts = useMemo(() => {
    if (products.length === 0) {
      return []
    }
    const list = products
      .filter(product => product.title.includes(search))
      .sort((a, b) => {
        if (a.title < b.title) {
          return 1
        }
        if (a.title > b.title) {
          return -1
        }
        return 0
      })

    const indexOfLast = page * 10
    const indexOfFirst = indexOfLast - 10
    return list.slice(indexOfFirst, indexOfLast)
  }, [products, search, page])

  const totalProductsCount = useMemo(() => {
    return products.filter(product => product.title.includes(search)).length
  }, [products, search])

  const addButtonRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    setIsLoading(true)
    fetchProducts()
  }, [])

  const fetchProducts = useCallback(() => {
    adminFetchProducts()
      .then(res => {
        setProducts(res)
      })
      .finally(() => {
        setIsLoading(false)
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

  // 상품 삭제 클릭 이벤트
  useEffect(() => {
    if (deleteProduct) {
      setIsModalShow(true)
      setModalProps({
        title: '상품 삭제',
        content: `${deleteProduct.title}상품을 삭제하시겠습니까?`,
        isTwoButton: true,
        okButtonText: '삭제',
        onClickOkButton: () => {
          onClickDeleteModalOk(deleteProduct.id)
        },
        cancelButtonText: '취소',
        onClickCancelButton: onClickDeleteModalCancel
      })
    }

    if (isError) {
      setIsModalShow(true)
      setModalProps({
        title: '상품 삭제 오류',
        content: '상품 삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        isTwoButton: false,
        okButtonText: '확인',
        onClickOkButton: onClickDeleteModalCancel
      })
    }
  }, [deleteProduct, isError])

  const onClickDelete = useCallback((product: ProductResponse) => {
    setDeleteProduct(product)
  }, [])

  const onDeleteProduct = useCallback((id: string) => {
    adminDeleteProduct(id).then(
      isSuccess => {
        if (isSuccess) {
          fetchProducts()
        }
      },
      error => {
        console.log(error)
        setError(true)
      }
    )
  }, [])

  // 삭제 확인 모달
  const onClickDeleteModalOk = (id: string | undefined) => {
    setIsModalShow(false)
    // 삭제 API 호출
    if (id) {
      onDeleteProduct(id)
    }
  }

  const onClickDeleteModalCancel = () => {
    setIsModalShow(false)
  }

  // 상품 품절, 판매 처리
  const changeStatusById = useCallback(
    (id: string, isSoldOut: boolean) => {
      const newProducts = products.map(product => {
        if (product.id === id) {
          product.isSoldOut = isSoldOut
        }
        return product
      })
      setProducts(newProducts)
    },
    [products]
  )

  const onChangeSaleStatus = useCallback(
    (id: string, isChangedSoldout: boolean) => {
      adminChangeProductSaleStatus(id, isChangedSoldout).then(
        isSuccess => {
          if (isSuccess) {
            changeStatusById(id, isChangedSoldout)
          }
        },
        error => {
          console.log(error)
        }
      )
    },
    [changeStatusById]
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

      {
        // 스켈레톤 로딩
        isLoading && (
          <>
            <AdminProductsSkeleton />
            <AdminProductsSkeleton />
            <AdminProductsSkeleton />
            <AdminProductsSkeleton />
            <AdminProductsSkeleton />
            <AdminProductsSkeleton />
            <AdminProductsSkeleton />
            <AdminProductsSkeleton />
            <AdminProductsSkeleton />
            <AdminProductsSkeleton />
          </>
        )
      }

      {filteredProducts.map(product => {
        const isMenuShow = shownMenuId === product.id
        return (
          <AdminProductItem
            key={product.id}
            product={product}
            isMenuShow={isMenuShow}
            showMenu={handleShow}
            hideMenu={handleHide}
            onClickDelete={onClickDelete}
            onChangeSaleStatus={onChangeSaleStatus}
          />
        )
      })}

      {/* Pagination */}
      {filteredProducts.length > 0 ? (
        <div className={'pagination-wrapper'}>
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalProductsCount}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={setPage}
          />
        </div>
      ) : null}

      {isModalShow && modalProps ? (
        <Modal
          isTwoButton={modalProps.isTwoButton}
          title={modalProps.title}
          content={modalProps.content}
          okButtonText={modalProps.okButtonText}
          onClickOkButton={modalProps.onClickOkButton}
          cancelButtonText={modalProps.cancelButtonText}
          onClickCancelButton={modalProps.onClickCancelButton}
        />
      ) : null}
    </section>
  )
}
