/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect } from 'react'
import { Products } from './Products'
import '../styles/layout/BestSeller.scss'

const BestSeller = () => {
  const [activeTab, setActiveTab] = useState<string>('Home')
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const handleTabClick = (tab: string) => {
    if (activeTab !== tab) {
      setIsLoaded(false)
      setActiveTab(tab)
    }
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [activeTab])

  return (
    <div className="BESTSELLER">
      <div className="Inner">
        <h2>BEST SELLER</h2>
        <div className="Tabs">
          <button
            className={`Tab ${activeTab === 'Home' ? 'Active' : ''}`}
            onClick={() => handleTabClick('Home')}>
            Home
          </button>
          <button
            className={`Tab ${activeTab === 'Stationery' ? 'Active' : ''}`}
            onClick={() => handleTabClick('Stationery')}>
            Stationery
          </button>
          <button
            className={`Tab ${activeTab === 'Baby/Kids' ? 'Active' : ''}`}
            onClick={() => handleTabClick('Baby/Kids')}>
            Baby/Kids
          </button>
        </div>
        <div className="TabContent">
          <div className={`TabPane ${activeTab === 'Home' ? 'Active' : ''}`}>
            {activeTab === 'Home' && (
              <Products
                key="Home"
                limit={4}
                getProductCount={() => {}} // 추가: 빈 함수를 전달
              />
            )}
          </div>
          <div
            className={`TabPane ${activeTab === 'Stationery' ? 'Active' : ''}`}>
            {activeTab === 'Stationery' && isLoaded && (
              <Products
                key="Stationery"
                tagFilter={['KITCHEN', 'NEW']}
                limit={4}
                getProductCount={() => {}} // 추가: 빈 함수를 전달
              />
            )}
          </div>
          <div
            className={`TabPane ${activeTab === 'Baby/Kids' ? 'Active' : ''}`}>
            {activeTab === 'Baby/Kids' && isLoaded && (
              <Products
                key="Baby/Kids"
                tagFilter={['BABY/KIDS', 'NEW']}
                limit={4}
                getProductCount={() => {}} // 추가: 빈 함수를 전달
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { BestSeller }
