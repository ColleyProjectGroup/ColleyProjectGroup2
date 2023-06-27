/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect } from 'react'
import { Products } from './Products'
import '../styles/layout/BestSeller.scss'

const BestSeller = () => {
  const [activeTab, setActiveTab] = useState<string>('Home')

  const handleTabClick = (tab: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  return (
    <div className="bestseller">
      <div className="inner">
        <h2>BEST SELLER</h2>
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'Home' ? 'Active' : ''}`}
            onClick={() => handleTabClick('Home')}>
            Home
          </button>
          <button
            className={`tab ${activeTab === 'Stationery' ? 'Active' : ''}`}
            onClick={() => handleTabClick('Stationery')}>
            Stationery
          </button>
          <button
            className={`tab ${activeTab === 'Baby/Kids' ? 'Active' : ''}`}
            onClick={() => handleTabClick('Baby/Kids')}>
            Baby/Kids
          </button>
        </div>
        <div className="tab-container">
          <div className={`TabPane ${activeTab === 'Home' ? 'active' : ''}`}>
            {activeTab === 'Home' && (
              <Products
                key="Home"
                limit={4}
                getProductCount={() => {}}
              />
            )}
          </div>
          <div
            className={`TabPane ${activeTab === 'Stationery' ? 'active' : ''}`}>
            {activeTab === 'Stationery' && (
              <Products
                key="Stationery"
                tagFilter={['KITCHEN', 'NEW']}
                limit={4}
                getProductCount={() => {}}
              />
            )}
          </div>
          <div
            className={`TabPane ${activeTab === 'Baby/Kids' ? 'active' : ''}`}>
            {activeTab === 'Baby/Kids' && (
              <Products
                key="Baby/Kids"
                tagFilter={['BABY/KIDS', 'NEW']}
                limit={4}
                getProductCount={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { BestSeller }
