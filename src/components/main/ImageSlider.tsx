import React, { useState } from 'react'
import 'styles/layout/ImageSlider.scss'

interface SliderProps {
  sliderImages: string[]
}

const ImageSlider: React.FC<SliderProps> = ({ sliderImages = [] }) => {
  const [currentImage, setCurrentImage] = useState(0)

  const goToPreviousImage = () => {
    if (currentImage === 0) {
      setCurrentImage(sliderImages.length - 1)
    } else {
      setCurrentImage(currentImage - 1)
    }
  }

  const goToNextImage = () => {
    if (currentImage === sliderImages.length - 1) {
      setCurrentImage(0)
    } else {
      setCurrentImage(currentImage + 1)
    }
  }

  return (
    <div className="ImageSlider">
      <div className="Inner">
        {sliderImages.length > 0 && (
          <img
            src={sliderImages[currentImage]}
            alt="ImageSlider"
            className="active"
          />
        )}
        <button
          className="ImageSlider_Button_Left"
          onClick={goToPreviousImage}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <button
          className="ImageSlider_Button_Right"
          onClick={goToNextImage}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  )
}

export { ImageSlider }
