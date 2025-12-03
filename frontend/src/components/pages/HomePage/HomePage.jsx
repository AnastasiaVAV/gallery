import { useState, useEffect } from 'react'
import galleryBlocks from './galleryBlocks'
import { preloadGalleryBlocks } from '@utils'
import styles from './HomePage.module.css'

const allBlocks = [
  ...Object.keys(galleryBlocks),
  ...Object.keys(galleryBlocks),
]

const SliderElement = ({ el, index }) => {
  const gridArea = index + 1
  return el.type === 'image'
    ? (
        <img loading="lazy" key={index} src={el.src} className={styles.sliderBlockImage} grid-area={gridArea} />
      )
    : (
        <div
          key={index}
          className={`${el.classes} ${styles.sliderBlockDiv} ${el}`}
          grid-area={gridArea}
        >
        </div>
      )
}

const HomePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    preloadGalleryBlocks(galleryBlocks).then(() => {
      setIsLoaded(true)
    })
  }, [])

  return (
    <>
      <section className={styles.gallery}>
        <div className={`container ${styles.titleContainer}`}>
          <h1 className={styles.title} data-title="Gallery">
            {windowWidth > 539
              ? <span>Gallery</span>
              : (
                  <>
                    <span>Gal</span>
                    <br />
                    <span>lery</span>
                  </>
                )}
          </h1>
        </div>
        <div className={`${isLoaded ? styles.fadeIn : ''}`}>
          <div className={styles.slider}>
            {isLoaded
              ? (
                  allBlocks.map((currentBlock, blockIndex) => (
                    <div
                      className={`${styles.sliderBlock} ${styles[`block${currentBlock}`]}`}
                      key={`${currentBlock}-${blockIndex}`}
                    >
                      {galleryBlocks[currentBlock].map((el, index) => (
                        <SliderElement key={index} el={el} index={index} />
                      ))}
                    </div>
                  ))
                )
              : (
                  <div />
                )}
          </div>

        </div>
      </section>
    </>
  )
}

export default HomePage
