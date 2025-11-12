import { useState } from 'react'
import Portal from '@ui/Modal/modalPortal'

// import { Modal } from '@ui'
import ImageMagnifier from './ImageMagnifier'
import ZoomButtons from './components/ZoomButtons'

import { useScrollLock } from '@hooks'

import { LikeButton } from '@ui'
import styles from './Modal.module.css'

const getYear = data => data.split('-')[0]

const maxZoom = 8
const minZoom = 1.5
const zoomStep = 0.5

const Modal = ({ image, SetIsOpenModal }) => {
  useScrollLock(true)
  const { variants_with_dynamic_path: artVariants, ...fullImage } = image
  const variants = artVariants.filter(({ type }) => type !== 'xs')

  const [activeImg, setActiveImg] = useState(image)
  const [isLoading, setIsLoading] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(3)

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      SetIsOpenModal(false)
    }
  }

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

  const getButtonClassNames = (img) => {
    const isActiveClassName = img.id === activeImg.id ? styles.buttonActive : ''
    return `button ${styles.modalButton} ${isActiveClassName}`
  }

  const handleZoomLevel = (scaling) => {
    switch (scaling) {
      case ('increase'): {
        zoomLevel <= maxZoom && setZoomLevel(prev => prev + zoomStep)
        break
      }
      case ('decrease'): {
        zoomLevel > minZoom && setZoomLevel(prev => prev - zoomStep)
        break
      }
      default:
        break
    }
  }

  return (
    <Portal>
      <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
        <div className={styles.modal}>
          <button
            className={`button ${styles.closeButton}`}
            onClick={() => SetIsOpenModal(false)}
            aria-label="Закрыть модальное окно"
          >
            ×
          </button>
          <div className={styles.modalContent}>
            <div className={styles.media}>
              <div className={styles.imageContainer}>
                {isLoading && (
                  <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                    <p>Загрузка...</p>
                  </div>
                )}
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
                    maxZoom={maxZoom}
                    minZoom={minZoom}
                    handleZoomLevel={handleZoomLevel}
                  />
                </div>
              </div>
            </div>
            <div className={styles.menu}>
              <button
                className={getButtonClassNames(fullImage)}
                onClick={() => handleChangeActiveImg(fullImage)}
                disabled={isLoading}
              >
                последняя версия
              </button>
              {variants.map((variant) => {
                const content = variant.type === 'outline' ? 'контур' : `версия ${getYear(variant.createdAt)} года`
                return (
                  <button
                    key={variant.id}
                    className={getButtonClassNames(variant)}
                    onClick={() => handleChangeActiveImg(variant)}
                    disabled={isLoading}
                  >
                    {content}
                  </button>
                )
              })}
              <LikeButton id={fullImage.id} likes={fullImage.likes} />
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

// lazy image - атрибут loading
// виртуальный скролл - библиотека virtual scroll
// удалять верхние картинки при скролле вниз

// добавить закрытие на escape

// const Modal = ({ image }) => {
//   const { id, likes, createdAt, variants_with_dynamic_path: variants } = image
//   const imageRef = useRef()
//   const sliderRef = useRef()
//   const containerRef = useRef()
//   const [sliderX, setSliderX] = useState(0)
//   const [isDragging, SetDragging] = useState(false)

//   useEffect(() => {
//     if (imageRef) {
//       const width = containerRef.current.clientWidth
//       const sliderX = width / 2
//       setSliderX(sliderX)
//       sliderRef.current.style.left = `${sliderX}px`
//     }
//   }, [imageRef])

//   useEffect(() => {
//     const observer = new ResizeObserver(([entry]) => {
//       const { height } = entry.contentRect
//       sliderRef.current.style.height = `${height}px`
//     })

//     observer.observe(imageRef.current)
//     return () => observer.disconnect()
//   }, [])

//   const handleMouseMove = (event) => {
//     if (isDragging) { // debounce, вертикаль, горизонталь, малое количество пикселей, событие passive
//       const { left: containerXStart, right: containerXEnd } = containerRef.current.getBoundingClientRect()
//       const sliderX = Math.max(containerXStart, Math.min(event.clientX, containerXEnd)) - containerXStart
//       sliderRef.current.style.left = `${sliderX}px`
//       setSliderX(sliderX)
//     }
//   }

//   const handleMouseDown = () => {
//     console.log('mouseDown')
//     SetDragging(true)
//   }

//   const handleMouseUp = () => {
//     console.log('mouseUp')
//     SetDragging(false)
//   }

//   return (
//     <section className="image-compare">
//       <div
//         className="image-compare-images"
//         ref={containerRef}
//         onMouseMove={handleMouseMove}
//       >
//         <div className="main-image">

//         </div>
//         <img
//           src={img1}
//           alt=""
//           className="image image-full"
//           ref={imageRef}
//           style={{ clipPath: `inset(0 0 0 ${sliderX}px)` }}
//           width="392"
//           height="257"
//         />
//         <img src={img2} alt="" className="image image-outline" />
//         <div className="image-compare-slider" ref={sliderRef}>
//           <div
//             className="image-compare-slider-handle"
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//           >
//           </div>
//         </div>
//       </div>
//       <div className="image-compare-other-images">
//         <img
//           src={img1}
//           alt=""
//           className="other-image"
//           width="392"
//           height="257"
//         />
//         <img
//           src={img1}
//           alt=""
//           className="other-image"
//           width="392"
//           height="257"
//         />
//         <img
//           src={img1}
//           alt=""
//           className="other-image"
//           width="392"
//           height="257"
//         />
//         <img
//           src={img1}
//           alt=""
//           className="other-image"
//           width="392"
//           height="257"
//         />
//         <img
//           src={img1}
//           alt=""
//           className="other-image"
//           width="392"
//           height="257"
//         />
//       </div>
//     </section>
//   )
// }

export default Modal
