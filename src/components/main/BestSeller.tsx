import React, { useState, useContext, useMemo } from 'react'
import { BestProduct } from 'components/index'
import { Product } from 'types/index'
import { RecentlyContext } from 'contexts/index'
import { tags } from 'constants/index'
import 'styles/layout/BestSeller.scss'

export const BestSeller = React.memo(
  ({ products }: { products: Product[] }) => {
    const bestProducts = useMemo(
      () => products.filter(p => p.tags.includes(tags.CONST_TAG_BEST)),
      [products]
    )

    const [activeTab, setActiveTab] = useState<string>('Home')

    const handleTabClick = (tab: string) => {
      if (activeTab !== tab) {
        setActiveTab(tab)
      }
    }

    // 최근 본 상품 세션 저장 처리
    const { recentlyViewedList, setRecentlyViewedList } =
      useContext(RecentlyContext)

    const onSaveProductRecently = (product: Product) => {
      const isExist = recentlyViewedList.find(p => p.id === product.id)
      if (!isExist) {
        setRecentlyViewedList([...recentlyViewedList, product])
      } else {
        const removeList = recentlyViewedList.filter(p => p.id !== product.id)
        setRecentlyViewedList([...removeList, product])
      }
    }

    return (
      <div className="bestseller">
        <div className="inner">
          <h2>BEST SELLER</h2>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'Home' ? 'active' : ''}`}
              onClick={() => handleTabClick('Home')}>
              Home
            </button>
            <button
              className={`tab ${activeTab === 'Stationery' ? 'active' : ''}`}
              onClick={() => handleTabClick('Stationery')}>
              Stationery
            </button>
            <button
              className={`tab ${activeTab === 'Baby/Kids' ? 'active' : ''}`}
              onClick={() => handleTabClick('Baby/Kids')}>
              Baby/Kids
            </button>
          </div>
          <div className="tab-container">
            {activeTab === 'Home' && (
              <div
                className={`tabPane ${activeTab === 'Home' ? 'active' : ''}`}>
                {bestProducts.slice(0, 4).map(product => (
                  <BestProduct
                    key={product.id}
                    product={product}
                    onSaveProductRecently={onSaveProductRecently}
                  />
                ))}
              </div>
            )}
            {activeTab === 'Stationery' && (
              <div
                className={`tabPane ${
                  activeTab === 'Stationery' ? 'active' : ''
                }`}>
                {bestProducts
                  .filter(p => p.tags.includes(tags.CONST_TAG_STATIONERY))
                  .slice(0, 4)
                  .map(product => (
                    <BestProduct
                      key={product.id}
                      product={product}
                      onSaveProductRecently={onSaveProductRecently}
                    />
                  ))}
              </div>
            )}
            {activeTab === 'Baby/Kids' && (
              <div
                className={`tabPane ${
                  activeTab === 'Baby/Kids' ? 'active' : ''
                }`}>
                {bestProducts
                  .filter(p => p.tags.includes(tags.CONST_TAG_BABYKIDS))
                  .slice(0, 4)
                  .map(product => (
                    <BestProduct
                      key={product.id}
                      product={product}
                      onSaveProductRecently={onSaveProductRecently}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)
