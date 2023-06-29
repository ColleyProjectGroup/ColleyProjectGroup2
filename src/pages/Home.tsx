import {
  Footer,
  PromotionSlider,
  NewArrival,
  ImageSlider,
  ColleyNews,
  BestSeller
} from 'components/index'
import { fetchAllProducts } from 'api/index'
import { Product } from 'types/index'
import { useEffect, useState } from 'react'
import { sliderImages, promotionImages } from 'constants/index'

export const Home = () => {
  const [prodcuts, setProdcuts] = useState<Product[]>([])
  useEffect(() => {
    fetchAllProducts().then(res => {
      setProdcuts(res)
    })
  }, [])

  return (
    <div>
      <ImageSlider sliderImages={sliderImages} />
      <ColleyNews />
      <NewArrival />
      <PromotionSlider promotionImages={promotionImages} />
      <BestSeller products={prodcuts} />
      <Footer />
    </div>
  )
}
