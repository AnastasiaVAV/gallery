import { useState, lazy, Suspense } from 'react'

import { formattingData } from '@utils'
import { LikeButton } from '@ui'
import styles from './imageCard.module.css'
import { useModalState } from '@hooks'

const CategoryPageModal = lazy(() => import('../modal/CategoryPageModal.jsx'))
const preloadModal = () => import('../modal/CategoryPageModal')

const ImageCard = ({ image }) => {
  const { id, likes, createdAt, variants_with_dynamic_path: variants } = image
  const xs = variants.find(({ type }) => type === 'xs')

  const { openModal } = useModalState()

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    preloadModal()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target === e.currentTarget) {
      handleOpenModal()
    }
  }

  const handleOpenModal = () => {
    openModal(
      <Suspense>
        <CategoryPageModal image={image} />
      </Suspense>,
    )
  }

  return (
    <>
      <article
        className={styles.imageCard}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={e => handleKeyDown(e)}
        onClick={handleOpenModal}
        tabIndex={0}
        role="button"
        aria-label="Открыть изображение"
      >
        <div className={styles.media}>
          <img src={xs.image_url} className={styles.image} loading="lazy" />
          {isHovered && (
            <div className={styles.overlay}>
              <span className={styles.overlayText}>Открыть</span>
            </div>
          )}
        </div>
        <div className={styles.info}>
          <p>{formattingData(createdAt)}</p>
          <LikeButton id={id} likes={likes} />
        </div>
      </article>
    </>
  )
}

export default ImageCard
