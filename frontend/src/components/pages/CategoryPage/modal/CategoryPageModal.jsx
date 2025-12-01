import { useState, useEffect } from 'react'
import { Button } from '@ui'
import ImageMagnifier from './ImageMagnifier'
import ZoomButtons from './ZoomButtons'

import { useScrollLock, useModalState, useImage } from '@hooks'
import { LikeButton, Spinner } from '@ui'
import styles from './CategoryPageModal.module.css'

const getYear = data => data.split('-')[0]

const ArrowSvg = (
  <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#ffffff" />
  </svg>
)

const MenuButton = ({ image, activeImgId, handleChangeActiveImg, isLoading, description }) => {
  const isCurrentImgActive = image.id === activeImgId

  return (
    <Button
      isActive={isCurrentImgActive}
      variant="secondary"
      className={`${styles.menuButton} ${isCurrentImgActive ? styles.menuButtonActive : ''}`}
      onClick={() => handleChangeActiveImg(image)}
      disabled={isLoading || isCurrentImgActive}
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

const CategoryPageModal = () => {
  useScrollLock(true)

  const { currentImages, currentImageIndex, nextImage, prevImage } = useImage()
  const activeImg = currentImages[currentImageIndex]

  const { variants_with_dynamic_path: artVariants, ...fullImage } = activeImg
  const variants = artVariants.filter(({ type }) => type !== 'xs')

  const [activeVariantImg, setActiveVariantImg] = useState(activeImg)
  const [isLoading, setIsLoading] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(3)

  const { closeModal } = useModalState()

  const handleChangeActiveImg = (currentImg) => {
    setIsLoading(true)
    setActiveVariantImg(currentImg)
  }

  useEffect(() => {
    setActiveVariantImg(activeImg)
    setIsLoading(true)
  }, [activeImg])

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.sideNavButton} ${styles.left}`}
        onClick={prevImage}
      >
        {ArrowSvg}
      </button>

      <button
        className={`${styles.sideNavButton} ${styles.right}`}
        onClick={nextImage}
      >
        {ArrowSvg}
      </button>
      <div className={styles.modal}>
        <Button
          variant="secondary"
          className={styles.closeButton}
          onClick={closeModal}
        />

        <div className={styles.modalContent}>
          <div className={styles.media}>
            <div className={styles.imageContainer}>
              {isLoading && <Spinner className={styles.modalSpinner} />}
              <ImageMagnifier
                src={activeVariantImg.image_url}
                zoomLevel={zoomLevel}
                magnifierSize={400}
                setIsLoading={setIsLoading}
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
                  activeImgId={activeVariantImg.id}
                  handleChangeActiveImg={handleChangeActiveImg}
                  isLoading={isLoading}
                  description="последняя версия"
                />

                {variants.map((variant) => {
                  const content = variant.type === 'outline'
                    ? 'контур'
                    : `версия ${getYear(variant.createdAt)} года`

                  return (
                    <MenuButton
                      key={variant.id}
                      image={variant}
                      activeImgId={activeVariantImg.id}
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
    </div>
  )
}

export default CategoryPageModal
