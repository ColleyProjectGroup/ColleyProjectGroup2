import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Products } from '../components/Products'
import { Footer } from '../components'
import '../styles/layout/ProductList.scss'

const ProductList = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get('category')
  const sortOption = queryParams.get('sortOption')

  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    sortOption || null
  )

  const [productCount, setProductCount] = useState<number>(0) // 추가: 상품 개수를 담는 상태

  useEffect(() => {
    setSelectedSortOption(sortOption)
  }, [sortOption])

  const handleGetProductCount = (count: number) => {
    setProductCount(count) // 상품 개수를 설정하는 함수
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
                </a>
              </li>
              <li>
                <a
                  href={`/productlist?category=${
                    category || ''
                  }&sortOption=priceLow`}
                  onClick={() => handleTabClick('priceLow')}>
                  낮은가격
                </a>
              </li>
              <li>
                <a
                  href={`/productlist?category=${
                    category || ''
                  }&sortOption=priceHigh`}
                  onClick={() => handleTabClick('priceHigh')}>
                  높은가격
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Products
        tagFilter={category ? [category] : []}
        sortOption={selectedSortOption}
        getProductCount={handleGetProductCount} // 추가: getProductCount 함수를 전달
      />
      <Footer />
    </div>
  )
}

export { ProductList }
