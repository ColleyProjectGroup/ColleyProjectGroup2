import React, { useState } from 'react'
import { Product } from 'types/index'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styles/components/recentlyList.module.scss'

export const RecentlyList = React.memo(
  ({ products }: { products: Product[] }) => {
    const [swiperIndex, setSwiperIndex] = useState(0)
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)

    SwiperCore.use([Navigation])

    return (
      <div className={styled.recently}>
        <p>{`RECENTLY\nVIEWED`}</p>
        <Swiper
          direction="vertical"
          className={styled.swiper}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current
          }}
          spaceBetween={0}
          slidesPerView={4}
          initialSlide={0}
          onActiveIndexChange={swiperCore => {
            console.log(swiperCore)
            setSwiperIndex(swiperCore.activeIndex)
          }}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={swiper => console.log(swiper)}
        >
          {products.map(product => {
            return (
              <SwiperSlide
                className={styled.thumb}
                key={product.id}>
                <img
                  src={product.thumbnail}
                  className={styled.thumb}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className={styled.navigation}>
          <div ref={navigationPrevRef}>{'<'}</div>
          <div ref={navigationNextRef}>{'>'}</div>
        </div>
      </div>
    )
  }
)
