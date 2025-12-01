import ImageContext from './ImageContext'
import { useState } from 'react'

export const ImageProvider = ({ children, images = [] }) => {
  const [currentImages, setCurrentImages] = useState(images)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex(prev =>
      currentImages.length === 0 ? 0 : (prev + 1) % currentImages.length,
    )
  }

  const prevImage = () => {
    setCurrentImageIndex(prev =>
      currentImages.length === 0 ? 0 : (prev - 1 + currentImages.length) % currentImages.length,
    )
  }

  const setImageIndex = index => setCurrentImageIndex(index)

  const value = {
    currentImages,
    setCurrentImages,

    currentImageIndex,
    nextImage,
    prevImage,
    setImageIndex,
    totalImages: currentImages.length,
  }

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  )
}

export default ImageProvider
