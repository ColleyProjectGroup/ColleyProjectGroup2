import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Products, Footer } from 'components/index'
import 'styles/layout/ProductList.scss'

const ProductList = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get('category')
  const sortOption = queryParams.get('sortOption')
  const keyword = queryParams.get('keyword')

  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    sortOption || null
  )
  const [productCount, setProductCount] = useState<number>(0)

  useEffect(() => {
    setSelectedSortOption(sortOption)
  }, [sortOption])

  const handleGetProductCount = (count: number) => {
    setProductCount(count)
  }

  const handleTabClick = (option: string) => {
    setSelectedSortOption(option)

    const searchParams = new URLSearchParams(location.search)
    searchParams.set('sortOption', option)

    if (keyword) {
      searchParams.set('keyword', keyword)
    }

    const newPath = `${location.pathname}?${searchParams.toString()}`
    window.history.pushState(null, '', newPath)
  }

  return (
    <div className="product-list">
      {/* <div className="category">
        <div className="title">{category || 'ALL'}</div>
      </div> */}
      <div className="list-inner">
        <div className="product-info">
          <div className="product-count">등록 제품: {productCount}개</div>
          <div className="product-sort">
            <ul>
              <li>
                <a
                  href={`/productlist?category=${
                    category || ''
                  }&sortOption=name${
                    keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''
                  }`}
                  onClick={() => handleTabClick('name')}>
                  상품명
                </a>{' '}
              </li>
              <li>
                <a
                  href={`/productlist?category=${
                    category || ''
                  }&sortOption=priceLow${
                    keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''
                  }`}
                  onClick={() => handleTabClick('priceLow')}>
                  낮은가격
                </a>{' '}
              </li>
              <li>
                <a
                  href={`/productlist?category=${
                    category || ''
                  }&sortOption=priceHigh${
                    keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''
                  }`}
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
        keyword={keyword || undefined}
        getProductCount={handleGetProductCount}
      />

      <Footer />
    </div>
  )
}

export { ProductList }
