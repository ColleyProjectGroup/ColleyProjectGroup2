import { BestSeller } from '@/components/BestSeller'
import { ColleyNews } from '@/components/ColleyNews'
import { ImageSlider } from '@/components/ImageSlider'
import { NewArrival } from '@/components/NewArrival'
import { PromotionSlider } from '@/components/PromotionSlider'
import { Footer } from 'components/index'
import { fetchAllProducts } from 'api/index'
import { Product } from 'types/index'
import { useEffect, useState } from 'react'
const sliderImages = [
  'https://colley.market/web/upload/category/editor/2023/02/17/b020ca816a613a9b0aa0c68a5b9fee67.jpg',
  'https://colley.market/web/upload/category/editor/2023/02/17/8938f65bbf94293194e031791ad24c72.jpg',
  'https://colley.market/web/upload/category/editor/2023/02/17/e45876abccdcad4195c603c85f968e90.jpg'
]
const promotionImages = [
  'https://colley.market/web/upload/category/editor/2022/04/07/e09d8657162931682be6630f7169773a.jpg',
  'https://colley.market/web/upload/category/editor/2022/04/07/1c29e4f56f062ae87478ec5a7b60f20e.jpg',
  'https://colley.market/web/upload/category/editor/2021/11/26/779187e2830b4321951a352952c73861.jpg'
]

export const Home = () => {
  const [prodcuts, setProdcuts] = useState<Product[]>([])
  useEffect(() => {
    fetchAllProducts().then(res => {
      setProdcuts(res)
      console.log(res)
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
