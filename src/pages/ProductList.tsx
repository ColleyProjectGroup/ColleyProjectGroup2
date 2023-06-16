import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Products } from '../components/Products'
import { Footer } from '../components'
import '../styles/layout/ProductList.scss'

const ProductList = () => {
  const location = useLocation()
  // 현재 URL 정보
  const queryParams = new URLSearchParams(location.search)
  // 쿼리 파라미터
  const category = queryParams.get('category')
  // 'category' 파라미터의 값
  const sortOption = queryParams.get('sortOption')
  // 'sortOption' 파라미터의 값

  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    sortOption || null
  ) // 정렬 옵션

  const [productCount, setProductCount] = useState<number>(0)
  // 상품 수량

  useEffect(() => {
    setSelectedSortOption(sortOption)
  }, [sortOption])

  const handleGetProductCount = (count: number) => {
    setProductCount(count)
  }

  const handleTabClick = (option: string) => {
    setSelectedSortOption(option)
  }

  return (
    <div className="ProductList">
      <div className="Category">
        <div className="Title">{category || 'ALL'}</div>
      </div>
      <div className="Inner">
        <div className="ProductInfo">
          <div className="ProductCount">등록 제품 : {productCount}개</div>
          <div className="ProductSort">
            <ul>
              <li>
                <a
                  href={`/productlist?category=${
                    category || ''
                  }&sortOption=name`}
                  onClick={() => handleTabClick('name')}>
                  상품명
                </a>{' '}
              </li>
              <li>
                <a
                  href={`/productlist?category=${
                    category || ''
                  }&sortOption=priceLow`}
                  onClick={() => handleTabClick('priceLow')}>
                  낮은가격
                </a>{' '}
              </li>
              <li>
                <a
                  href={`/productlist?category=${
                    category || ''
                  }&sortOption=priceHigh`}
                  onClick={() => handleTabClick('priceHigh')}>
                  높은가격
                </a>{' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Products
        tagFilter={category ? [category] : []}
        sortOption={selectedSortOption}
        getProductCount={handleGetProductCount}
      />
      <Footer />
    </div>
  )
}

export { ProductList }
