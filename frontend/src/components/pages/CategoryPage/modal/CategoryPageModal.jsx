import { useState } from 'react'

import { Button } from '@ui'
import ImageMagnifier from './ImageMagnifier'
import ZoomButtons from './ZoomButtons'

import { useScrollLock, useModalState } from '@hooks'

import { LikeButton, Spinner } from '@ui'
import styles from './CategoryPageModal.module.css'

const getYear = data => data.split('-')[0]

const MenuButton = ({ image, activeImgId, handleChangeActiveImg, isLoading, description }) => {
  const isCurrentImgActive = image.id === activeImgId

  return (
    <Button
      isActive={isCurrentImgActive}
      variant="secondary"
      className={`${styles.menuButton} ${isCurrentImgActive ? styles.menuButtonActive : ''}`}
      onClick={() => handleChangeActiveImg(image)}
      disabled={isLoading | isCurrentImgActive}
    >
      <img
        src={image.image_url}
        alt=""
        className={styles.menuButtonImg}
      />
      {description}
    </Button>
  )
}

const CategoryPageModal = ({ image }) => {
  useScrollLock(true)
  const { variants_with_dynamic_path: artVariants, ...fullImage } = image
  const variants = artVariants.filter(({ type }) => type !== 'xs')

  const [activeImg, setActiveImg] = useState(image)
  const [isLoading, setIsLoading] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(3)

  const { closeModal } = useModalState()

  const handleChangeActiveImg = (currentImg) => {
    setIsLoading(true)
    setActiveImg(currentImg)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
  }

  return (
    <div className={styles.modal}>
      <Button
        variant="secondary"
        className={styles.closeButton}
        onClick={closeModal}
        aria-label="Закрыть модальное окно"
      >
        ×
      </Button>
      <div className={styles.modalContent}>
        <div className={styles.media}>
          <div className={styles.imageContainer}>
            {isLoading && <Spinner className={styles.modalSpinner} />}
            <ImageMagnifier
              src={activeImg.image_url}
              alt="Artwork"
              zoomLevel={zoomLevel}
              isLoading={isLoading}
              magnifierSize={400}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <div className={styles.zoomButtons}>
              <ZoomButtons
                zoomLevel={zoomLevel}
                setZoomLevel={setZoomLevel}
              />
            </div>
          </div>
        </div>
        <div className={styles.menu}>
          <div className={styles.menuButtonsContainer}>
            <div className={styles.menuButtons}>
              <MenuButton
                image={fullImage}
                activeImgId={activeImg.id}
                handleChangeActiveImg={handleChangeActiveImg}
                isLoading={isLoading}
                description="последняя версия"
              />
              {variants.map((variant) => {
                const content = variant.type === 'outline' ? 'контур' : `версия ${getYear(variant.createdAt)} года`
                return (
                  <MenuButton
                    key={variant.id}
                    image={variant}
                    activeImgId={activeImg.id}
                    handleChangeActiveImg={handleChangeActiveImg}
                    isLoading={isLoading}
                    description={content}
                  />
                )
              })}
            </div>
          </div>
          <div className={styles.likeButton}>
            <LikeButton id={fullImage.id} likes={fullImage.likes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPageModal
