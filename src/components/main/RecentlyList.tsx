import React, { useEffect, useState } from 'react'
import { Product } from 'types/index'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import styled from 'styles/components/main/recentlyList.module.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'

export const RecentlyList = React.memo(
  ({ products }: { products: Product[] }) => {
    const [isObserver, setIsObserver] = useState<boolean>(false)
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    useEffect(() => {
      if (navigationNextRef.current && navigationPrevRef.current) {
        setIsObserver(true)
      } else {
        setIsObserver(false)
      }
    }, [navigationPrevRef, navigationNextRef])

    SwiperCore.use([Navigation])

    return (
      <div className={styled.recently}>
        <p>{`RECENTLY\nVIEWED`}</p>
        {isObserver ? (
          <Swiper
            direction="vertical"
            className={styled.swiper}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current
            }}
            height={310}
            spaceBetween={10}
            slidesPerView={4}
            initialSlide={0}
            autoHeight={false}>
            {products.map(product => {
              return (
                <SwiperSlide
                  className={styled.thumb}
                  key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.thumbnail}
                      className={styled.thumb}
                    />
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        ) : null}
        <div className={styled.navigation}>
          <div ref={navigationPrevRef}>{'<'}</div>
          <div ref={navigationNextRef}>{'>'}</div>
        </div>
      </div>
    )
  }
)
