import React, { useState } from 'react'
import 'styles/layout/PromotionSlider.scss'

interface SliderProps {
  promotionImages: string[]
}

const PromotionSlider: React.FC<SliderProps> = ({ promotionImages = [] }) => {
  const [currentImage, setCurrentImage] = useState(0)

  const goToPreviousImage = () => {
    if (currentImage === 0) {
      setCurrentImage(promotionImages.length - 1)
    } else {
      setCurrentImage(currentImage - 1)
    }
  }

  const goToNextImage = () => {
    if (currentImage === promotionImages.length - 1) {
      setCurrentImage(0)
    } else {
      setCurrentImage(currentImage + 1)
    }
  }

  return (
    <div className="PromotionSlider">
      <div className="Inner">
        {promotionImages.length > 0 && (
          <img
            src={promotionImages[currentImage]}
            alt="PromotionSlider"
            className="active"
          />
        )}
        <button
          className="PromotionSlider_Button_Left"
          onClick={goToPreviousImage}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <button
          className="PromotionSlider_Button_Right"
          onClick={goToNextImage}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  )
}

export { PromotionSlider }
