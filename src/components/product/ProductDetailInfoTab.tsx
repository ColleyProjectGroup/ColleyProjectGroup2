import { useMemo, useState } from 'react'
import { tabItems } from 'constants/index'
import styled from 'styles/components/product/productDetailInfoTab.module.scss'

export const ProductDetailInfoTab = ({ child }: { child: JSX.Element }) => {
  const [isSelectedTab, setIsSelectedTab] = useState<number>(0)
  const tabItem = useMemo(() => {
    if (isSelectedTab === 1) {
      return tabItems.PAYMENT_INFO
    } else if (isSelectedTab === 2) {
      return tabItems.PRODUCT_REVIEW
    } else if (isSelectedTab === 3) {
      return tabItems.PRODUCT_QaA
    } else {
      return null
    }
  }, [isSelectedTab])

  return (
    <>
      <ul className={styled.tabs}>
        <li
          className={`${isSelectedTab === 0 ? styled.selected : ''}`}
          onClick={() => setIsSelectedTab(0)}>
          상품상세정보
        </li>
        <li
          className={`${isSelectedTab === 1 ? styled.selected : ''}`}
          onClick={() => setIsSelectedTab(1)}>
          상품구매안내
        </li>
        <li
          className={`${isSelectedTab === 2 ? styled.selected : ''}`}
          onClick={() => setIsSelectedTab(2)}>
          상품사용후기
        </li>
        <li
          className={`${isSelectedTab === 3 ? styled.selected : ''}`}
          onClick={() => setIsSelectedTab(3)}>
          상품Q&A
        </li>
      </ul>
      {isSelectedTab === 0 && child}
      {isSelectedTab !== 0 && (
        <div className={styled['tab__content']}>
          {tabItem &&
            tabItem.datas.map(data => {
              return (
                <div className={styled['tab__data']}>
                  <h3 className={styled['data__title']}>{data.title}</h3>
                  <p className={styled['data__content']}>{data.content}</p>
                </div>
              )
            })}
        </div>
      )}
    </>
  )
}
