import { useContext } from 'react'
import { ImageContext } from '@contexts'

export const useImage = () => {
  const context = useContext(ImageContext)
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider')
  }
  return context
}

export default useImage
